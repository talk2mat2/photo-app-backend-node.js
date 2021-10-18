const mongoose = require("mongoose");
require("dotenv").config("../.env");
//process.env.NODE_ENV !== "production" ? require("dotenv").config() : null;
//var url = "mongodb://localhost:27017/ogaphoto";
const url = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@cluster0-gussd.mongodb.net/PhotoApp?retryWrites=true&w=majority`;
// console.log(process.env.MONGOUSER);
const connectDB = async () => {
  await mongoose.connect(
    url,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
    (err, success) => {
      if (err) return console.log(err);
      console.log("connected to remote mongodb server");
    }
  );
};

module.exports = connectDB;
