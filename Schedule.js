const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  start: String,
  end: String
});

module.exports = mongoose.model("Schedule", scheduleSchema);
