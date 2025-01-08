const Users = require("../models/userModel");
const { asyncHandler } = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");

exports.updateRecords = asyncHandler(async(req,res,next)=>{
  const {id} = req.params;
  const record = await Users.findById(id);

  if(!record){
    const error = new CustomError("Data not found.",404);
    return next(error);
  }

  const updatedData = {
    createdBy:req.user.firstName + " " + req.user.lastName,
    updatedBy: req.user.firstName + " " + req.user.lastName,
    ...req.body
  }

  await Users.findByIdAndUpdate(id,updatedData,{new:true,runValidators:true});
  res.status(200).json({
    status:"success",
    message:"Record updated successfully."
  });
});

exports.deleteRecord = asyncHandler(async (req,res,next)=>{
  const {id} = req.params;
  const checkUser = await Users.findById(id);

  if(!checkUser){
    const error = new CustomError("Data not found.",404);
    return next(error);
  }

  await Users.findByIdAndDelete(id);
  res.status(200).json({
    status:"success",
    message:"Record deleted successfully."
  }); 
});

exports.fetchRecordById = asyncHandler(async (req,res,next)=>{
  const {id} = req.params;
  const record = await Users.findById(id);
  if (!record) {
    const error = new CustomError("Data not found.", 404);
    return next(error);
  }
  res.status(200).json({
    status:"success",
    data:{
      record
    }
  });
});