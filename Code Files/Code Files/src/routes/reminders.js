const router = require("express").Router();

const { protect } = require("../middleware/auth");

const {
  createReminder,
  getReminders,
  deleteReminder,
} = require("../controllers/reminderController");

router.use(protect);

router.post("/", createReminder);

router.get("/", getReminders);

router.delete("/:id", deleteReminder);

module.exports = router;