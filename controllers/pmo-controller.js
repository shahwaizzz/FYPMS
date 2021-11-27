const PMO = require("../models/pmo-model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

// const register = async (req, res) => {
//   const pmo = await PMO.create({ ...req.body })
//   // const token = pmo.createJWT()
//   res.status(StatusCodes.CREATED).json({ pmo: { name: pmo.name } })
// }

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please Provide Email and Password");
  }
  console.log('log1')
  const pmo = await PMO.findOne({ email });
  console.log('log2')
  if (!pmo) {
    console.log(req.body);
    throw new UnauthenticatedError("Invalid Credentials");
  }
  console.log('log3')
  const isPasswordCorrect = await pmo.comparePassword(password);
  console.log('log4')
  if (!isPasswordCorrect) {
    console.log('log5')
    throw new UnauthenticatedError("Your password does not match");
  }
  // const token = pmo.createJWT();
  res.status(StatusCodes.OK).json({ pmo });
};

module.exports = {
  login, 
};
