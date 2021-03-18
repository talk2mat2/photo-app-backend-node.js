const { CheckUserAth } = require("../middlewares/auth");
const UserSchema = require("../models/userMoodel");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Router = express.Router();
process.env.NODE_ENV !== "production" ? require("dotenv").config() : null;

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

Router.post(
  "/UploadImg",
  CheckUserAth,
  upload.single("file"),
  CheckUserAth,
  async (req, res) => {
    console.log(req.body);
    console.log("file is", req.file);
    const file = req.file;

    const pay_to__id = req.body.pay_to__id;
    console.log(pay_to__id);
    const payerId = req.body.id;
    const filter = { _id: pay_to__id };

    if (!pay_to__id) {
      return res.status(501).send({ message: "no Gifted user provided " });
    }
    await UserSchema.findOne(filter)
      .then((Gifted) => {
        if (!file) {
          console.log("no file");
          return res.status(501).send({ message: "no image provided" });
        }

        if (file) {
          const uniqueFilename = `${uuidv4()}iff`;
          const Path = req.file.path;

          cloudinary.uploader.upload(
            Path,
            {
              public_id: `image/${req.body.id}/${uniqueFilename}`,
              tags: `image`,
            },
            function (err, image) {
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

              Gifted.downLiners.forEach(async (payers) => {
                if (payers._id === payerId) {
                  // console.log(payers);
                  // payers[payers._Id].paymentStatus = true;
                  payers["evidenImageUri"] = image.secure_url;
                  await Gifted.save();

                  // this.UpdateClient(req, res);
                }
              });

              return res
                .status(200)
                .send({ response: "your payment evidence has been sent" });
            }
          );
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(err, "no Gifted user found with that user id provided");
        res.status(501).send({
          message:
            "an error occucured, unable to process your request, thats all we know",
        });
      });
  }
);

module.exports = Router;
