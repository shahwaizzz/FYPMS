const PMO = require("../models/pmo-model");
const Supervisor = require("../models/supervisor-model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const Student = require("../models/student-model");

const createStudent = async (req, res) => {
  const std = await Student.create({ ...req.body });
  res.status(StatusCodes.OK).json({ ...req.body.roll_number });
};

const viewStudentList = async (req, res) => {
  const std = await Student.find({});
  res.send(std);
};

const editStudent = async (req, res) => {
  const std = await Student.updateOne({roll_number:req.body.roll_number}, {$set:req.body});
  res.send(std);
}

const deleteStudent = async (req, res) => {
  const std = await Student.deleteOne({roll_number:req.params.roll_number});
  res.send(std);
}

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please Provide Email and Password");
  }

  const pmo = await PMO.findOne({ email });
  if (!pmo) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await pmo.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Your password does not match");
  }
  const token = pmo.createJWT();
  res.status(StatusCodes.OK).json({ pmo: { name: pmo.name }, token });
};

const createSupervisors = async (req, res) => {
  console.log(req.body);
  const supervisor = await Supervisor.create({ ...req.body });
  res
    .status(StatusCodes.CREATED)
    .json({ supervisor: { name: supervisor.name } });
};

const viewSupervisors = async (req, res) => {
  const supervisor = await Supervisor.find({});
  res.status(StatusCodes.OK).json({ supervisor });
};

module.exports = {
  login,
  createSupervisors,
  createStudent,
  viewStudentList,
  editStudent,
  viewSupervisors,
  deleteStudent,
};
