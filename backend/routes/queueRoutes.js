
const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queueController');

router.post('/', queueController.addToQueue);
router.get('/', queueController.getQueue);
router.patch('/:id', queueController.updateStatus);
router.delete('/:id', queueController.deleteFromQueue);

module.exports = router; 