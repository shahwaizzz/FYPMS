require("dotenv").config();
const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const StudentSchema = new mongoose.Schema({
  rollNumber: {
    type: String,
    required: [true, "Please Provide Roll Number"],
    minlength: 10,
    maxlength: 15,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please Provide Name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please Provide Email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  phone: {
    type: String,
    // minlength: 11,
    maxlength: 13,
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
  },
  department: {
    type: String,
    required: [true, "Please Provide Department"],
    minlength: 4,
    maxlength: 15,
  },
  section: {
    type: String,
    required: [true, "Please Provide Section"],
    maxlength: 15,
  },
  batch: {
    type: String,
    required: [true, "Please Provide Batch"],
    minlength: 4,
    maxlength: 15,
  },
  marks: {
    proposal: Number,
    mid: Number,
    final: Number,
    supervisor: Number,
  },
});
StudentSchema.pre("save", async function () {
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
});
StudentSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_Lifetime,
    }
  );
};
StudentSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bycrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Students", StudentSchema);
