// controllers/statsController.js
// Controller logic for analytics endpoint
const Queue = require('../models/Queue');
const { inMemoryMode } = require('../config/db');
const queueController = require('./queueController');

exports.getStats = async (req, res) => {
  try {
    if (inMemoryMode()) {
   
      const queue = queueController.__getQueueMemory ? queueController.__getQueueMemory() : [];
      const stats = { served: 0, skipped: 0, waiting: 0 };
      queue.forEach(u => { if (stats[u.status] !== undefined) stats[u.status]++; });
      return res.json(stats);
    }
   
    const [served, skipped, waiting] = await Promise.all([
      Queue.countDocuments({ status: 'served' }),
      Queue.countDocuments({ status: 'skipped' }),
      Queue.countDocuments({ status: 'waiting' })
    ]);
    res.json({ served, skipped, waiting });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.__setQueueMemoryGetter = getter => { exports.__getQueueMemory = getter; }; 