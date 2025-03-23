const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  duration: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Not started', 'In progress', 'Completed'], 
    default: 'Not started' 
  },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
