let ErrorType = {
    GENERAL_ERROR : {id: 1, httpCode: 600, message : "a general error just happened, please try again", isShowStackTrace: true},
    UNAUTHORIZED : {id: 2, httpCode: 401, message : "Login failed, invalid user name or password", isShowStackTrace: false},
    USER_NAME_ALREADY_EXIST : {id: 3, httpCode: 601, message : "User name already exist", isShowStackTrace: false},
    USER_NAME_DOES_NOT_EXIST : {id: 4, httpCode: 602, message : "Username does not exist", isShowStackTrace: false},
    PASSWORD_NOT_VALID:{id: 5, httpCode: 603, message : "Password must be at least 8 chars long, with no spaces", isShowStackTrace: false},
    ONE_OR_MORE_USER_FIELD_IS_NULL: {id: 6, httpCode: 604, message : "At least one of the mandatory fields is empty", isShowStackTrace: false},
    PASSWORD_IS_INCORRECT: {id:7, httpCode: 605, message: "your old password is incorrect, can't change password", isShowStackTrace: false},
    ONE_OR_MORE_VACATION_FIELD_IS_NULL: {id: 8, httpCode: 606, message : "At least one of the fields is empty", isShowStackTrace: false},
    VACATION_DOES_NOT_EXIST : {id: 9, httpCode: 607, message : "Vacation does not exist", isShowStackTrace: false},
    FOLLOWING_ALREADY_EXIST : {id:10, httpCode: 608, message : "You are already following this vacation, please refresh the browser for updated data", isShowStackTrace: false},
    YOU_DONT_HAVE_PERMISSION : {id:11, httpCode: 609, message : "You don't have permission to create, edit or delete vacations", isShowStackTrace: false},
    VACATION_PRICE_MUST_BE_A_NUMBER : {id:12, httpCode: 610, message : "Price must be a number", isShowStackTrace: false},
    ADMIN_CANT_FOLLOW_VACATIONS :{id:13, httpCode: 611, message : "Admin cant follow or unfollow vacations", isShowStackTrace: false},
    FOLLOWING_NOT_EXIST :{id:14, httpCode: 612, message : "You are not following this vacation, please refresh the browser for updated data", isShowStackTrace: false}
}

module.exports = ErrorType;