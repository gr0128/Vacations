const express = require("express");
const server = express.Router();
const vacationsLogic = require("../logic/vacations-logic");

//add vacation - admin only
server.post("/", async (request, response, next) => {

    let vacation = request.body;
    try {
        const addedVacation = await vacationsLogic.addVacation(request,vacation);
        response.json(addedVacation);
    }
    catch (error) {
        return next(error);
    }
});

//get all vacations
server.get("/", async (request,response,next) => {
    try{
        let userId = await vacationsLogic.getUserIdFromCache(request);
        let vacations = await vacationsLogic.getAllVacations(userId);
        response.json(vacations);
    }
    catch (error) {
        return next(error);
    }
});

//update vacation - admin only
server.put("/", async (request,response,next) => {
    let vacation = request.body;
    try {
        await vacationsLogic.updateVacation(request,vacation);
        response.json("updated vacation " + vacation.id);
    }
    catch (error) {
        return next(error);
    }
});

//delete vacation - admin only
server.delete("/:id", async (request, response, next)=>{
    let id = request.params.id;
    try {
        await vacationsLogic.deleteVacation(request,id);
        response.json("deleted vacation " + id);
    }
    catch (error) {
        return next(error);
    }
});

//add following
server.post("/add-follow", async (request, response, next)=>{
    let vacationId = request.body.vacationId;
    try {
        let userId = await vacationsLogic.getUserIdFromCache(request);
        const addedVacation = await vacationsLogic.addFollowing(userId, vacationId);
        response.json(addedVacation);
    }
    catch (error) {
        return next(error);
    }
})


//remove following
server.delete("/unfollow/:id", async (request, response, next)=>{
    let vacationId = request.params.id;
    try {
        let userId = await vacationsLogic.getUserIdFromCache(request);
        await vacationsLogic.removeFollowing(userId, vacationId);
        response.json("remove follow to vacation " + vacationId);
    }
    catch (error) {
        return next(error);
    }
})

module.exports = server;