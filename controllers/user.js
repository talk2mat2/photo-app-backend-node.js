const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const photographerSchema = require("../models/Photographer");
const UserSchema = require("../models/userMoodel");
const PhotoSession = require("../models/PhotoSession");
const PriceSchema = require("../models/priceModel");
const MessagesSchema = require("../models/messagesModel");
// const {Findistance}= require('../middlewares/FindDistance`')
const { GetPriceTag } = require("../middlewares/GetPriceTag");
const haversine = require("haversine");
const sendNotification = require("../middlewares/onesignal");
const axios = require("axios").default;

function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

exports.Login = async function (req, res) {
  const Password = req.body.password;
  // const Email = req.body.email;
  const Email = String(req.body.email).toLowerCase();
  if (!Password || !Email) {
    return res.status(404).send({ message: "password and email is required" });
  }

  if (!validateEmail(Email)) {
    return res
      .status(404)
      .json({ message: "user with this account is not registered" });
  }

  UserSchema.findOne({ Email }, async function (err, user) {
    if (err) throw err;
    if (!user) {
      res.status(404).json({
        message: "this email is not registered with us",
      });
    } else if (user) {
      const match = await user.verifyPassword(Password);

      if (!match) {
        return res
          .status(501)
          .json({ message: "Error! , the entered password is not correct." });
      } else {
        user.Password = null;
        return res.json({
          userData: user,
          token: jwt.sign({ user: user }, process.env.JWTKEY, {
            expiresIn: "17520hr",
          }),
        });
      }
    }
  });
};

exports.CheckIsRegistered = (req, res) => {
  const Email = String(req.body.email).toLowerCase();
  console.log(Email);
  UserSchema.findOne({ Email }, async function (err, user) {
    if (err) throw err;
    if (!user) {
      res.status(404).json({
        error: true,
        message: "This email is not registered on this site",
      });
    } else if (user) {
      res.status(200).json({
        error: false,
        message: "user is registered",
      });
    }
  });
};

exports.Register = async (req, res) => {
  const Password = req.body.password;
  // const Email = req.body.email;
  const Email = String(req.body.email).toLowerCase();
  const mobile = req.body.mobile;
  const fname = req.body.fname;
  const lname = req.body.lname;

  // email, password, mobile, fname, lname

  if (!validateEmail(Email)) {
    return res
      .status(404)
      .json({ message: "pls use a valid email address to register" });
  }

  if (!Password || !Email || !lname || !fname || !mobile) {
    return res.status(404).json({
      message: "oops! you didnt fill all values required,kindly try again",
    });
  }

  const existingUser = await UserSchema.findOne({ Email: Email });
  if (existingUser) {
    return res.status(401).json({
      message: `a user with email ${Email}is already registred, try to login`,
    });
  }

  try {
    const Passwordhash = bcrypt.hashSync(Password, 10);
    const newUser = new UserSchema({
      Email,
      Password: Passwordhash,
      lname,
      fname,
      mobile,
    });
    await newUser.save();
    //first level referrer
    //authenticate user here Login
    this.Login(req, res);
  } catch (err) {
    console.log(err);
    return res.status(501).send({
      message: "error occured pls try again or contact admin",
      err: err,
    });
  }
};

