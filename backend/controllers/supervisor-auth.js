const Supervisor = require("../models/supervisor-model");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please Provide Email and Password");
  }

  const supervisor = await Supervisor.findOne({ email });
  if (!supervisor) {
    throw new UnauthenticatedError("User does not exist");
  }

  const isPasswordCorrect = supervisor.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Password is wrong");
  }
  const token = supervisor.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ supervisor: { name: supervisor.name,userId:supervisor._id }, token });
};

module.exports = {
  login,
};
