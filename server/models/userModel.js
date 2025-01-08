const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "firstName is required."],
  },
  lastName: String,
  mobileNumber: {
    type: String,
    required: [true, "Mobile number is required."],
    validate: {
      validator: function (mobile) {
        return validator.isMobilePhone(mobile, "en-IN");
      },
      message: (props) => `${props.value} is not a valid mobile number!`,
    },
    unique:true
  },
  password:{
    type:String,
    required:[true,"Password is required."]
  },
  createdBy:{
    type:String,
    default:"System"
  },
  updatedBy:{
    type:String,
    default:"System"
  }
},{timestamps:true});

userSchema.pre("save",async function(){
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.comparePasswords = async(pass,passDB)=>{
  const check = await bcrypt.compare(pass,passDB);
  return check
}

const Users = mongoose.model("Users",userSchema);

module.exports = Users;