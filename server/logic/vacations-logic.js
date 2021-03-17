const vacationsDao = require("../dao/vacations-dao");
const usersDao = require("../dao/users-dao");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
const cache = require("../controllers/cache-controller");
const pushController = require("../controllers/push-controller");
const { response } = require("express");

async function adminValidation(request){
    let userData = await cache.extractUserDataFromCache(request);
    if (userData.type != "ADMIN"){
        throw new ServerError(ErrorType.YOU_DONT_HAVE_PERMISSION);
    }
}

async function getUserIdFromCache(request){
    let userData = await cache.extractUserDataFromCache(request);
    return userData.id;
}

async function addVacation(request,vacation){
    await adminValidation(request);
    await addVacationValidations(vacation);
    const addedVacation = await vacationsDao.addVacation(vacation);
    return addedVacation;
}

async function addVacationValidations(vacation){
    if (vacation.destination.trim() == "" || vacation.description.trim() == "" || vacation.imageUrl.trim() == "" 
    || vacation.startDate.trim() == "" || vacation.endDate.trim() == "" ){
        throw new ServerError(ErrorType.ONE_OR_MORE_VACATION_FIELD_IS_NULL);
    }
    console.log(typeof(vacation.price));
    if(typeof(vacation.price) != "number"){
        throw new ServerError(ErrorType.VACATION_PRICE_MUST_BE_A_NUMBER);
    }
}


async function getAllVacations(userId){
    return await vacationsDao.getAllVacations(userId);
}

async function deleteVacation(request,id){
    await adminValidation(request);
    if(await vacationsDao.isVacationExistById(id)){
        await vacationsDao.deleteAllFollowings(id);
        await vacationsDao.deleteVacation(id);
        const event = {eventType:"DELETE_VACATION",parameters:id};
        pushController.asyncBroadcast(event,cache.extractUserDataFromCache(request).id);
    }
    else{
        throw new ServerError(ErrorType.VACATION_DOES_NOT_EXIST);
    }
}

async function updateVacation(request,vacation){
    await adminValidation(request);
    if(await vacationsDao.isVacationExistById(vacation.id)){
        await addVacationValidations(vacation);
        await vacationsDao.updateVacation(vacation);
        const event = {eventType:"UPDATE_VACATION",parameters:vacation};
        pushController.asyncBroadcast(event,cache.extractUserDataFromCache(request).id);
    } 
    else{
        throw new ServerError(ErrorType.VACATION_DOES_NOT_EXIST);
    }
}

async function addFollowing(userId,vacationId){
    await addFollowingValidation(userId,vacationId);
    await vacationsDao.addFollowing(userId,vacationId);
}

async function addFollowingValidation(userId,vacationId){
    if (! await usersDao.isUserExistById(userId)){
        throw new ServerError(ErrorType.USER_NAME_DOES_NOT_EXIST);
    }
    if (! await vacationsDao.isVacationExistById(vacationId)){
        throw new ServerError(ErrorType.VACATION_DOES_NOT_EXIST);
    }
    if (await vacationsDao.isFollowingExist(userId,vacationId)){
        throw new ServerError(ErrorType.FOLLOWING_ALREADY_EXIST);
    }
}

async function removeFollowing(userId, vacationId){
    if (!await vacationsDao.isFollowingExist(userId,vacationId)){
        throw new ServerError(ErrorType.FOLLOWING_NOT_EXIST);
    }
    await vacationsDao.removeFollowing(userId,vacationId);
}

module.exports = {
    addVacation,
    getAllVacations,
    deleteVacation,
    updateVacation,
    addFollowing,
    removeFollowing,
    getUserIdFromCache
};