const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: {
      values: ["Defense", "Mid Evaluation", "Final Evaluation"],
      default: "Defense",
    },
  },
  venue: {
    type: String,
    required: [true, "Please Provide Venue Location"],
    default: "GIMS",
  },
  date: {
    type: Date,
    required: [true, "Please Provide Date"],
    default: Date.now(),
  },
  details: {
    type: String,
    required: [true, "Please Enter Event Details"],
    default: "sdfsdf",
  },
  year: {
    type: Date,
    required: [true, "Please Choose Event Batch "],
  },
  semester: {
    type: String,
    enum: {
      values: ["Fall", "Spring"],
    },
    required: [true, "Please Provide Semester"],
  },
});

module.exports = mongoose.model("Events", eventSchema);
