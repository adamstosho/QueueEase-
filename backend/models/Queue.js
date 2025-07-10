// models/Queue.js
// Mongoose schema for queue entries
const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  remarks: { type: String },
  status: { type: String, enum: ['waiting', 'served', 'skipped'], default: 'waiting' },
  joinTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Queue', queueSchema); 