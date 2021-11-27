const mongoose = require("mongoose");

const EventModel = new mongoose.Schema({
  date: {
    type: Date,
    requried: [true, "Please Provide Date"],
  },
  Groups: {
    type: mongoose.Types.ObjectId,
  },
});
