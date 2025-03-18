const mongoose = require('mongoose');

const weeklyProgressSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  week_start: { type: Date, required: true },
  week_end: { type: Date, required: true },
  progress: { type: Number, required: true, min: 0, max: 100 },
}, { timestamps: true });

const WeeklyProgress = mongoose.model('WeeklyProgress', weeklyProgressSchema);
module.exports = WeeklyProgress;
