// controllers/feedbackController.js
// Controller logic for feedback endpoints
const Feedback = require('../models/Feedback');
const { inMemoryMode } = require('../config/db');

// In-memory fallback storage
let feedbackMemory = [];


exports.submitFeedback = async (req, res) => {
  const { name, rating, comment } = req.body;
  if (!name || !rating) return res.status(400).json({ error: 'Name and rating are required.' });
  if (rating < 1 || rating > 5) return res.status(400).json({ error: 'Rating must be 1-5.' });
  try {
    if (inMemoryMode()) {
      const entry = { _id: Date.now().toString(), name, rating, comment, createdAt: new Date() };
      feedbackMemory.push(entry);
      return res.status(201).json(entry);
    }
    const entry = await Feedback.create({ name, rating, comment });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all feedback
exports.getFeedback = async (req, res) => {
  try {
    if (inMemoryMode()) {
      return res.json(feedbackMemory);
    }
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 