exports.UpdateMyAcctNumber = async (req, res) => {
  const { bank_Name, bank_Acct_Number } = req.body;
  if (!bank_Name) {
    return res.status(404).json({ message: "pls provide your bank_Name" });
  }
  if (!bank_Acct_Number) {
    return res.status(404).json({ message: "pls provide bank_Acct_Number" });
  }
  if (bank_Acct_Number && bank_Acct_Number.length > 15) {
    return res.status(404).json({ message: "account nmber is invalid" });
  }

  const params = { bank_Name, bank_Acct_Number };

  UserSchema.findByIdAndUpdate(
    { _id: req.body.id },
    {
      $set: params,
    },
    { new: true, useFindAndModify: false }
  )
    .select("-Password")
    .then((user) => {
      return res.json({
        userData: user,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).send({ err: "an error occured,unable to send" });
    });
  // bank_Name: { type: String },
  // bank_Acct_Number: { type: String },
};

exports.UpdateClient = (req, res) => {
  UserSchema.findById(req.body.id)
    .select("-Password")
    .then((user) => {
      return res.json({
        userData: user,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).send({ err: "an error occured,unable to send" });
    });
};

exports.ConfirmPaymentReceived = async (req, res) => {
  const { payerId } = req.body;

  if (!payerId) {
    console.log("no payer id provided");
    return res.status(404).json({ message: "pls provide your payerId" });
  }
  UserSchema.findById(req.body.id)
    .then((user) => {
      // console.log(user);
      user.downLiners.map(async (payers) => {
        if (payers._id === payerId) {
          // console.log(payers);
          // payers[payers._Id].paymentStatus = true;
          payers["paymentStatus"] = true;
          await user.save();
          UserSchema.findById(payerId)
            .then(async (resdata) => {
              resdata.paymentConfirmed = true;
              await resdata.save();
            })
            .catch((err) => {
              console.log(err);
              return res.status(501).json({ message: "an error occured" });
            });
          this.UpdateClient(req, res);
        }
      });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(404)
        .json({ message: "an error occured try again or contact admin" });
    });
};

// exports.UpdateUserData = async function (req, res) {
//   const {

//   } = req.body;
//   // for (values in req.body) {
//   //   if (req.body[values] === "Null") return (req.body[values] = null);
//   // }
//   const params = {

//   };
//   for (let prop in params) {
//     if (
//       params[prop] === "null" ||
//       params[prop] === undefined ||
//       params[prop] === null
//     ) {
//       delete params[prop];
//     }
//   }
//   // console.log(params);
//   UserSchema.findByIdAndUpdate(
//     { _id: req.body.id },
//     {
//       $set: params,
//     },
//     { new: true, useFindAndModify: false }
//   )
//     .select("-Password")
//     .then((user) => {
//       return res.json({
//         userdata: user,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(401).send({ err: "an error occured,unable to send" });
//     });
// };

exports.SearchPhotogrAphersCloser = (req, res) => {
  const CurrentUser = req.body.sesionlocation;

  photographerSchema
    .find({ lat: { $exists: true, $ne: null } })
    .select("-Password")
    .limit(7)
    .then(async (response) => {
      console.log(response.length);
      await response.map(async (user, index) => {
        if (user.lng & user.lat & CurrentUser.lng & CurrentUser.lat) {
          //here we check distance of search resulte users to the current user
          const userdistance = await haversine(
            {
              latitude: CurrentUser.lat,
              longitude: CurrentUser.lng,
            },
            { latitude: user.lat, longitude: user.lng },
            { unit: "meter" }
          );
          response[index].distance = userdistance;
          console.log(user.distance);
        }

        // else{
        //   return res.status(401).send({ message: 'one or more needed parameters not provided for distance calculation' });
        // }
      });
      return res.status(200).json({ userData: response });
      // response.totalRecords=totalCount
    })
    .catch((err) => {
      return res.status(404).json({ message: "no photographers found within" });
    });
};

exports.fundWallet = async (req, res) => {
  const { transaction_id } = req.body;

  const userId = req.body.id;

  if (!transaction_id) {
    return res.status(404).json({ message: "payment transaction id required" });
  }
  if (!userId) {
    return res.status(404).json({ message: "no CurrentUser id provided" });
  }
  //we verify if the user has trully paid from paystack before givin him/her value
  const isPaid = await axios.get(
    `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
    {
      headers: { Authorization: `Bearer ${process.env.FLUTTER_SECRET_KEY}` },
    }
  );
  if (!isPaid.data.status === "success") {
    return res
      .status(404)
      .json({ message: "payment wasnt successfull, try again" });
  }
  if (isPaid.data.status === "success") {
    // return res
    //   .status(404)
    //   .json({ message: "payment wasnt successfull, try again" });

    const params = { wallet: isPaid.data.data.charged_amount };
    await UserSchema.findByIdAndUpdate(
      { _id: userId },
      {
        $inc: params,
      },
      { new: true, useFindAndModify: false }
    )
      .select("-Password")
      .then((user) => {
        return res.json({
          userData: user,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(501).send({ err: "an error occured,unable update wallet" });
      });
  }
};

exports.bookSession = async (req, res) => {
  const { phographerId, id, address, bookingprocess, transaction_id } =
    req.body;
  // return console.log(req.body);
  //verify_payment from flutterwave api before booking
  if (!transaction_id) {
    return res.status(404).json({ message: "payment transaction id required" });
  }

  const isPaid = await axios.get(
    `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
    {
      headers: { Authorization: `Bearer ${process.env.FLUTTER_SECRET_KEY}` },
    }
  );
  if (!isPaid.data.status === "success") {
    return res
      .status(404)
      .json({ message: "payment wasnt successfull, try again" });
  }

  console.log(req.body);
  if (!phographerId) {
    return res.status(404).json({ message: "no photographers selected" });
  }
  if (!address) {
    return res.status(404).json({ message: "provide location address" });
  }
  if (!id) {
    return res.status(404).json({ message: "no user provided" });
  } else {
    let pricePerMinutes = await GetPriceTag();
    console.log(pricePerMinutes);
    const booknow = new PhotoSession({
      bookedById: id,
      photographerId: phographerId,
      pricePerMinutes: pricePerMinutes,
      address: address,
      payment_Id: transaction_id,
      bookingProcess: {
        ...bookingprocess,
        status: "paid",
        amountPaid: isPaid.data.data.charged_amount,
        payment_type: isPaid.data.data.payment_type,
      },
    });
    await booknow.save();
    //   async (err,success)=>{
    //   if(err){
    //     return console.log(err)
    //   }
    //   else{
    //     console.log("booked")
    //     let message = {
    //       app_id: "6419071e-2c4d-43b0-906c-3704961722e1",
    //       contents: {"en": 'You have received a new invite for a session/invite,check your history to accept offer'},
    //       include_external_user_ids: [phographerId]
    //     };

    //     await sendNotification(message)
    //    return  res.status(200).json({message:'booked success'})
    //   }

    // }

    try {
      let message = {
        app_id: "6419071e-2c4d-43b0-906c-3704961722e1",
        contents: {
          en: "You have received a new invite for a session/invite,check your history to accept offer",
        },
        include_external_user_ids: [phographerId],
      };

      await sendNotification(message);
      //  console.log('item.bookedById',item.bookedById)
    } catch (err) {
      console.log(err);
    } finally {
      photographerSchema.findById(phographerId).then(async (item) => {
        item.newBooking = true;
        await item.save();
      });
      return res.status(200).json({ message: "booked" });
    }
  }
};

exports.GetSesssionHistory = (req, res) => {
  const id = req.body.id;

  PhotoSession.find({ bookedById: id })
    .populate("photographerId", "-Password -newBooking -isPhotographer")
    .then((items) => {
      res.status(200).json({ userData: items });
    })
    .catch((err) => {
      return res.status(404).json({ message: "empty" });
    });
};

// bookedById: {type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema'},
// photographeriD: {type: mongoose.Schema.Types.ObjectId, ref: 'photographerSchema'},

// exports.FetchMessages = (req,res)=>{
//   const id = req.body

//   MessagesSchema.find({sender:id}).populate().populate().then(items=>{
//     return res.status(200).json({ userData: items });
//   }).catch(err=>{
//     console.log(err)
//     return res.status(404).json({message:"empty"})
//   })

// }
exports.sendMessages = async (req, res) => {
  const { body, receiver } = req.body;
  const sender = req.body.id;
  let { title } = req.body;
  if (!receiver || !sender) {
    return res
      .status(501)
      .json({ message: "receiver  or Sender cant not be blank" });
  }
  if (!title) {
    title = "untitled";
  }
  if (!body) {
    return res.status(501).json({ message: "message body can not be blank" });
  } else {
    const newMessages = new MessagesSchema({ title, body, receiver, sender });
    await newMessages.save((err, success) => {
      if (err) {
        console.log("unable to save", err);
        return res.status(501).json({ message: "unable to save" });
      } else {
        return res.status(200).json({
          message: "sent",
        });
      }
    });
  }
};
exports.FetchMessages = (req, res) => {
  const id = req.body.id;

  MessagesSchema.find({ receiver: id })
    .populate("sender", "-Password -newBooking -isPhotographer -wallet")
    .populate("receiver", "-Password -newBooking -isPhotographer -wallet")
    .then((items) => {
      res.status(200).json({ userData: items });
    })
    .catch((err) => {
      return res.status(404).json({ message: "empty" });
    });
};
// exports.SendMessages = (req,res)=>{
//   const id = req.body

//   MessagesSchema.find({receiver:id}).then(items=>{
//     return res.status(200).json({ userData: items });
//   }).catch(err=>{
//     console.log(err)
//     return res.status(404).json({message:"empty"})
//   })

// }

exports.CreatePriceTag = async (req, res) => {
  const userId = req.body.id;
  const price = req.body.price;
  if (!price) {
    return res.status(401).json({ message: "pls provid price" });
  }
  UserSchema.findById(userId)
    .then(async (user) => {
      if (!user.isAdmin) {
        return res.status(401).json({ message: "not authorized, admin only" });
      }
      if (user.isAdmin) {
        const priceTag = await PriceSchema.findOne({ tag: "priceTag" });

        if (!priceTag) {
          let newPriceTag = new PriceSchema({ tag: "priceTag", price: price });
          await newPriceTag.save((err, success) => {
            if (err) {
              console.log(err);
              return res
                .status(501)
                .json({ message: "unable to create new price tag" });
            } else {
              return res.status(200).json({ message: "price created" });
            }
          });
        } else {
          priceTag.price = price;
          await priceTag.save();
          console.log("saved");
          return res.status(200).json({ userData: price });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(501)
        .json({ message: "unable to perfom the requested operation" });
    });
};

exports.GetPricePriceTag = async (req, res) => {
  PriceSchema.findOne({ tag: "priceTag" })
    .then((item) => {
      return res.status(200).json({ userData: { price: item.price } });
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ message: "requested price tag not available" });
    });
};
exports.CountUsersAndPhotgraphers = async (req, res) => {
  UserSchema.find()
    .then(async (item) => {
      const photgraphers = await photographerSchema.find();

      return res.status(200).json({
        userData: {
          usersCount: item.length,
          phographersCount: photgraphers.length,
        },
      });
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ message: "requested operation can not completed" });
    });
};

