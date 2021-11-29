const Project = require("../models/project-model");
const Supervisor = require("../models/supervisor-model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

// Create And Manage Project
const createProject = async (req, res) => {
  const project = await Project.create({ ...req.body });
  const supID = project.supervisor
  console.log(supID)
  const supervisor = await Supervisor.findOne({_id: supID})
  res.status(StatusCodes.OK).json({supervisor: { name: supervisor.name }});
};

module.exports={
    createProject,
};