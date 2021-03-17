const express = require("express");
const expressServer = express();
const http = require("http");
const socketIO = require("socket.io");
const cache = require("../controllers/cache-controller");
const httpServer = http.createServer(expressServer);
const socketServer = socketIO(httpServer, {
    cors: {
      origin: "http://localhost:3000"
    }
});


let userIdToSocketMap = new Map();

socketServer.on("connection", socket => {
    let handshakeData = socket.request;
    let token = handshakeData._query["token"].substring("Bearer ".length);
    console.log(token);
    let userId = cache.get(token).id;

    userIdToSocketMap.set(userId, socket);
    console.log("user connected: "+ userId);

    socket.on("disconnect", () => {
        let handshakeData = socket.request;
        let token = handshakeData._query["token"].substring("Bearer ".length);
        let userId = cache.get(token).id;
        userIdToSocketMap.delete(userId);
        console.log("user "+ userId + " disconnected");

    })
});

async function asyncBroadcast (event,senderId){
    for ([userId,socket] of userIdToSocketMap){
        if (senderId != userId){
            socket.emit(event.eventType,event.parameters);
        }
    }
}

httpServer.listen(3002, () => console.log("Listening..."));

module.exports = {
    httpServer,
    asyncBroadcast
}