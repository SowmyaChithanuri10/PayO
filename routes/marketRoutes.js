const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController');

// Main dashboard endpoint - returns ALL data shown in your images
router.get('/dashboard', controllerFunction);

router.get('/dashboard/:symbol', controllerFunction);

// Get all coins with descriptions (for market list)
router.get('/all-coins', marketController.getAllCoinsWithDescriptions);

// Get single coin with full details
router.get('/coin/:symbol', marketController.getCoinWithFullDetails);

// Get chart data for specific timeframe
router.get('/chart/:symbol/:timeframe/:limit?', marketController.getChartData);

module.exports = router;