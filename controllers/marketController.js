const binanceService = require("../services/binanceService");
const coingeckoService = require("../services/coingeckoService");
const marketModel = require("../models/marketModels");

class MarketController {

  async getMarketOverview(req, res) {

    try {

      const cacheKey = "market_overview";

      let marketData = marketModel.getCachedData(cacheKey);

      if (!marketData) {

        marketData = await marketModel.prepareMarketOverview(
          binanceService,
          coingeckoService
        );

        // cache for 60 seconds
        marketModel.setCachedData(cacheKey, marketData, 60);
      }

      res.json({
        success: true,
        data: marketData
      });

    } catch (error) {

      console.error(
        "Market Overview Error:",
        error.message
      );

      res.status(500).json({
        success: false,
        message: "Failed to fetch market data"
      });
    }
  }
}

module.exports = new MarketController();