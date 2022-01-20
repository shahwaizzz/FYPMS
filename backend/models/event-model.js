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
  },
  // date: {
  //   day: {
  //     type: Number,
  //     min: 1,
  //     max: 31,
  //   },
  //   month: {
  //     type: String,
  //     enum: {
  //       values: [
  //         "January",
  //         "February",
  //         "March",
  //         "April",
  //         "May",
  //         "June",
  //         "July",
  //         "August",
  //         "September",
  //         "October",
  //         "November",
  //         "December",
  //       ],
  //     },
  //   },
  //   year: {
  //     type: Number,
  //     maxlength: 4,
  //     minlength: 4,
  //   },
  // },
  details: {
    type: String,
    required: [true, "Please Enter Event Details"],
    default: "sdfsdf",
  },
  year: {
    type: String,
    required: [true, "Please Choose Event Batch "],
  },
  semester: {
    type: String,
    enum: {
      values: ["Fall", "Spring"],
    },
    default: "Fall",
    required: [true, "Please Provide Semester"],
  },
});

module.exports = mongoose.model("Events", eventSchema);
