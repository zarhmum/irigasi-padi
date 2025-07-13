const mongoose = require("mongoose");

const sensorDataSchema = new mongoose.Schema({
  tinggi_air: Number,
  status_pompa: String,
  metode: String,
  waktu: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model("SensorData", sensorDataSchema);
