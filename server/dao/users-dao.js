const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
let connection = require("./connection-wrapper");


async function addUser(user) {
    let sql = "INSERT INTO users (user_name, password, full_name, type)  values(?, ?, ?, ?)";
    let parameters = [user.username, user.password,user.fullname, "CUSTOMER"];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR,sql,e);
    }
}

async function isUserExistByUsername(username){
    let sql = "SELECT * FROM users WHERE user_name = ?";  
    let parameters = [username];
    let data = await connection.executeWithParameters(sql, parameters);  
    if (data[0] == undefined){
        return false;
    }
    return true;
}

async function isUserExistById(id){
    let sql = "SELECT * FROM users WHERE id = ?";  
    let parameters = [id];
    let data = await connection.executeWithParameters(sql, parameters);  
    if (data[0] == undefined){
        return false;
    }
    return true;
}

async function login(userLoginDetails) {
    let sql = "SELECT * FROM users where user_name =? and password =?";
    let parameters = [userLoginDetails.username, userLoginDetails.password];
    let userData;
    try {
        userData = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }

    if (userData == null || userData.length == 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    console.log("logged in! All good! ");
    return userData[0];
}

module.exports = {
    addUser,
    isUserExistByUsername,
    isUserExistById,
    login
};

