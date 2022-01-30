require("dotenv").config();
const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pmoSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: [true, "Please Provide Password"],
    minlength: 6,
  },
});

pmoSchema.pre("save", async function () {
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
});
pmoSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    'VkYp3s6v9y$B&E)H@McQeThWmZq4t7w!',
    {
      expiresIn: '30d',
    }
  )
}
pmoSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bycrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("PMO", pmoSchema);
