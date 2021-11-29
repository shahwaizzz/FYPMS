const PMO = require("../models/pmo-model");
const Supervisor = require("../models/supervisor-model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const Student = require("../models/student-model");

// Create And Manage Students
const createStudent = async (req, res) => {
  const student = await Student.create({ ...req.body });
  res.status(StatusCodes.OK).json({ student });
};
const getStudent = async (req, res) => {
  const { id: studentId } = req.params;

  const student = await Student.findOne({ _id: studentId });

  if (!student) {
    throw new NotFoundError("Student does not found");
  }

  res.status(StatusCodes.OK).json({ student });
};

const viewStudentList = async (req, res) => {
  const std = await Student.find({});
  res.status(StatusCodes.OK).send(std);
};

const editStudent = async (req, res) => {
  const { id: studentId } = req.params;
  const {
    email,
    rollNumber,
    name,
    phone,
    password,
    section,
    batch,
    department,
  } = req.body;
  if (
    email === "" ||
    rollNumber === "" ||
    name === "" ||
    phone === "" ||
    password === "" ||
    section === "" ||
    batch === "" ||
    department === ""
  ) {
    throw new BadRequestError("Values cannot be empty");
  }
  const student = await Student.findByIdAndUpdate(
    { _id: studentId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!student) {
    throw new NotFoundError("Student does not exist");
  }

  res.status(StatusCodes.OK).json({ student });
};

const deleteStudent = async (req, res) => {
  const { id: studentId } = req.params;

  const student = await Student.findOneAndRemove({ _id: studentId });

  if (!student) {
    throw new NotFoundError("Student does not exist");
  }

  res.status(StatusCodes.OK).send("Deleted");
};

// Create And Manage Supervisors
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

const getSupervisor = async (req, res) => {
  const { id: supervisorId } = req.params;

  const supervisor = await Supervisor.findOne({ _id: supervisorId });

  if (!supervisor) {
    throw new NotFoundError("Supervisor does not exist");
  }

  res.status(StatusCodes.OK).json({ supervisor });
};

const editSupervisor = async (req, res) => {
  const { id: supervisorId } = req.params;
  const { name, email, department, password } = req.body;
  if (name === "" || email === "" || department === "" || password === "") {
    throw new BadRequestError("Values cannot be empty");
  }
  const supervisor = await Supervisor.findByIdAndUpdate(
    { _id: supervisorId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!supervisor) {
    throw new NotFoundError("Student does not exist");
  }
  res.status(StatusCodes.OK).json({ supervisor });
};

const deleteSupervisor = async (req, res) => {
  const { id: supervisorId } = req.params;
  const supervisor = await Supervisor.findOneAndRemove({ _id: supervisorId });

  if (!supervisor) {
    throw new NotFoundError("Student does not exist");
  }

  res.status(StatusCodes.OK).send("Deleted");
};

module.exports = {
  createStudent,
  getStudent,
  editStudent,
  viewStudentList,
  deleteStudent,
  createSupervisors,
  getSupervisor,
  viewSupervisors,
  editSupervisor,
  deleteSupervisor,
};
