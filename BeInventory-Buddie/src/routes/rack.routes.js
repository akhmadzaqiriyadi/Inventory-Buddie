const express = require('express');
const {
  getAllRacks,
  createRack,
  updateRack,
  deleteRack,
} = require('../controllers/rack.controller');

const router = express.Router();

// Routes untuk rack
router.get('/', getAllRacks);             // Get all racks
router.post('/', createRack);             // Create new rack
router.put('/:id', updateRack);           // Update rack
router.delete('/:id', deleteRack);        // Delete rack

module.exports = router;
