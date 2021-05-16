const { CheckUserAth } = require("../middlewares/auth");
const { CheckPhtotoAth } = require("../middlewares/photographerAuth");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const Router = express.Router();

const {
  Login,
  Register,
  CheckIsRegistered,
  UpdateClient,
  updateMyLocation,
  FectMyBookings,
  StartSession,
  EndSession,
  AcceptOffer,
  DeleteWorks,
} = require("../controllers/photographer");

Router.post("/login", Login);
Router.get("/updateClient", CheckPhtotoAth, UpdateClient);

Router.post("/Register", Register);

Router.post("/CheckIsRegistered", CheckIsRegistered);
Router.post("/updateMyLocation", CheckPhtotoAth, updateMyLocation);
Router.get("/FectMyBookings", CheckPhtotoAth, FectMyBookings);
Router.get("/StartSession", CheckPhtotoAth, StartSession);
Router.get("/EndSession", CheckPhtotoAth, EndSession);
Router.get("/AcceptOffer", CheckPhtotoAth, AcceptOffer);
Router.post("/DeleteWorks", CheckPhtotoAth, DeleteWorks);

module.exports = Router;
