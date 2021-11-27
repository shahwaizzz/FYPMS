const mongoose = require("mongoose");
const gDate = new Date();

const EventModel = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
});