// if(!priceTag){
//   let newPriceTag= new PriceSchema({tag:'priceTag',price:price})
//   await newPriceTag.save((err,success)=>{
//     if(err){
//       return res.status(501).json({message:"unable to create new price tag"})
//     }
//     else{
//       return res.status(200).json({message:"price created"})
//     }
//   })
//   }
//   else{
//     priceTag.price=price
//     await priceTag.sav
//     console.log(saved)
//     return res.status(200).json({message:'price updated'})
//          }

exports.SearchUsers = (req, res) => {
  if (!req.query.search) {
    console.log("empty search");
    return res.status(200).json({ searchResults: [] });
  }
  console.log(req.query.search);
  UserSchema.find({ Email: { $regex: `${req.query.search}`, $options: "i" } })
    .select("-Password")
    .limit(6)
    .then((resdata) => {
      // console.log(resdata);
      res.status(200).json({ userData: resdata });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).json({ message: "an error occured" });
    });
};
exports.SearchPhotographers = (req, res) => {
  if (!req.query.search) {
    console.log("empty search");
    return res.status(200).json({ searchResults: [] });
  }
  console.log(req.query.search);
  photographerSchema
    .find({ Email: { $regex: `${req.query.search}`, $options: "i" } })
    .select("-Password")
    .limit(6)
    .then((resdata) => {
      // console.log(resdata);
      res.status(200).json({ userData: resdata });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).json({ message: "an error occured" });
    });
};
// var message = {
//   app_id: "6419071e-2c4d-43b0-906c-3704961722e1",
//   contents: {"en": "sup"},
//   include_external_user_ids: ["605e17222839b416d88c0b31"]
// };

// sendNotification(message)
