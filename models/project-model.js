const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    minlength: 30,
    required: [true, "Please Provide Title"],
  },
  description: {
    type: String,
    trim: true,
  },
  objectives: {
    type: String,
  },
  group: {
    type: [mongoose.Types.ObjectId],
    ref: "Students",
    required: [true, "Please Provide Group members"],
    maxlength: 3,
  },
  supervisor: {
    type: mongoose.Types.ObjectId,
    ref: "Supervisors",
    maxlength: 1,
  },
  meetings: {
    type: [mongoose.Types.ObjectId],
  },
  projectDoc: [
    {
      proposal: String,
      midevaluation: String,
      finaldocumentation: String,
    },
  ],

  status: {
    type: St,
  },
});
