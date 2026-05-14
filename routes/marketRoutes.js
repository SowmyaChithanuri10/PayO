const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController');

// Market overview routes
router.get('/overview', marketController.getMarketOverview);
router.get('/top', marketController.getTopCryptocurrencies);
router.get('/global', marketController.getGlobalStats);
router.get('/trending', marketController.getTrending);
router.get('/movers', marketController.getTopMovers);

// Individual coin routes
router.get('/coin/:symbol', marketController.getCoinData);

// WebSocket management
router.post('/realtime/start', marketController.startRealtimeUpdates);
router.post('/realtime/stop', marketController.stopRealtimeUpdates);

module.exports = router;