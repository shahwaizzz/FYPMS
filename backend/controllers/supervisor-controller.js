const Project = require("../models/project-model");
const Supervisor = require("../models/supervisor-model");
const Student = require("../models/student-model");
const Meeting = require("../models/meeting-model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

// Create And Manage Project
const createProject = async (req, res) => {
  req.body.supervisor = req.user.userId;
  const project = await Project.create({ ...req.body });
  const supID = project.supervisor;

  const supervisor = await Supervisor.findOne({ _id: supID });
  res.status(StatusCodes.OK).json({ supervisor: { name: supervisor.name } });
};

const getAllProjects = async (req, res) => {
  const projects = await Project.find({ supervisor: req.user.userId }).sort(
    "title"
  );
  res.status(StatusCodes.OK).json({ count: projects.length, projects });
};

const getSingleProject = async (req, res) => {
  const { id: projectId } = req.params;
  const supervisorId = req.user.userId;
  const project = await Project.findOne({
    _id: projectId,
    supervisor: supervisorId,
  });
  if (!project) {
    throw new NotFoundError("Project does not found");
  }
  res.status(StatusCodes.OK).json({ project });
};

const deleteProject = async (req, res) => {
  const { id: projectId } = req.params;
  const supervisorId = req.user.userId;
  const project = await Project.findOneAndRemove({
    _id: projectId,
    supervisor: supervisorId,
  });
  if (!project) {
    throw new NotFoundError("Project does not found");
  }
  res.status(StatusCodes.OK).send("Deleted");
};
const updateProject = async (req, res) => {
  const { id: projectId } = req.params;
  const supervisorId = req.user.userId;
  // const { title, group } = req.body;
  // if (title === "" || group === "") {
  //   throw new BadRequestError("Company and Position values cannot be empty");
  // }
  const project = await Project.findByIdAndUpdate(
    { _id: projectId, supervisor: supervisorId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!project) {
    throw new NotFoundError("Project does not exist");
  }
  res.status(StatusCodes.OK).json({ project });
};

const viewEvents = async (req, res) => {
  const events = await Event.find({});
  res.status(StatusCodes.OK).json({ events });
};

const createMeeting = async (req, res) => {
  req.body.supervisor = req.user.userId;
  const meeting = await Meeting.create({ ...req.body });
  res.status(StatusCodes.OK).json({ meeting, msg: "Meeting Created" });
};
const addMarks = async (req, res) => {
  const { marks, studentId } = req.body;

  const updateStudent = await Student.findByIdAndUpdate(
    { _id: req.body.studentId },
    {
      $set: {
        "marks.supervisor": marks,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  // console.log(updateStudent);
  // res.status(StatusCodes.OK).json({ project });
  res.status(StatusCodes.OK).json({ updateStudent });
};

module.exports = {
  createProject,
  getAllProjects,
  getSingleProject,
  deleteProject,
  updateProject,
  viewEvents,
  createMeeting,
  addMarks,
};
