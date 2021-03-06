const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: [true, "Please Provide Meeting Title/Topic"],
    trim: true,
  },
  timeOfMeeting: {
    type: Date,
    required: [true, "Please Proivde Time And Date for the Meeting"],
  },
  meetingNotes: {
    type: [String],
  },
  supervisor: {
    type: mongoose.Types.ObjectId,
  },
  project: {
    type: String,
    required: [true, "Please Provide Project"],
  },
  document:[{
    doctype:String,
    rollno:String,
    comment:String,
  }]
});

module.exports = mongoose.model("Meetings", meetingSchema);
