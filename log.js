const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  waterLevel: {
    type: Number,
    required: true,
  },
  pumpStatus: {
    type: Boolean,
    required: true,
  },
  method: {
    type: String,
    enum: ["SRI", "PBK"],
    required: true,
  },
  phase: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Log", logSchema);
