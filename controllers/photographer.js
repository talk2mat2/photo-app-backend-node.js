const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var shado = require("shado");
const sendNotification = require('../middlewares/onesignal')
const photographerSchema = require("../models/Photographer");
const PhotoSession= require('../models/PhotoSession')

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
      .json({ message: "This  photographer account is not registered" });
  }

  photographerSchema.findOne({ Email }, async function (err, user) {
    if (err) throw err;
    if (!user) {
      res.status(404).json({
        message:
          "This photographer account is not registered",
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

exports.updateMyLocation=(req,res)=>{
console.log(req.body)
const {lng,lat,id}=req.body
if(!lng||!lat){
  return res.status(501).json({message:'not updated'})
}
photographerSchema.findByIdAndUpdate({_id:id},
  {
    $set: {lat:lat,lng:lng},
  },
  { new: true, useFindAndModify: false }
  ).then(resdata=>{
this.UpdateClient(req,res)
}).catch(err=>{
  console.log(err)
  return res.status(501).json({message:'an error occured ,thats all we know'})
})
}

exports.CheckIsRegistered = (req, res) => {
  const Email =   String(req.body.email).toLowerCase();

  photographerSchema.findOne({ Email }, async function (err, user) {
    if (err) throw err;
    if (!user) {
      res.status(404).json({
        error: true,
        message: " A photographer with This email is not registered on this site",
      });
    } else if (user) {
      res.status(200).json({
        error: false,
        message: "photographer is registered",
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
      message: "error occured! you didnt fill all values required,kindly try again",
    });
  }

  const existingUser = await photographerSchema.findOne({ Email: Email });
  if (existingUser) {
    return res.status(401).json({
      message: `A photographer with email ${Email}is already registred, try to login`,
    });
  }

  try {
    const Passwordhash = bcrypt.hashSync(Password, 10);
   
    if(req.body.lat&&req.body.lng){
      const newUser = new photographerSchema({
        Email,
        Password: Passwordhash,
        lname,fname,mobile,lng:req.body.lng,lat:req.body.lat
      });
      await newUser.save();
    }
    else{
      const newUser = new photographerSchema({
        Email,
        Password: Passwordhash,
        lname,fname,mobile
      });
      await newUser.save();
    }

  
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

// exports.UpdateMyAcctNumber = async (req, res) => {
//   const { bank_Name, bank_Acct_Number } = req.body;
//   if (!bank_Name) {
//     return res.status(404).json({ message: "pls provide your bank_Name" });
//   }
//   if (!bank_Acct_Number) {
//     return res.status(404).json({ message: "pls provide bank_Acct_Number" });
//   }
//   if (bank_Acct_Number && bank_Acct_Number.length > 15) {
//     return res.status(404).json({ message: "account nmber is invalid" });
//   }

//   const params = { bank_Name, bank_Acct_Number };

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
//         userData: user,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(401).send({ err: "an error occured,unable to send" });
//     });
//   // bank_Name: { type: String },
//   // bank_Acct_Number: { type: String },
// };

exports.UpdateClient = (req, res) => {
  photographerSchema.findById(req.body.id).select('-Password')
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

exports.FectMyBookings=(req,res)=>{
const {id}= req.body
PhotoSession.find({photographerId:id}).populate('bookedById','-Password -wallet').then(items=>{
  console.log(items);
  res.status(200).json({
    userData:items,
  });
}).catch(err=>{
  res.status(404).json({
    error: true,
    message: "not found",
  });
})
}

exports.StartSession = (req,res) => {
  console.log(req.query.id)
  const sessionId = req.query.id;
  if (!sessionId) {
    return res.status(501).json({
      error: true,
      message: " pls provide a valid session Id",
    });
   
}
PhotoSession.findById(sessionId).then( async (item)=>{
  let timenow = new Date()
  if(!item.accepted){
    console.log(item.accepted)
    return res.status(404).json({
      error: true,
      message: "unable to start event not accpted",
    });
  }
if(!item.timeStart) {item.timeStart =  timenow}
await item.save()
this.FectMyBookings(req,res)
}).catch(err=>{
  console.log(err)
  res.status(404).json({
    error: true,
    message: "unable to start event",
  });
})
}
exports.EndSession = (req,res) => {
  console.log(req.query.id)
  const sessionId = req.query.id;
  if (!sessionId) {
    return res.status(501).json({
      error: true,
      message: " pls provide a valid session Id",
    });
   
}
PhotoSession.findById(sessionId).then( async (item)=>{
  let timenow = new Date()
  if(item.timeStart&&timenow){
    //this module helps us to get time different between two time stamp in iso formay
const sessionDuration = await shado.date.set(item.timeStart, timenow).getMinutes()
item.timeEnd =  timenow
if(sessionDuration>0){item.sessionDuration =sessionDuration}
else{item.sessionDuration=1}
item.completed = true
await item.save()
this.FectMyBookings(req,res)
  }
}).catch(err=>{
  console.log(err)
  res.status(404).json({
    error: true,
    message: "unable to end event arror ocured",
  });
})
}
exports.AcceptOffer = (req,res) => {
  // console.log(req.query.id)
  const sessionId = req.query.id;
  if (!sessionId) {
    return res.status(501).json({
      error: true,
      message: " pls provide a valid booked session Id",
    });
   
}
PhotoSession.findById(sessionId).then( async (item)=>{
 
  if(!item.accepted){
    //this module helps us to get time different between two time stamp in iso formay
item.accepted =  true
await item.save()
try{ 
    let message = { 
      app_id: "6419071e-2c4d-43b0-906c-3704961722e1",
      contents: {"en": 'Your request has been accepted by the photographer/videographer, check your session history for information'},
      include_external_user_ids: [item.bookedById]
    };
    
    await sendNotification(message)
   console.log('item.bookedById',item.bookedById)
 }
catch(err){
  console.log(err)
}
finally{this.FectMyBookings(req,res)}
  }
}).catch(err=>{
  console.log(err)
  res.status(404).json({
    error: true,
    message: "an error occured,unable to end accept offer",
  });
})
}