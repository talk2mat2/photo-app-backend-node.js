const express = require("express");
const App = express();
const connectDB = require("./db/connection");
const cors = require("cors");
const UserRoutes = require("./routes/userroutes");
const UploadRoutes = require("./routes/UploadRoutes");
const PhotographerRoutes= require('./routes/photographer')


const path = require("path");

// const UserSchema = require("./models/userMoodel");
process.env.NODE_ENV !== "production" ? require("dotenv").config() : null;
connectDB();
const Port = process.env.PORT || 8080;

App.use(cors());

App.use(express.json({ extended: false, limit: "20mb" }));
App.set("views", path.join(__dirname, "views"));
App.set("view engine", "ejs");
App.use("/users", UserRoutes);
App.use("/photographer", PhotographerRoutes);
// App.use("/users", UploadRoutes);

App.use(express.urlencoded({ limit: "20mb" , extended: false}));
App.get("/", (req, res) => {
  res.status(200).send({ message: "PhotoApp" });
});

const server = App.listen(Port, (err, successs) => {
  if (err) throw err;
  console.log(`server running on port ${Port}`);
});
// const io = require("socket.io")(server);
