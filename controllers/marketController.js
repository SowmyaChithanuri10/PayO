const binanceService = require("../services/binanceService");
const coingeckoService = require("../services/coingeckoService");
const realtimePriceCache = require("../cache/realtimePriceCache");

class MarketController {
  
  // Main dashboard endpoint - returns ALL data needed for the page shown in images
  async getDashboardData(req, res) {
    try {
      const { symbol = 'BTC' } = req.params;
      const symbolUpper = symbol.toUpperCase();
      
      // Get real-time price from WebSocket cache
      let priceData = realtimePriceCache.getPrice(symbolUpper);
      if (!priceData) {
        const allPrices = realtimePriceCache.getAllPrices();
        priceData = allPrices.find(p => p.symbol === symbolUpper);
      }
      
      // If still no data, fallback to REST API
      if (!priceData) {
        const ticker = await binanceService.get24hrTickerForSymbol(`${symbolUpper}USDT`);
        priceData = {
          symbol: symbolUpper,
          price: parseFloat(ticker.lastPrice),
          priceChange: parseFloat(ticker.priceChange),
          priceChangePercent: parseFloat(ticker.priceChangePercent),
          volume: parseFloat(ticker.volume),
          quoteVolume: parseFloat(ticker.quoteVolume),
          high: parseFloat(ticker.highPrice),
          low: parseFloat(ticker.lowPrice)
        };
      }
      
      // Get global market data from CoinGecko
      const globalData = await coingeckoService.getGlobalData();
      
      // Get coin description from CoinGecko
      const coinId = await coingeckoService.findCoinIdBySymbol(symbolLower);
      let description = null;
      let coinDetails = null;
      if (coinId) {
        coinDetails = await coingeckoService.getCoinDetails(coinId);
        description = coinDetails?.description?.en || null;
      }
      
      // Calculate buy/sell ratio from recent trades
      const trades = await binanceService.getRecentTrades(`${symbolUpper}USDT`, 500);
      let buyVolume = 0;
      let sellVolume = 0;
      trades.forEach(trade => {
        if (!trade.isBuyerMaker) {
          buyVolume += parseFloat(trade.qty);
        } else {
          sellVolume += parseFloat(trade.qty);
        }
      });
      const totalVolume = buyVolume + sellVolume;
      const buyPercentage = totalVolume > 0 ? (buyVolume / totalVolume) * 100 : 50;
      const sellPercentage = totalVolume > 0 ? (sellVolume / totalVolume) * 100 : 50;
      
      // Get candlestick data for chart
      const klineData = await binanceService.getKlines(`${symbolUpper}USDT`, '1h', 100);
      const candles = klineData.map(k => ({
        time: k[0],
        open: parseFloat(k[1]),
        high: parseFloat(k[2]),
        low: parseFloat(k[3]),
        close: parseFloat(k[4]),
        volume: parseFloat(k[5])
      }));
      
      // Calculate technical indicators
      const closes = candles.map(c => c.close);
      const ma7 = this.calculateMA(closes, 7);
      const ma25 = this.calculateMA(closes, 25);
      const ma99 = this.calculateMA(closes, 99);
      const rsi = this.calculateRSI(closes, 14);
      
      // Generate mock holder count (Binance doesn't provide this)
      const holders = this.generateHolderCount(symbolUpper);
      
      res.json({
        success: true,
        data: {
          // Live Market Data section
          liveMarketData: {
            marketCap: globalData?.totalMarketCap?.usd || 1520000000000,
            volume24h: priceData?.quoteVolume || priceData?.volume * priceData?.price || 48600000000,
            buyOrders: buyPercentage.toFixed(1),
            sellOrders: sellPercentage.toFixed(1),
            holders: holders
          },
          
          // Current Price section
          currentPrice: {
            symbol: `${symbolUpper}/USDT`,
            price: priceData?.price || 0,
            change: priceData?.priceChange || 0,
            changePercent: priceData?.priceChangePercent || 0,
            high24h: priceData?.high || 0,
            low24h: priceData?.low || 0,
            volume24h: priceData?.volume || 0
          },
          
          // Chart Data
          chart: {
            candles: candles,
            timeframes: ['1H', '6H', '1D', '1W', '1M'],
            currentTimeframe: '1H'
          },
          
          // Technical Indicators
          technicals: {
            ma7: ma7,
            ma25: ma25,
            ma99: ma99,
            rsi: rsi,
            support: this.findSupportLevel(closes),
            resistance: this.findResistanceLevel(closes)
          },
          
          // Coin Description
          about: {
            name: coinDetails?.name || symbolUpper,
            description: description || this.generateDescription(symbolUpper, priceData),
            website: coinDetails?.links?.homepage?.[0] || null,
            twitter: coinDetails?.links?.twitter_screen_name || null
          },
          
          lastUpdate: Date.now(),
          isRealtime: true
        }
      });
    } catch (error) {
      console.error("Dashboard Error:", error.message);
      res.status(500).json({
        success: false,
        message: "Failed to fetch dashboard data"
      });
    }
  }
  
