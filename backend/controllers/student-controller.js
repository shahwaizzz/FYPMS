const Project = require("../models/project-model");
const Student = require("../models/student-model");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const Event = require("../models/event-model");
var mongoose = require("mongoose");

const addProjectDetails = async (req, res) => {
  const { description, objectives } = req.body;
  if (!description || !objectives) {
    throw new BadRequestError("Please fil all the details");
  }
  const studentId = mongoose.Types.ObjectId(req.user.userId);
  const project = await Project.findOneAndUpdate(
    { group: studentId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ project });
};

const viewEvents = async (req, res) => {
  const events = await Event.find({});
  res.status(StatusCodes.OK).json({ events });
  // res.send("Events");
};
const viewMarks = async (req, res) => {
  res.send("View Marks");
};
const viewMeetings = async (req, res) => {
  res.send("View Meetings");
};

module.exports = {
  addProjectDetails,
  viewEvents,
};
