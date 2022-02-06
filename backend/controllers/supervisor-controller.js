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
  const projects = await Project.find({ supervisor: req.params.id }).sort(
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
  // req.body.supervisor = req.user.userId;
  const meeting = await Meeting.create({ ...req.body });
  res.status(StatusCodes.OK).json({ meeting, msg: "Meeting Created" });
};

const addmeetingnotes = async (req, res) => {
  console.log(req.body);
  const { meetingNotes, id } = req.body;

  if (!id) {
    throw new Error("No meetings with this id");
  }

  const updatemeeting = await Meeting.findByIdAndUpdate(
    { _id: id },
    { meetingNotes: meetingNotes },
    { new: true, upsert: true }
  );

  if (!updatemeeting) {
    throw new Error("could not update the meeting");
  }

  res.status(StatusCodes.OK).json({ mesage: "meeting has been updated" });
};
const getAllMeetings = async (req, res) => {
  const meetings = await Meeting.find({ supervisor: req.user.userId });
  if (!meetings) {
    throw new NotFoundError("No meetings to show");
  }
  console.log(meetings);
  res.status(StatusCodes.OK).json(meetings);
};

const viewMeetings = async (req, res) => {
  const meetings = await Meeting.find({ supervisor: req.params.id });
  if (!meetings) {
    res.status(200).json({ msg: "No meetings yet" });
  }
  res.status(StatusCodes.OK).json({ meetings });
};

// const addmeetingdocscomment = async (req,res) => {

//   try{
//     const meetings = await Meeting.findOneAndUpdate({ supervisor: req.params.id },{document:[{doctype: `http://localhost:8000/meetingdocs/${file.name}`,id:req.params.id}]});

//     if(!meetings){
//       throw new Error("there is an error")
//     }

//     res.status(StatusCodes.OK).json({message:'document has been uploaded'})
//   }catch(err){
//     res.status(500).json({message:err.message})
//   }

// }

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

  res.status(StatusCodes.OK).json({ updateStudent });
};

const updatemeeting = async (req, res) => {
  try {
    const { timeOfMeeting } = req.body;
    console.log(timeOfMeeting);

    const { id } = req.params;
    console.log(id);

    const updatemeeting = await Meeting.findByIdAndUpdate(
      { _id: id },
      { timeOfMeeting: timeOfMeeting },
      { new: true, upsert: true }
    );

    //   const meeting = Meeting.find({_id:id})
    //   meeting.timeOfMeeting = timeOfMeeting
    //  await meeting.save({runValidators:false})

    if (!id) {
      throw new Error("No id available");
    }
    if (!updatemeeting) {
      throw new Error("There is an problem in updating meeting");
    }

    res.status(StatusCodes.OK).json({
      message: "meeting has been postponed",
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getSingleProject,
  deleteProject,
  updateProject,
  viewEvents,
  createMeeting,
  getAllMeetings,
  viewMeetings,
  addMarks,
  updatemeeting,
  addmeetingnotes,
};
