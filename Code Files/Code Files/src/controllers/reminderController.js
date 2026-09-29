const Reminder = require("../models/Reminder");

// POST /api/reminders
const createReminder = async (req, res) => {
  const { title, date, time } = req.body;

  if (!title || !date || !time) {
    return res.status(400).json({
      message: "Title, date and time are required",
    });
  }

  const reminder = await Reminder.create({
    user: req.user.userId,
    title,
    date,
    time,
  });

  res.status(201).json({
    message: "Reminder created",
    reminder,
  });
};

// GET /api/reminders
const getReminders = async (req, res) => {
  const reminders = await Reminder.find({
    user: req.user.userId,
  }).sort({ date: 1, time: 1 });

  res.json(reminders);
};

// DELETE /api/reminders/:id
const deleteReminder = async (req, res) => {
  const reminder = await Reminder.findById(req.params.id);

  if (!reminder) {
    return res.status(404).json({
      message: "Reminder not found",
    });
  }

  if (reminder.user.toString() !== req.user.userId) {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  await reminder.deleteOne();

  res.json({
    message: "Reminder deleted",
  });
};

module.exports = {
  createReminder,
  getReminders,
  deleteReminder,
};