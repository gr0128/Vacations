const express = require("express");
const usersController = require("./controllers/users-controller");
const vacationController = require("./controllers/vacations-controller");
const pushController = require("./controllers/push-controller");
const errorHandler = require("./errors/error-handler");
const cors = require("cors");
const server = express();
const loginFilter = require("./middleware/login-filter");


server.use(express.static("public"));
// Extract the JSON from the body and create request.body object containing it: 
server.use(express.json());
server.use(cors({origin: "http://localhost:3000",origin: "http://localhost:4200"}));
server.use(loginFilter());

server.use("/users", usersController);
server.use("/vacations", vacationController);
server.use(errorHandler);

server.listen(3001, () => console.log("Listening on http://localhost:3001"));