const PMO = require("../models/pmo-model");
const Supervisor = require("../models/supervisor-model");
const pdf = require("html-pdf");
const preliminaryTemplate = require("../perfomas/preliminary");
const multer = require("multer");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
const folder = "../controllers";
const fs = require("fs");
const download = require("download");
const Template = require("../models/template-model");

const Student = require("../models/student-model");

// Create And Manage Students
const createStudent = async (req, res) => {
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
  res
    .status(StatusCodes.OK)
    .json({ event, err: { code: 0, message: "No error found" } });
};
const editEvent = async (req, res) => {
  const { id: eventId } = req.params;
  const { name, venue, date, details, year, semester } = req.body;
  if (
    name === "" ||
    venue === "" ||
    date === "" ||
    details === "" ||
    year === "" ||
    semester === ""
  ) {
    throw new BadRequestError("Values cannot be empty");
  }
  const event = await Event.findByIdAndUpdate({ _id: eventId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!event) {
    throw new NotFoundError("Student does not exist");
  }
  res
    .status(StatusCodes.OK)
    .json({ event, err: { code: 0, message: "No error found" } });
};
const viewEvents = async (req, res) => {
  console.log(req.headers.authorization);
  const events = await Event.find({});
  res
    .status(StatusCodes.OK)
    .json({ events, err: { code: 0, message: "No error found" } });
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
  file.mv(`public/uploads/${file.name}`, (err) => {
    console.error(err);
  });
  try {
    const template = await Template.create({
      templateurl: `http://localhost:8000/uploads/${file.name}`,
    });
    if (!template) {
      throw new Error("ERRROR");
    } else {
      res.status(StatusCodes.OK).json({ msg: "File Uploaded Successfully" });
    }
  } catch (err) {
    console.log(err);
  }

  // res
  //   .status(StatusCodes.OK)
  //   .json({ fileName: file.name, filePath: `/uploads/${file.name}` });
};

// const readfiles = (req,res) => {

//   let arr = []

//   fs.readdir(folder, (err, files) => {
//     console.log(files);
//     console.log(err)
//     files?.forEach(file => {
//       arr.push(file)
//     });
//   });

//   res.status(200).json({
//     data:arr
//   })

// }

const changePassword = async (req, res) => {
  const pmoId = req.user.userId;
  const { currentPassword, newPassword, confirmPassword } = req.body;
  if ((!currentPassword, !newPassword, !confirmPassword)) {
    throw new BadRequestError("Values cannot be empty");
  }
  if (newPassword !== confirmPassword) {
    throw new BadRequestError("New Password and Confirm Password are not same");
  }
  const pmo = await PMO.find({ _id: pmoId });
  if (!pmo) {
    throw new UnauthenticatedError("Invalid User");
  }
  const isPasswordCorrect = await pmo.comparePassword(currentPassword);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Current Password is not correct");
  }
  const updatedPMO = await PMO.findByIdAndUpdate(
    { _id: pmoId },
    { password: newPassword },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ msg: "Password Updated" });
};

const Findtemplates = async (req, res) => {
  try {
    const templates = await Template.find({});
    if (!templates) {
      throw new Error("there is an error");
    }
    res.status(StatusCodes.OK).json({
      data: templates,
    });
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};
const createPreliminary = async (req, res) => {
  const { id: projectId } = req.params;
  const project = await Project.findOne({ _id: projectId });
  if (!project) {
    throw new NotFoundError("Project does not exist");
  }
  const supervisor = await Project.findOne({ _id: project.supervisor });
  const student1 = await Student.findOne({ rollNumber: project.group[0] });
  const student2 = await Student.findOne({ rollNumber: project.group[1] });
  const student3 = await Student.findOne({ rollNumber: project.group[2] });

  const projectIdea = project.title;
  const noOfMember = project.group.length;
  const supervisorName = supervisor;
  const date = new Date();
  const { electiveCourses, tools, language } = req.body;

  const data = {
    student1,
    student2,
    student3,
    projectIdea,
    noOfMember,
    supervisorName,
    date,
    electiveCourses,
    tools,
    language,
  };
  console.log(data);
  pdf
    .create(preliminaryTemplate({ ...data, ...req.body }), {})
    .toFile("preliminary.pdf", (err) => {
      if (err) {
        res.send(Promise.reject());
      }

      res.send(Promise.resolve());
    });
  // res.sendFile(`../preliminary.pdf`);
};
const getPreliminary = async (req, res) => {
  res.sendFile(`../preliminary.pdf`);
};

// let multerstorage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     console.log(req)
//     console.log(file)
//      cb(null, '/public/uploads/');
//     //  require('')
//   },
//   filename: function (req, file, cb) {
//      cb(null , file.originalname);
//   }
// });

// function multerFilter (req, file, cb) {

//   // console.log(file)

//   // Allowed ext
//    const filetypes = /docx|pdf|zip|doc|excel/;

//  // Check ext
//   const extname =  filetypes.test(path.extname(file.originalname).toLowerCase());
//  // Check mime
//  const mimetype = filetypes.test(file.mimetype);

//  if(mimetype && extname){
//      return cb(null,true);
//  } else {
//      cb('You can only provides thes files only .docx,.pdf,.zip,.doc,.excel');
//  }
// }

// const upload = multer({storage:multerstorage})
// ,fileFilter:multerFilter,limits : {fileSize : 4000000}

// const uploadtemplatefiles = async (req,res) => {

//   // console.log(req.files.file)

//   if(!req.files.file){
//     throw new Error("please provide the file")
//   }

//   upload(req, res, function (err) {
//     if (err) {
//       console.log("There was an error uploading the image.");
//     }
//     res.send(req.files.file)
//     })

//     // upload(req.files.file)

// }

// const downloading = async (req, res, next) => {
//   console.log('fileController.download: started')
//   const path = `http://localhost:8000/public/uploads/${req.params.path}`

//   await download('https://images.unsplash.com/photo-1643644069843-b71b3b28227b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',"public")
//   // const file = fs.createReadStream(path)
//   // const filename = (new Date()).toISOString()
//   // res.setHeader('Content-Disposition', 'attachment: filename="' + filename + '"')
//   // file.pipe(res)
// }

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
  editEvent,
  deleteEvent,
  viewEvents,
  addMarks,
  getAllProjects,
  getSingleProject,
  deleteProject,
  updateProject,
  createProject,
  uploadTemplateDocuments,
  changePassword,
  Findtemplates,
  createPreliminary,
};
