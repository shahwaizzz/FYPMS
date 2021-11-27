const PMO = require("../models/pmo-model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please Provide Email and Password");
  }
  const pmo = await PMO.findOne({ email });
  if (!pmo) {
    console.log(req.body);
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await prompt.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Your password does not match");
  }
  const token = pmo.createJWT();
  res.status(StatusCodes.OK).json({ pmo: { name: pmo.name }, token });
};

module.exports = {
  login,
};
