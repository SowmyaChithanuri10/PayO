const express = require('express');
const router = express.Router();
const tradingController = require('../controllers/tradingController');

// Candlestick data endpoints
router.get('/candles/:symbol', tradingController.getCandlestickData);
router.get('/candles/:symbol/:timeframe', tradingController.getCandlestickData);
router.get('/candles/:symbol/:timeframe/:limit', tradingController.getCandlestickData);

// Order book endpoints
router.get('/orderbook/:symbol', tradingController.getOrderBook);
router.get('/orderbook/:symbol/:limit', tradingController.getOrderBook);

module.exports = router;