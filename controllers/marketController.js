const binanceService = require('../services/binanceService');
const coingeckoService = require('../services/coingeckoService');
const marketModel = require('../models/marketModels');
const websocketManager = require('../utils/websocketManager');

class MarketController {
  // Get complete market overview
  async getMarketOverview(req, res) {
    try {
      const cacheKey = 'market_overview';
      let marketData = marketModel.getCachedData(cacheKey);
      
      if (!marketData) {
        marketData = await marketModel.prepareMarketOverview(
          binanceService,
          coingeckoService
        );
        marketModel.setCachedData(cacheKey, marketData, 10); // Cache for 30 seconds
      }
      
      res.json({
        success: true,
        data: marketData.marketData
      });
    } catch (error) {
      console.error('Market Overview Error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch market data',
        message: error.message
      });
    }
  }

}

module.exports = new MarketController();