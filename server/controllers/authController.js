const Users = require("../models/userModel");
const { asyncHandler } = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");


//VERIFYING JWT......
exports.resourceAccess = (req,res,next)=>{
  const authHead = req.headers["authorization"];
  if(!authHead){
    const error = new CustomError("Invalid headers.",400);
    return next(error);
  }

  const token = authHead.split(" ")[1];
  if(!token){
    const error  = new CustomError("You dont have access to perform this action.",401);
    return next(error);
  }

  jwt.verify(token,process.env.JWT_SECRET,(err,data)=>{
    if(err){
      const error = new CustomError(
        "You dont have access to perform this action",
        401
      );
      return next(error);
    }
    req.user = data;
    next();
  });
};

//JWT GENERATION......
const generateToken = (data)=>{
  return jwt.sign(data,process.env.JWT_SECRET,{expiresIn:'2d'});
}

//REGISTER USER
exports.registerUser = asyncHandler(async(req,res,next)=>{
  const {mobileNumber,firstName,lastName,password} = req.body;
  const checkUser = await Users.findOne({ mobileNumber});

  if(checkUser){
    const error = new CustomError("User already exists with the provided mobile number.",400);
    return next(error);
  }

  await Users.create({
    firstName,
    lastName,
    password,
    mobileNumber,
  });

  res.status(201).json({
    status:"success",
    message:"User created successfully."
  });
});

//LOGIN USER ...........
exports.loginUser = asyncHandler(async(req,res,next)=>{
  const checkUser = await Users.findOne({
    mobileNumber: req.body.mobileNumber,
  });

  if (!checkUser) {
    const error = new CustomError("User not exists with provided credentials.",404);
    return next(error);
  }

  if(!(await checkUser.comparePasswords(req.body.password,checkUser.password))){
    const error = new CustomError("Invalid password.Please try again.",401);
    return next(error);
  }

  const token = generateToken({
    firstName:checkUser.firstName,
    lastName:checkUser?.lastName,
    mobileNumber:checkUser.mobileNumber
  })

  res.status(200).json({
    status:"success",
    token,
    data:{
      firstName:checkUser.firstName,
      lastName:checkUser?.lastName,
      mobileNumber:checkUser.mobileNumber
    },
    message:"Authenticated."
  });
});