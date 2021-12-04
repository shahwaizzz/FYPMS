const Project = require("../models/project-model");
const Supervisor = require("../models/supervisor-model");
const Student = require("../models/student-model");
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

module.exports = {
  createProject,
  getAllProjects,
  getSingleProject,
  deleteProject,
  updateProject,
};