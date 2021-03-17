const express = require("express");
const server = express.Router();
const usersLogic = require("../logic/users-logic");
const cache = require("./cache-controller");

//login
server.post("/login", async (request, response, next)=>{
    try{
        let userLoginDetails = request.body;
        let successfullLoginDetailes = await usersLogic.login(userLoginDetails);
        response.json(successfullLoginDetailes);
    }
    catch (error) {
        return next(error);
    }
})

//add user (register)
server.post("/register", async (request, response, next) => {
    const user = request.body;
    const userDetails = {username:user.username,password:user.password};
    try {
        await usersLogic.addUser(user); 
        let successfullLoginDetailes = await usersLogic.login(userDetails);
        response.json(successfullLoginDetailes);
    }
    catch (error) {
        return next(error);
    }
});

module.exports = server;
