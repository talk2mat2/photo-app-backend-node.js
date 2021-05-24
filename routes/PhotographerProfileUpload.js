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
const EditPhotoRequest = require("../models/editPhotoRequest");
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

Router.post("/submiteShoots", upload.array("file"), async (req, res) => {
  // console.log(req.body);
  console.log("file is", req.files.length);
  const file = req.files;
  const { userData } = req.body;
  const DataInfo = JSON.parse(userData);
  const Email = DataInfo.email;
  const mobile = DataInfo.mobile;
  const name = DataInfo.name;
  const clientId = DataInfo.clientId;
  const photographerId = DataInfo.photographerId;
  console.log(Email, name, mobile);

  if (req.files.length < 1) {
    return res.status(501).json({
      message: `you didnt select image(s) `,
    });
  }
  if (!photographerId) {
    return res.status(404).json({ message: "pls provide  photographer Id" });
  }
  if (!clientId) {
    return res.status(404).json({ message: "pls provide client Id" });
  }

  const uniqueFilename = `${uuidv4()}iffpre`;
  const uploader = async (path) =>
    await cloudinary.uploader.upload(path, {
      public_id: `image/${photographerId}/${Email}/works/${uuidv4()}iffpre}`,
      tags: `image`,
    });

  const urls = [];
  const files = req.files;
  try {
    for (const file of files) {
      console.log(file.originalname);
      const Path = file.path;

      const newPath = await uploader(Path);
      console.log(newPath);
      urls.push({ imgUri: newPath.secure_url });
      // console.log(newPath.asset_id);
      // console.log(newPath.url);
      fs.unlinkSync(Path);
      // console.log(urls);
    }
  } catch (err) {
    return res
      .status(501)
      .json({ message: " error occured unable to upload images" });
  }

  // res.status(200).json({
  //   message: "images uploaded successfully",
  //   data: urls,
  // });
  const isSubmitedbefore = await EditPhotoRequest.findOne({
    clientId: clientId,
  });
  if (isSubmitedbefore) {
    isSubmitedbefore.photographerId = photographerId;
    isSubmitedbefore.clientId = clientId;
    isSubmitedbefore.Request_Photos = [
      ...isSubmitedbefore.Request_Photos,
      ...urls,
    ];
    await isSubmitedbefore.save();
    return res.status(200).json({
      message: "images has been sent to admin for onward processing",
    });
  } else {
    const newSubmision = new EditPhotoRequest({
      Request_Photos: urls,
      photographerId: photographerId,
      clientId: clientId,
    });
    await newSubmision.save();
    return res.status(200).json({
      message: "images has been sent to admin for onward processing",
    });
  }

  // const isPreRegistered = await TempRegSchema.findOne({ Email: Email });
  // if (isPreRegistered) {
  //   const randomId = isPreRegistered.confirmationCode;
  //   isPreRegistered.termsImageUri = urls[1]["url"];
  //   isPreRegistered.idCardImageUri = urls[0]["url"];
  //   await isPreRegistered.save();
  //   // await sendmail(Email, randomId, res);
  //   //here we alert admins that we have pre-registered await their aproval
  //   console.log("yesss");
  //   //send email with token again
  //   return res.status(200).json({
  //     message:
  //       "your information has been sent to IFF for reviews, you will be contacted after the review via email or sms,if not you can re-apply after 24 hours",
  //   });
  // } else {
  //   let randomid = uniqid();
  //   // const newPregistered = new TempRegSchema({
  //   //   Email,
  //   //   confirmationCode: randomid,
  //   //   mobile: mobile,
  //   //   fullName: fullName,
  //   //   termsImageUri: urls[1]["url"],
  //   //   idCardImageUri: urls[0]["url"],
  //   // });
  //   // await newPregistered.save();
  //   // return res.status(200).json({
  //   //   message:
  //   //     "your information has been sent to IFF for reviews, you will be contacted after the review via email or sms,if not you can re-apply after 24 hours",
  //   // });
  //   //sendmail with new randomid
  //   // sendmail(Email, randomid, res);
  //   console.log("yesss");
  //   //here we alert admins that we have pre-registered await their aproval
  // }
});

module.exports = Router;
