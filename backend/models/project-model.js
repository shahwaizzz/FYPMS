const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    minlength: 20,
    required: [true, "Please Provide Title"],
  },
  description: {
    type: String,
    trim: true,
  },
  objectives: {
    type: String,
  },
  group: [{
    type: String,
    ref: "students",
    required: [true, "Please Provide Group members"],
    // maxlength: 3,
  }],
  batch: [{
    type:Number,
    maxlength: 4,
    required: [true, "Please Provide Batch"],
 }],
  supervisor: {
    type: mongoose.Types.ObjectId,
    ref: "supervisors",
    maxlength: 1,
  },
  meetings: {
    // type: [mongoose.Types.ObjectId],
    type:String
  },
  projectDoc: {
      proposal: {type:String},
      midEvaluation: {type:String},
      finalDocumentation: {type:String},
    },
  status: {
    type: String,
    enum: {
      values: ['Pending','Rejected', 'Approved', 'Working', 'Completed' ],
      default: 'Pending'    
    }
  },
});
module.exports = mongoose.model("Project", ProjectSchema);