let cache = new Map();

async function put(key,value){
    cache.set(key, value);
}

function get(key){
    return cache.get(key);
}

async function remove(key){
    cache.delete(key);
}

function extractUserDataFromCache(request){
    let authorizationString = request.headers["authorization"];
    let token = authorizationString.substring("Bearer ".length);
    let userData = cache.get(token);
    console.log(userData);
    return userData;
}


module.exports = {
    put,
    get,
    remove,
    extractUserDataFromCache
};