  // Get all coins with their descriptions (for the full market list)
  async getAllCoinsWithDescriptions(req, res) {
    try {
      const { page = 1, limit = 50, search = '' } = req.query;
      
      // Get real-time prices
      let marketData = realtimePriceCache.getAllPrices();
      if (marketData.length === 0) {
        marketData = await binanceService.getSymbolsData();
      }
      
      // Filter by search
      let filteredData = marketData;
      if (search) {
        filteredData = marketData.filter(item => 
          item.symbol.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      // Sort by market cap (using quoteVolume as proxy)
      filteredData.sort((a, b) => (b.quoteVolume || 0) - (a.quoteVolume || 0));
      
      // Paginate
      const startIndex = (page - 1) * limit;
      const paginatedData = filteredData.slice(startIndex, startIndex + parseInt(limit));
      
      // Fetch descriptions for these coins (with caching)
      const coinsWithDescriptions = await this.addDescriptionsToCoins(paginatedData);
      
      res.json({
        success: true,
        data: {
          total: filteredData.length,
          page: parseInt(page),
          limit: parseInt(limit),
          coins: coinsWithDescriptions
        }
      });
    } catch (error) {
      console.error("Error fetching all coins:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
  
  // Get single coin with FULL details including description
  async getCoinWithFullDetails(req, res) {
    try {
      const { symbol } = req.params;
      const symbolUpper = symbol.toUpperCase();
      const symbolLower = symbol.toLowerCase();
      
      // Get real-time price
      let priceData = realtimePriceCache.getPrice(symbolUpper);
      if (!priceData) {
        const allPrices = realtimePriceCache.getAllPrices();
        priceData = allPrices.find(p => p.symbol === symbolUpper);
      }
      
      if (!priceData) {
        const ticker = await binanceService.get24hrTickerForSymbol(`${symbolUpper}USDT`);
        priceData = {
          symbol: symbolUpper,
          price: parseFloat(ticker.lastPrice),
          priceChangePercent: parseFloat(ticker.priceChangePercent),
          volume: parseFloat(ticker.volume),
          quoteVolume: parseFloat(ticker.quoteVolume),
          high: parseFloat(ticker.highPrice),
          low: parseFloat(ticker.lowPrice)
        };
      }
      
      // Get description from CoinGecko
      const coinId = await coingeckoService.findCoinIdBySymbol(symbolLower);
      let description = null;
      let coinDetails = null;
      let links = {};
      
      if (coinId) {
        coinDetails = await coingeckoService.getCoinDetails(coinId);
        description = coinDetails?.description;
        links = coinDetails?.links || {};
      }
      
      // Get buy/sell ratio
      const trades = await binanceService.getRecentTrades(`${symbolUpper}USDT`, 500);
      let buyVolume = 0, sellVolume = 0;
      trades.forEach(trade => {
        if (!trade.isBuyerMaker) buyVolume += parseFloat(trade.qty);
        else sellVolume += parseFloat(trade.qty);
      });
      const total = buyVolume + sellVolume;
      const buyRatio = total > 0 ? (buyVolume / total) * 100 : 50;
      
      // Get candlestick data
      const klineData = await binanceService.getKlines(`${symbolUpper}USDT`, '1h', 100);
      const closes = klineData.map(k => parseFloat(k[4]));
      
      res.json({
        success: true,
        data: {
          symbol: symbolUpper,
          name: coinDetails?.name || symbolUpper,
          price: priceData.price,
          priceChange24h: priceData.priceChangePercent,
          volume24h: priceData.volume,
          marketCap: priceData.quoteVolume,
          high24h: priceData.high,
          low24h: priceData.low,
          buyOrders: buyRatio.toFixed(1),
          sellOrders: (100 - buyRatio).toFixed(1),
          holders: this.generateHolderCount(symbolUpper),
          description: {
            full: description?.en || this.generateDescription(symbolUpper, priceData),
            short: description?.en ? this.truncateText(description.en, 300) : null
          },
          links: links,
          technicals: {
            ma7: this.calculateMA(closes, 7),
            ma25: this.calculateMA(closes, 25),
            ma99: this.calculateMA(closes, 99),
            rsi: this.calculateRSI(closes, 14)
          },
          lastUpdate: Date.now()
        }
      });
    } catch (error) {
      console.error("Coin details error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
  
  // Get chart data for different timeframes
  async getChartData(req, res) {
    try {
      const { symbol, timeframe = '1h', limit = 100 } = req.params;
      const symbolUpper = symbol.toUpperCase();
      
      // Map timeframe to Binance interval
      const intervalMap = {
        '1H': '1h',
        '6H': '6h',
        '1D': '1d',
        '1W': '1w',
        '1M': '1M'
      };
      const interval = intervalMap[timeframe] || timeframe;
      
      const klineData = await binanceService.getKlines(`${symbolUpper}USDT`, interval, parseInt(limit));
      
      const candles = klineData.map(k => ({
        time: k[0],
        open: parseFloat(k[1]),
        high: parseFloat(k[2]),
        low: parseFloat(k[3]),
        close: parseFloat(k[4]),
        volume: parseFloat(k[5])
      }));
      
      res.json({
        success: true,
        data: {
          symbol: symbolUpper,
          timeframe: timeframe,
          candles: candles,
          currentPrice: candles[candles.length - 1]?.close
        }
      });
    } catch (error) {
      console.error("Chart data error:", error);
      res.status(500).json({ success: false, message: "Failed to fetch chart data" });
    }
  }
  
  // Helper: Calculate Moving Average
  calculateMA(prices, period) {
    if (prices.length < period) return null;
    const recentPrices = prices.slice(-period);
    const sum = recentPrices.reduce((a, b) => a + b, 0);
    return parseFloat((sum / period).toFixed(2));
  }
  
  // Helper: Calculate RSI
  calculateRSI(prices, period = 14) {
    if (prices.length < period + 1) return null;
    
    let gains = 0, losses = 0;
    for (let i = prices.length - period; i < prices.length; i++) {
      const diff = prices[i] - prices[i - 1];
      if (diff >= 0) gains += diff;
      else losses -= diff;
    }
    
    const avgGain = gains / period;
    const avgLoss = losses / period;
    if (avgLoss === 0) return 100;
    
    const rs = avgGain / avgLoss;
    return parseFloat((100 - (100 / (1 + rs))).toFixed(2));
  }
  
  // Helper: Find support level
  findSupportLevel(prices) {
    const recentPrices = prices.slice(-50);
    return parseFloat(Math.min(...recentPrices).toFixed(2));
  }
  
  // Helper: Find resistance level
  findResistanceLevel(prices) {
    const recentPrices = prices.slice(-50);
    return parseFloat(Math.max(...recentPrices).toFixed(2));
  }
  
  // Helper: Generate holder count (Binance doesn't provide this)
  generateHolderCount(symbol) {
    const mockHolders = {
      'BTC': '54 Million+',
      'ETH': '28 Million+',
      'BNB': '12 Million+',
      'SOL': '8 Million+',
      'XRP': '15 Million+'
    };
    return mockHolders[symbol] || '1 Million+';
  }
  
  // Helper: Generate fallback description
  generateDescription(symbol, priceData) {
    return `${symbol} is a digital cryptocurrency traded on major exchanges including Binance. Current price: $${priceData?.price?.toFixed(2) || 'N/A'}. 24h volume: $${(priceData?.volume / 1e6)?.toFixed(0) || 'N/A'}M.`;
  }
  
  // Helper: Truncate text
  truncateText(text, maxLength) {
    if (!text) return null;
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
  
  // Helper: Add descriptions to multiple coins
  async addDescriptionsToCoins(coins) {
    const descriptionCache = new Map();
    const results = [];
    
    for (const coin of coins) {
      let description = descriptionCache.get(coin.symbol);
      if (!description) {
        const coinId = await coingeckoService.findCoinIdBySymbol(coin.symbol.toLowerCase());
        if (coinId) {
          const details = await coingeckoService.getCoinDetails(coinId);
          description = details?.description?.en ? this.truncateText(details.description.en, 200) : this.generateDescription(coin.symbol, coin);
          descriptionCache.set(coin.symbol, description);
        } else {
          description = this.generateDescription(coin.symbol, coin);
        }
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      results.push({ ...coin, description });
    }
    return results;
  }
}

module.exports = new MarketController();