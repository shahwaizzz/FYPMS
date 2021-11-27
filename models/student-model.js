require("dotenv").config();
const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const student = new mongoose.Schema({
  roll_number:{
  type: String,
  required: [true, "Please Provide Roll Number"],
  minlength: 10,
  maxlength: 15,
  unique: true,
},
name:{
  type: String,
  required: [true, "Please Provide Name"],
  minlength: 3,
  maxlength: 50,
}, 
email:{
  type: String,
  required: [true, "Please Provide Email"],
  match: [
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "Please provide valid email",
  ],
  unique: true,
},
phone:{
  type: String,
  minlength: 11,
  maxlength: 13,
  unique:true,
},
password:{
    type:String,
    required: [true, "Please Provide Password"],
},
department:{
    type: String,
    required: [true, "Please Provide Department"],
    minlength: 4,
    maxlength: 15,
},
section:{
  type: String,
  required: [true, "Please Provide Section"],
  minlength: 4,
  maxlength: 15,
},
batch:{
  type: String,
  required: [true, "Please Provide Batch"],
  minlength: 5,
  maxlength: 15,
}
})
student.pre("save", async function () {
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
});
student.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_Lifetime,
    }
  )
}
student.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bycrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Students", student);
