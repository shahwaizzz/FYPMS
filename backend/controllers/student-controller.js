const Project = require("../models/project-model");
const Student = require("../models/student-model");
const Meeting = require("../models/meeting-model");
const Event = require("../models/event-model");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
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
  if (!project) {
    throw new NotFoundError("Project does not exist");
  }

  res.status(StatusCodes.OK).json({ project });
};

const viewEvents = async (req, res) => {
  const events = await Event.find({});
  res.status(StatusCodes.OK).json({ events });
  // res.send("Events");
};
const viewMarks = async (req, res) => {
  const studentId = req.user.userId;
  const marks = await Student.find({ _id: studentId }).select("marks");

  res.status(StatusCodes.OK).json({ marks });
};
const viewMeetings = async (req, res) => {
  const studentId = mongoose.Types.ObjectId(req.user.userId);
  const meetings = await Meeting.find({ group: studentId });
  res.status(StatusCodes.OK).json({ meetings });
};
const viewSingleMeeting = async (req, res) => {
  const { id: meetingId } = req.params;
  const meeting = Meeting.findOne({ _id: meetingId });
  res.status(StatusCodes.OK).json({ meeting });
};

module.exports = {
  addProjectDetails,
  viewEvents,
  viewMeetings,
  viewMarks,
  viewSingleMeeting,
};
