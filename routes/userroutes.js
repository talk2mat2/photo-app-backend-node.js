const { CheckUserAth } = require("../middlewares/auth");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const Router = express.Router();

const {
  Login,
  Register,
  UpdateMyAcctNumber,
  CheckIsRegistered,
  UpdateClient,
  ConfirmPaymentReceived,
  SearchPhotogrAphersCloser,
  bookSession,
  GetSesssionHistory,
  FetchMessages,
  sendMessages,
  CreatePriceTag
} = require("../controllers/user");

Router.post("/login", Login);
Router.get("/updateClient", CheckUserAth, UpdateClient);

Router.post("/Register", Register);
Router.post("/ConfirmPaymentReceived", CheckUserAth, ConfirmPaymentReceived);
Router.post("/UpdateMyAcctNumber", CheckUserAth, UpdateMyAcctNumber);
Router.post("/CheckIsRegistered", CheckIsRegistered);
Router.post("/SearchPhotogrAphersCloser",CheckUserAth, SearchPhotogrAphersCloser);
Router.post("/bookSession",CheckUserAth, bookSession);
Router.get("/getSesssionHistory",CheckUserAth, GetSesssionHistory);
Router.get("/FetchMessages",CheckUserAth, FetchMessages);
Router.post("/sendMessages",CheckUserAth, sendMessages);
Router.post("/CreatePriceTag",CheckUserAth, CreatePriceTag);

module.exports = Router;
