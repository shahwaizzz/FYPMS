const Student = require("../models/student-model");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please Provide Email and Password");
  }

  const student = await Student.findOne({ email });
  if (!student) {
    throw new UnauthenticatedError("User does not exist");
  }

  const isPasswordCorrect = student.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Password is wrong");
  }
  const token = student.createJWT();

  res.status(StatusCodes.OK).json({ student: { name: student.name }, token });
};

module.exports = {
  login,
};
