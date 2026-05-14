const NodeCache = require('node-cache');

class MarketModel {
  constructor() {
    this.cache = new NodeCache({ stdTTL: parseInt(process.env.CACHE_TTL) || 60 });
  }

  // Format market data for API response
  formatMarketData(binanceData, coingeckoData) {
    const combinedMap = new Map();
    
    // Process Binance data (real-time prices)
    binanceData.forEach(bItem => {
      const coingeckoItem = coingeckoData.find(c => 
        c.symbol === bItem.symbol || 
        c.symbol === bItem.symbol + 'USDT'
      );
      
      combinedMap.set(bItem.symbol, {
        symbol: bItem.symbol,
        name: coingeckoItem?.name || bItem.symbol,
        price: bItem.price,
        priceChange24h: bItem.priceChange,
        priceChangePercentage24h: bItem.priceChangePercent,
        volume24h: bItem.volume,
        marketCap: coingeckoItem?.marketCap || null,
        high24h: bItem.high,
        low24h: bItem.low,
        image: coingeckoItem?.image || null,
        rank: coingeckoItem?.marketCapRank || null
      });
    });
    
    return Array.from(combinedMap.values());
  }

  // Get cached or fetch new data
  getCachedData(key) {
    return this.cache.get(key);
  }

  setCachedData(key, data, ttl =60) {
    this.cache.set(key, data, ttl);
  }

  // Prepare enhanced market overview
  async prepareMarketOverview(binanceService, coingeckoService) {
    try {
      const [binanceData, coingeckoData, trending, globalData, topMovers] = await Promise.all([
        binanceService.getSymbolsData(),
        coingeckoService.getMarketData('usd', 50),
        coingeckoService.getTrending(),
        coingeckoService.getGlobalData(),
        binanceService.getTopMovers(5)
      ]);
      
      const formattedData = this.formatMarketData(binanceData, coingeckoData);
      
      return {
        timestamp: new Date(),
        marketOverview: {
          totalMarketCap: globalData.totalMarketCap,
          totalVolume24h: globalData.totalVolume,
          btcDominance: globalData.marketCapPercentage?.btc || 0,
          ethDominance: globalData.marketCapPercentage?.eth || 0,
          activeCurrencies: globalData.activeCryptocurrencies,
          markets: globalData.markets
        },
        topGainers: topMovers.gainers,
        topLosers: topMovers.losers,
        trendingCoins: trending,
        marketData: formattedData,
        lastUpdate: new Date()
      };
    } catch (error) {
      console.error('Error preparing market overview:', error);
      throw error;
    }
  }
}

module.exports = new MarketModel();