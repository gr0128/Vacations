const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
let connection = require("./connection-wrapper");

async function addVacation(vacation){
    const sql = "INSERT INTO vacations (description, destination, image_url, start_date, end_date, price)  values(?, ?, ?, ?, ?, ?)";
    const parameters = [vacation.description, vacation.destination, vacation.imageUrl, vacation.startDate, vacation.endDate, vacation.price];
    let getAddedVacation = "SELECT v.id, v.destination, v.description, v.image_url AS 'imageUrl'," +
    " v.start_date AS 'startDate',  v.end_date AS 'endDate', v.price"+
    " FROM vacations v ORDER BY id DESC LIMIT 1";
    try {
        await connection.executeWithParameters(sql, parameters);
        const addedVacation = await connection.execute(getAddedVacation);
        addedVacation[0].followers = 0;
        return addedVacation[0];
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR,sql,e);
    }
}

async function getAllVacations(userId){
    let sql = "SELECT v.id, v.destination, v.description, v.image_url AS 'imageUrl', v.start_date AS 'startDate'," +
    " v.end_date AS 'endDate', v.price,"+
    " CASE WHEN followed.vacation_id IS NOT NULL THEN true ELSE false END AS 'isFollowing',"+
    " CASE WHEN f_v.followers IS NOT NULL THEN f_v.followers ELSE 0 END AS 'followers'"+
    " FROM vacations v LEFT JOIN (SELECT vacation_id FROM followed_vacations WHERE user_id = ?)"+
    " AS followed ON v.id = followed.vacation_id"+
    " LEFT JOIN (SELECT vacation_id, COUNT(vacation_id) AS 'followers'" +
    " FROM followed_vacations GROUP BY vacation_id) AS f_v ON v.id = f_v.vacation_id";
    let parameters = userId;
    try {
        return await connection.executeWithParameters(sql,parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR,sql,e);
    }
}

async function deleteVacation(id){
    let sql = "DELETE FROM vacations WHERE id = ?";  
    let parameters = [id];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR,sql,e);
    }
}

async function deleteAllFollowings(id){
    let sql = "DELETE FROM followed_vacations WHERE vacation_id = ?";   
    let parameters = [id];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR,sql,e);
    }
}

async function updateVacation(vacation){
    let sql = "UPDATE vacations SET description=?, destination=?, image_url=?, start_date=?, end_date=?, price=? WHERE id=?" ;
    let parameters = [vacation.description, vacation.destination, vacation.imageUrl, vacation.startDate, vacation.endDate, vacation.price, vacation.id];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR,sql,e);
    }
}

async function isVacationExistById(id){
    let sql = "SELECT * FROM vacations WHERE id = ?";  
    let parameters = [id];
    let data = await connection.executeWithParameters(sql, parameters);  
    if (data[0] == undefined){
        return false;
    }
    return true;
}

async function addFollowing(userId,vacationId){
    let sql = "INSERT INTO followed_vacations (user_id,vacation_id) values (?, ?)";  
    let parameters = [userId,vacationId];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR,sql,e);
    }
}

async function removeFollowing(userId,vacationId){
    let sql = "DELETE FROM followed_vacations WHERE user_id = ? and vacation_id = ?";  
    let parameters = [userId,vacationId];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR,sql,e);
    }
}

async function isFollowingExist(userId,vacationId){
    let sql = "SELECT * FROM followed_vacations WHERE user_id = ? and vacation_id = ?";  
    let parameters = [userId,vacationId];
    let data = await connection.executeWithParameters(sql, parameters);  
    if (data[0] == undefined){
        return false;
    }
    return true;
}

module.exports = {
    addVacation,
    getAllVacations,
    deleteVacation,
    updateVacation,
    deleteAllFollowings,
    isVacationExistById,
    addFollowing,
    removeFollowing,
    isFollowingExist
};