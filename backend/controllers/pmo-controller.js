const PMO = require("../models/pmo-model");
const Supervisor = require("../models/supervisor-model");
const path = require("path");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const Student = require("../models/student-model");

// Create And Manage Students
const createStudent = async (req, res) => {
  const uploadPath = path.join(__dirname, "../../");
  console.log(uploadPath);
  const student = await Student.create({ ...req.body });
  res
    .status(StatusCodes.OK)
    .json({ student, err: { code: 0, message: "No error found" } });
};
const getStudent = async (req, res) => {
  const { id: studentId } = req.params;

  const student = await Student.findOne({ _id: studentId });

  if (!student) {
    throw new NotFoundError("Student does not found");
  }

  res
    .status(StatusCodes.OK)
    .json({ student, err: { code: 0, message: "No error found" } });
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

  res
    .status(StatusCodes.OK)
    .json({ student, err: { code: 0, message: "No error found" } });
};

const deleteStudent = async (req, res) => {
  const { id: studentId } = req.params;

  const student = await Student.findOneAndRemove({ _id: studentId });

  if (!student) {
    throw new NotFoundError("Student does not exist");
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Deleted", err: { code: 0, message: "No error found" } });
};

// Create And Manage Supervisors
const createSupervisors = async (req, res) => {
  console.log(req.body);
  const supervisor = await Supervisor.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({
    supervisor: { name: supervisor.name },
    err: { code: 0, message: "No error found" },
  });
};

const viewSupervisors = async (req, res) => {
  const supervisor = await Supervisor.find({});
  res
    .status(StatusCodes.OK)
    .json({ supervisor, err: { code: 0, message: "No error found" } });
};

const getSupervisor = async (req, res) => {
  const { id: supervisorId } = req.params;

  const supervisor = await Supervisor.findOne({ _id: supervisorId });

  if (!supervisor) {
    throw new NotFoundError("Supervisor does not exist");
  }

  res
    .status(StatusCodes.OK)
    .json({ supervisor, err: { code: 0, message: "No error found" } });
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
  res
    .status(StatusCodes.OK)
    .json({ supervisor, err: { code: 0, message: "No error found" } });
};

const deleteSupervisor = async (req, res) => {
  const { id: supervisorId } = req.params;
  const supervisor = await Supervisor.findOneAndRemove({ _id: supervisorId });

  if (!supervisor) {
    throw new NotFoundError("Student does not exist");
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Deleted", err: { code: 0, message: "No error found" } });
};

const Event = require("../models/event-model");
//create event
const createEvent = async (req, res) => {
  const event = await Event.create({ ...req.body });
  res.status(StatusCodes.OK).json({ event , err: { code: 0, message: "No error found" }});
};
const viewEvents = async (req, res) => {
  const events = await Event.find({});
  res.status(StatusCodes.OK).json({ events, err: { code: 0, message: "No error found" }});
};
const deleteEvent = async (req, res) => {
  const { id: eventId } = req.params;
  const event = await Event.findOneAndRemove({ _id: eventId });

  if (!event) {
    throw new NotFoundError("Event does not exist");
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Deleted", err: { code: 0, message: "No error found" } });
};
// adding student marks
const addMarks = async (req, res) => {
  const { id: studentId } = req.params;
  const { marks, flag } = req.body;
  if (flag === "proposal") {
    const updatedStudent = await Student.findByIdAndUpdate(
      { _id: studentId },
      {
        $set: {
          "marks.proposal": marks,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(StatusCodes.OK).json({ updatedStudent });
  }
  if (flag === "mid") {
    const updatedStudent = await Student.findByIdAndUpdate(
      { _id: studentId },
      {
        $set: {
          "marks.mid": marks,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(StatusCodes.OK).json({ updatedStudent });
  }
  if (flag === "final") {
    const updatedStudent = await Student.findByIdAndUpdate(
      { _id: studentId },
      {
        $set: {
          "marks.final": marks,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(StatusCodes.OK).json({ updatedStudent });
  }

  // console.log(updateStudent);
  // res.status(StatusCodes.OK).json({ project });
};
// manage projects
const Project = require("../models/project-model");
const getAllProjects = async (req, res) => {
  const projects = await Project.find({}).sort("title");
  res.status(StatusCodes.OK).json({
    count: projects.length,
    projects,
    err: { code: 0, message: "No error found" },
  });
};

const getSingleProject = async (req, res) => {
  const { id: projectId } = req.params;
  const project = await Project.findOne({
    _id: projectId,
  });
  if (!project) {
    throw new NotFoundError("Project does not found");
  }
  res
    .status(StatusCodes.OK)
    .json({ project, err: { code: 0, message: "No error found" } });
};

const deleteProject = async (req, res) => {
  const { id: projectId } = req.params;
  const project = await Project.findOneAndRemove({
    _id: projectId,
  });
  if (!project) {
    throw new NotFoundError("Project does not found");
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "Deleted", err: { code: 0, message: "No error found" } });
};
const updateProject = async (req, res) => {
  const { id: projectId } = req.params;
  // const { title, group } = req.body;
  // if (title === "" || group === "") {
  //   throw new BadRequestError("Company and Position values cannot be empty");
  // }
  const project = await Project.findByIdAndUpdate(
    { _id: projectId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!project) {
    throw new NotFoundError("Project does not exist");
  }
  res
    .status(StatusCodes.OK)
    .json({ project, err: { code: 0, message: "No error found" } });
};
const createProject = async (req, res) => {
  const project = await Project.create({ ...req.body });

  res
    .status(StatusCodes.OK)
    .json({ project, err: { code: 0, message: "No error found" } });
};
const uploadTemplateDocuments = async (req, res) => {
  if (req.files === null) {
    throw new BadRequestError("No file was uploaded");
  }
  const file = req.files.file;
  const uploadPath = path.join(__dirname, "../../");
  console.log(uploadPath);
  file.mv(`../../custom-frontend/public/uploads/${file.name}`, (err) => {
    console.error(err);
    return res.status(500).send(err);
  });
  res.status(StatusCodes.OK).json({ msg: "File Uploaded Successfully" });
  // res
  //   .status(StatusCodes.OK)
  //   .json({ fileName: file.name, filePath: `/uploads/${file.name}` });
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
  createEvent,
  deleteEvent,
  viewEvents,
  addMarks,
  getAllProjects,
  getSingleProject,
  deleteProject,
  updateProject,
  createProject,
  uploadTemplateDocuments,
};
