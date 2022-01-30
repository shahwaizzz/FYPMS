require("dotenv").config();
const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SupervisorSchema = new mongoose.Schema({
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
  department: {
    type: String,
    required: ["true", "Please Provide Department"],
    enum: {
      values: ["CS", "IT", "SE"],
      message: "{VALUE} is not supported",
    },
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
    minlength: 6,
  },
  phone:{
    type: String,
    maxlength:13,
  }
});

SupervisorSchema.pre("save", async function () {
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
});
SupervisorSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    'VkYp3s6v9y$B&E)H@McQeThWmZq4t7w!',
    {
      expiresIn: '30d',
    }
  );
};
SupervisorSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bycrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Supervisors", SupervisorSchema);
