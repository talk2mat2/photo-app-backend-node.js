const { CheckUserAth } = require("../middlewares/auth");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const Router = express.Router();

const {
  Login,
  Register,
CheckIsRegistered,
UpdateClient
} = require("../controllers/photographer");

Router.post("/login", Login);
Router.get("/updateClient", CheckUserAth, UpdateClient);

Router.post("/Register", Register);


Router.post("/CheckIsRegistered", CheckIsRegistered);

module.exports = Router;
