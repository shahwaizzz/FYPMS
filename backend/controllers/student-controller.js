const Project = require("../models/project-model");
const Student = require("../models/student-model");
const Meeting = require("../models/meeting-model");
const Event = require("../models/event-model");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
var mongoose = require("mongoose");

const updatemeetingdocs = async (req, res) => {
  if (req.files === null) {
    throw new BadRequestError("No file was uploaded");
  }
  const file = req.files.file;
  file.mv(`public/meetingdocs/${file.name}`, (err) => {
    console.error(err);
  });

  try {
    const meetings = await Meeting.findByIdAndUpdate(
      { _id: req.params.id },
      {
        document: [
          {
            doctype: `http://localhost:8000/meetingdocs/${file.name}`,
            rollno: req.params.rollno,
          },
        ],
      }
    );

    if (!meetings) {
      throw new Error("there is an error");
    }

    res.status(StatusCodes.OK).json({ message: "document has been uploaded" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const viewprojects = async (req, res, next) => {
  const { rollno } = req.params;

  const projects = await Project.find({ group: { $in: [rollno] } });

  if (!projects) {
    res.status(StatusCodes.OK).json({ message: "Projects not found" });
    next();
  }

  res.status(StatusCodes.OK).json({ projects });
};

const updateProject = async (req, res) => {
  if (req.files === null) {
    throw new BadRequestError("No file was uploaded");
  }
  const file = req.files.file;
  file.mv(`public/projects/${file.name}`, (err) => {
    console.error(err);
  });

  const { flag, rollno } = req.params;

  try {
    if (flag === "proposal") {
      const findproject = await Project.findOneAndUpdate(
        { group: { $in: [rollno] } },
        { "projectDoc.proposal": `http://localhost:8000/projects/${file.name}` }
      );
      if (!findproject) {
        throw new Error("there is an error");
      }
      res.status(StatusCodes.OK).json({
        message: "docs has been uploaded",
      });
    }
    if (flag === "mid") {
      const findproject = await Project.findOneAndUpdate(
        { group: { $in: [rollno] } },
        {
          "projectDoc.midEvaluation": `http://localhost:8000/projects/${file.name}`,
        }
      );
      if (!findproject) {
        throw new Error("there is an error");
      }
      res.status(StatusCodes.OK).json({
        message: "docs has been uploaded",
      });
    }
    if (flag === "final") {
      const findproject = await Project.findOneAndUpdate(
        { group: { $in: [rollno] } },
        {
          "projectDoc.finalDocumentation": `http://localhost:8000/projects/${file.name}`,
        }
      );
      if (!findproject) {
        throw new Error("there is an error");
      }
      res.status(StatusCodes.OK).json({
        message: "docs has been uploaded",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const addProjectDetails = async (req, res) => {
  const { description, objectives } = req.body;
  if (!description || !objectives) {
    throw new BadRequestError("Please fil all the details");
  }
  //!authhentication middleware when added
  // const studentId = mongoose.Types.ObjectId(req.user.userId);

  const project = await Project.findOneAndUpdate(
    { group: { $in: [req.params.rollno] } },
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

//!authhentication middleware when connected
// const viewMarks = async (req, res) => {
//   const studentId = req.user.userId;
//   console.log(studentId);
//   const marks = await Student.find({ _id: studentId }).select("marks");

//   res.status(StatusCodes.OK).json({ marks });
// };

const viewMarks = async (req, res) => {
  const studentId = req.params.id;
  const marks = await Student.find({ _id: studentId }).select("marks");

  res.status(StatusCodes.OK).json({ marks });
};

const viewMeetings = async (req, res) => {
  // const studentId = mongoose.Types.ObjectId(req.user.userId);
  // group: studentId
  const meetings = await Meeting.find({});
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
  viewprojects,
  updateProject,
  updatemeetingdocs,
};
