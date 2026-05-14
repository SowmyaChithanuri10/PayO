const binanceService = require('../services/binanceService');
const coingeckoService = require('../services/coingeckoService');
const marketModel = require('../models/marketModel');
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

  // Get top cryptocurrencies
  async getTopCryptocurrencies(req, res) {
    try {
      const { limit = 20, page = 1 } = req.query;
      
      const coingeckoData = await coingeckoService.getMarketData('usd', limit, page);
      const livePrices = await binanceService.getSymbolsData(
        coingeckoData.slice(0, 20).map(c => `${c.symbol}USDT`)
      );
      
      // Merge live prices with market data
      const enhancedData = coingeckoData.map(coin => {
        const livePrice = livePrices.find(lp => lp.symbol === coin.symbol);
        return {
          ...coin,
          currentPrice: livePrice?.price || coin.currentPrice,
          livePrice: !!livePrice
        };
      });
      
      res.json({
        success: true,
        data: enhancedData,
        pagination: {
          limit: parseInt(limit),
          page: parseInt(page)
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch top cryptocurrencies',
        message: error.message
      });
    }
  }

  // Get specific coin data
  async getCoinData(req, res) {
    try {
      const { symbol } = req.params;
      
      const [binancePrice, coingeckoDetails] = await Promise.all([
        binanceService.getSymbolPrice(`${symbol}USDT`),
        coingeckoService.getCoinDetails(symbol.toLowerCase())
      ]);
      
      res.json({
        success: true,
        data: {
          symbol: symbol.toUpperCase(),
          price: binancePrice.price,
          details: coingeckoDetails
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch coin data',
        message: error.message
      });
    }
  }

  // Get top gainers and losers
  async getTopMovers(req, res) {
    try {
      const { limit = 10 } = req.query;
      const movers = await binanceService.getTopMovers(parseInt(limit));
      
      res.json({
        success: true,
        data: movers
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch top movers',
        message: error.message
      });
    }
  }

  // Get global market statistics
  async getGlobalStats(req, res) {
    try {
      const globalData = await coingeckoService.getGlobalData();
      const btcPrice = await binanceService.getSymbolPrice('BTCUSDT');
      
      res.json({
        success: true,
        data: {
          ...globalData,
          btcPrice: btcPrice.price,
          timestamp: new Date()
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch global stats',
        message: error.message
      });
    }
  }

  // Get trending coins
  async getTrending(req, res) {
    try {
      const trending = await coingeckoService.getTrending();
      
      // Add current prices from Binance
      const trendingWithPrices = await Promise.all(
        trending.map(async (coin) => {
          try {
            const price = await binanceService.getSymbolPrice(`${coin.symbol}USDT`);
            return { ...coin, currentPrice: price.price };
          } catch {
            return { ...coin, currentPrice: null };
          }
        })
      );
      
      res.json({
        success: true,
        data: trendingWithPrices
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch trending coins',
        message: error.message
      });
    }
  }

  // WebSocket endpoint for real-time updates
  async startRealtimeUpdates(req, res) {
    try {
      // Start interval to push updates to WebSocket clients
      const updateInterval = setInterval(async () => {
        try {
          const marketData = await marketModel.prepareMarketOverview(
            binanceService,
            coingeckoService
          );
          websocketManager.broadcastMarketData(marketData);
        } catch (error) {
          console.error('WebSocket update error:', error);
        }
      }, 5000); // Update every 5 seconds
      
      res.json({
        success: true,
        message: 'Real-time updates started',
        websocketPort: process.env.WEBSOCKET_PORT || 8080
      });
      
      // Store interval to clear on disconnect (you might want to manage this better)
      req.app.locals.updateInterval = updateInterval;
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to start real-time updates',
        message: error.message
      });
    }
  }

  // Stop real-time updates
  async stopRealtimeUpdates(req, res) {
    if (req.app.locals.updateInterval) {
      clearInterval(req.app.locals.updateInterval);
      req.app.locals.updateInterval = null;
    }
    
    res.json({
      success: true,
      message: 'Real-time updates stopped'
    });
  }
}

module.exports = new MarketController();