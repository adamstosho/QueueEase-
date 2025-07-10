
const Queue = require('../models/Queue');
const { inMemoryMode } = require('../config/db');


let queueMemory = [];


exports.addToQueue = async (req, res) => {
  const { name, phone, remarks } = req.body;
  if (!name || !phone) return res.status(400).json({ error: 'Name and phone are required.' });
  try {
    if (inMemoryMode()) {
      const entry = { _id: Date.now().toString(), name, phone, remarks, status: 'waiting', joinTime: new Date() };
      queueMemory.push(entry);
      return res.status(201).json(entry);
    }
    const entry = await Queue.create({ name, phone, remarks });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getQueue = async (req, res) => {
  try {
    if (inMemoryMode()) {
      const sorted = queueMemory.sort((a, b) => new Date(a.joinTime) - new Date(b.joinTime));
      return res.json(sorted);
    }
    const queue = await Queue.find().sort({ joinTime: 1 });
    res.json(queue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['waiting', 'served', 'skipped'].includes(status)) return res.status(400).json({ error: 'Invalid status.' });
  try {
    if (inMemoryMode()) {
      const user = queueMemory.find(u => u._id === id);
      if (!user) return res.status(404).json({ error: 'User not found.' });
      user.status = status;
      return res.json(user);
    }
    const user = await Queue.findByIdAndUpdate(id, { status }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteFromQueue = async (req, res) => {
  const { id } = req.params;
  try {
    if (inMemoryMode()) {
      const idx = queueMemory.findIndex(u => u._id === id);
      if (idx === -1) return res.status(404).json({ error: 'User not found.' });
      const removed = queueMemory.splice(idx, 1)[0];
      return res.json(removed);
    }
    const user = await Queue.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.__getQueueMemory = () => queueMemory; 