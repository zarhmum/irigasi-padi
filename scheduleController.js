const Schedule = require("../models/Schedule");

exports.setSchedule = async (req, res) => {
  const { start, end } = req.body;
  const schedule = await Schedule.findOne();
  if (schedule) {
    schedule.start = start;
    schedule.end = end;
    await schedule.save();
  } else {
    await Schedule.create({ start, end });
  }
  res.json({ message: "Jadwal disimpan" });
};

exports.getSchedule = async (req, res) => {
  const schedule = await Schedule.findOne();
  res.json(schedule);
};
