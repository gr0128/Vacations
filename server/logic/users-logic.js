const usersDao = require("../dao/users-dao");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
const cache = require("../controllers/cache-controller");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
const crypto = require("crypto");

const leftSalt = "0tn8u6_@#frt4g6";
const rightSalt = "nvzXVR234(*6v";

async function addUser(user) {
    await registerValidations(user);
    user.password = crypto.createHash("md5").update(leftSalt + user.password + rightSalt).digest("hex");
    await usersDao.addUser(user);
}

async function registerValidations(user) {
    if (await usersDao.isUserExistByUsername(user.username)) {
        throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
    }
    if (user.username == undefined || user.password == undefined) {
        throw new ServerError(ErrorType.ONE_OR_MORE_USER_FIELD_IS_NULL);
    }
    if (user.username.trim() == "" || user.password.trim() == "") {
        throw new ServerError(ErrorType.ONE_OR_MORE_USER_FIELD_IS_NULL);
    }
    if (user.password.includes(" ") || user.password.length < 8) {
        throw new ServerError(ErrorType.PASSWORD_NOT_VALID);
    }
}


async function login(userLoginDetails) {
    if (userLoginDetails.username.trim() == "" || userLoginDetails.password.trim() == "") {
        throw new ServerError(ErrorType.ONE_OR_MORE_USER_FIELD_IS_NULL);
    }
    userLoginDetails.password = crypto.createHash("md5").update(leftSalt + userLoginDetails.password + rightSalt).digest("hex");
    let successfullLoginDetailes = await usersDao.login(userLoginDetails);
    const token = jwt.sign({ sub: leftSalt + successfullLoginDetailes.user_name + rightSalt }, config.secret)
    const value = { id: successfullLoginDetailes.id, type: successfullLoginDetailes.type };
    cache.put(token, value);
    return { token: "Bearer " + token, type: successfullLoginDetailes.type };

}

module.exports = {
    addUser,
    login
};