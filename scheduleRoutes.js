const express = require("express");
const { setSchedule, getSchedule } = require("../controllers/scheduleController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/", protect, setSchedule);
router.get("/", protect, getSchedule);

module.exports = router;
