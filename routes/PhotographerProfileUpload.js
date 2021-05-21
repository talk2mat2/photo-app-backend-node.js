// const { CheckUserAth } = require("../middlewares/auth");

const express = require("express");
var uniqid = require("uniqid");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Router = express.Router();
// const userSchema = require("../models/userMoodel");
const photographerSchema = require("../models/Photographer");
process.env.NODE_ENV !== "production" ? require("dotenv").config() : null;
// const TempRegSchema = require("../models/tempRegModel");
const { UpdateClient } = require("../controllers/photographer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEYS_CLOUD,
  api_secret: process.env.API_SECRET_CLOUD,
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      "./upload"
      //  path.join(__dirname, "../public/image")
    );
  },
  filename: function (req, file, cb) {
    cb(
      null,

      file.fieldname + "-" + `${uuidv4()}` + path.extname(file.originalname)
    );
  },
});

const fileFilter = async (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  // dest: "public/image/uploaded",
  storage: storage,

  fileFilter: fileFilter,
});

Router.post("/editProfileUpload", upload.single("file"), async (req, res) => {
  const { userData } = req.body;
  console.log(req.file);
  const file = req.file;
  let imageUrl = "";
  const DataInfo = JSON.parse(userData);
  console.log(DataInfo);
  const { userId, favouriteShoots, aboutMe } = DataInfo;
  console.log(userId);
  const params = { favouriteShoots, aboutMe };
  if (!userData) {
    return res
      .status(501)
      .json({ message: "no user provided or not logged in" });
  }

  if (file) {
    const uniqueFilename = `${uuidv4()}iff`;
    const Path = req.file.path;

    await cloudinary.uploader.upload(
      Path,
      {
        public_id: `image/${req.body.id}/${uniqueFilename}`,
        tags: `image`,
      },
      async function (err, image) {
        if (err) {
          console.log(err);
          return res.send({
            message: "unable to perfom the requested operation",
          });
        }

        console.log("file uploaded to Cloudinary server");

        // remove file from server
        // const fs = require("fs");
        fs.unlinkSync(Path);
        // return image details
        console.log(image.secure_url);
        imageUrl = image.secure_url;

        await photographerSchema
          .findByIdAndUpdate(
            { _id: userId },
            {
              $set: { ...params, profileImage: image.secure_url },
            },
            { new: true, useFindAndModify: false }
          )
          .then((user) => {
            return res.status(200).json({
              userData: user,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(501).send({ err: "an error occured,unable to send" });
          });
        // Gifted.downLiners.forEach(async (payers) => {
        //   if (payers._id === payerId) {
        //     // console.log(payers);
        //     // payers[payers._Id].paymentStatus = true;
        //     payers["evidenImageUri"] = image.secure_url;
        //     await Gifted.save();

        //     // this.UpdateClient(req, res);
        //   }
        // });

        // return res
        //   .status(200)
        //   .send({ response: "your payment evidence has been sent" });
      }
    );
  } else {
    console.log("no image selected");
    photographerSchema
      .findByIdAndUpdate(
        { _id: userId },
        {
          $set: params,
        },
        { new: true, useFindAndModify: false }
      )
      .then((user) => {
        return res.status(200).json({
          userData: user,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(501).send({ err: "an error occured,unable to send" });
      });
  }
});
Router.post("/UploadWorks", upload.single("file"), async (req, res) => {
  const { userData } = req.body;

  const file = req.file;

  const DataInfo = JSON.parse(userData);

  const { userId } = DataInfo;
  console.log(userId);

  if (!userData) {
    return res
      .status(501)
      .json({ message: "no user provided or not logged in" });
  }

  if (file) {
    const uniqueFilename = `${uuidv4()}iff`;
    const Path = req.file.path;

    await cloudinary.uploader.upload(
      Path,
      {
        public_id: `image/${userId}/works/${uniqueFilename}`,
        tags: `image`,
      },
      async function (err, image) {
        if (err) {
          console.log(err);
          return res.send({
            message: "unable to perfom the requested operation",
          });
        }

        console.log("file uploaded to Cloudinary server");

        // remove file from server
        // const fs = require("fs");
        fs.unlinkSync(Path);
        // return image details
        console.log(image.secure_url);
        imageUrl = image.secure_url;

        await photographerSchema
          .findById({ _id: userId })

          .then(async (user) => {
            if (user.Porthfolio_works.length < 50) {
              user.Porthfolio_works.push({ imgUri: image.secure_url });
              await user.save();
              req.body.id = userId;
              await UpdateClient(req, res);
            } else {
              user.Porthfolio_works.pop();
              user.Porthfolio_works.push({ imgUri: image.secure_url });
              req.body.id = userId;
              await user.save();
              await UpdateClient(req, res);
            }

            // return res.status(200).json({
            //   userData: user,
            // });
          })
          .catch((err) => {
            console.log(err);
            res.status(501).send({
              err: "an error occured,unable to perfome the requested operation",
            });
          });
        // Gifted.downLiners.forEach(async (payers) => {
        //   if (payers._id === payerId) {
        //     // console.log(payers);
        //     // payers[payers._Id].paymentStatus = true;
        //     payers["evidenImageUri"] = image.secure_url;
        //     await Gifted.save();

        //     // this.UpdateClient(req, res);
        //   }
        // });

        // return res
        //   .status(200)
        //   .send({ response: "your payment evidence has been sent" });
      }
    );
  } else {
    return res.status(501).send({
      err: "mo image provided",
    });
  }
});
module.exports = Router;
