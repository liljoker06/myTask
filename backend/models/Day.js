const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  progress: { type: Number, required: true, min: 0, max: 100 },
}, { timestamps: true });

const Day = mongoose.model('Day', daySchema);
module.exports = Day;
