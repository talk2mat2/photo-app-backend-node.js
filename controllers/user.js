const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const photographerSchema = require("../models/Photographer");
const UserSchema = require("../models/userMoodel");

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

exports.Login = async function (req, res) {
  const Password = req.body.password;
  // const Email = req.body.email;
  const Email =   String(req.body.email).toLowerCase();
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
        message:
          "this email is not registered with us",
      });
    } else if (user) {
      const match = await user.verifyPassword(Password);

      if (!match) {
        return res
          .status(401)
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
  const Email =   String(req.body.email).toLowerCase();

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
  const Email =   String(req.body.email).toLowerCase();
  const mobile=req.body.mobile;
  const fname=req.body.fname
  const lname=req.body.lname

  // email, password, mobile, fname, lname


  if (!validateEmail(Email)) {
    return res
      .status(404)
      .json({ message: "pls use a valid email address to register" });
  }

  if (!Password || !Email||!lname||!fname||!mobile) {
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
      lname,fname,mobile
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
      res.status(401).send({ err: "an error occured,unable to send" });
    });
  // bank_Name: { type: String },
  // bank_Acct_Number: { type: String },
};

exports.UpdateClient = (req, res) => {
  UserSchema.findById(req.body.id)
    .then((user) => {
      return res.json({
        userData: user,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send({ err: "an error occured,unable to send" });
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

exports.SearchPhotogrAphersCloser=(req,res)=>{
photographerSchema.find({}).select('-Password').then(resData=>{
res.status(200).json({userData:resData})
}).catch(err=>{
  res.status(401).json({message:"no photographers found within"})
})
}