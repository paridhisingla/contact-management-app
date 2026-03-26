const UserController = require("../controllers/User.controllers");
const express = require("express");
const UserRouter = express.Router();

UserRouter.post("/signup", UserController.signup);
UserRouter.post("/login", UserController.login);

module.exports = UserRouter;