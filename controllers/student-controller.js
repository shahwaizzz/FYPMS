const Project = require("../models/project-model");
const Student = require("../models/student-model");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
var mongoose = require('mongoose');

const addProjectDetails = async (req, res) => {
  const studentId = mongoose.Types.ObjectId(req.user.userId);
   const project = await Project.findOneAndUpdate({group:studentId}, req.body,{
    new: true,
    runValidators: true,
  } );
  
  res.status(StatusCodes.OK).json({ project });
};

module.exports = {
  addProjectDetails,
};
