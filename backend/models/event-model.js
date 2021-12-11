const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: {
      values: ["Defense", "Mid Evaluation", "Final Evaluation"],
      default: "Defense",
    },
  },
  date: {
    type: Date,
    required: [true, "Please Provide Date"],
    default: Date.now(),
  },
  // Groups: {
  //   type: [mongoose.Types.ObjectId],
  //   minlength: [1, 'Event m']
  // },
});

module.exports = mongoose.model("Events", eventSchema);
