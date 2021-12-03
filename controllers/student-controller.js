const Project = require("../models/project-model");
const Student = require("../models/student-model");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const addProjectDetails = async (req, res) => {
  const studentId = req.user.userId;
  const project = Project.findOne({ group: { $in: [studentId] } });
  console.log("Project", project);
  if (!project) {
    throw new NotFoundError("Project does not exist");
  }
  res.status(StatusCodes.OK).json({ project });
};

module.exports = {
  addProjectDetails,
};
