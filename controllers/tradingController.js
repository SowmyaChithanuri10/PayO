const binanceService = require('../services/binanceService');

class TradingController {
  
  async getCandlestickData(req, res) {
    try {
      const { symbol, timeframe = '1h', limit = 100 } = req.params;
      const symbolUpper = symbol.toUpperCase();
      
      const klines = await binanceService.getKlines(`${symbolUpper}USDT`, timeframe, parseInt(limit));
      
      const candles = klines.map(kline => ({
        time: kline[0],
        open: parseFloat(kline[1]),
        high: parseFloat(kline[2]),
        low: parseFloat(kline[3]),
        close: parseFloat(kline[4]),
        volume: parseFloat(kline[5])
      }));
      
      res.json({
        success: true,
        data: {
          symbol: symbolUpper,
          timeframe,
          candles,
          currentPrice: candles[candles.length - 1]?.close
        }
      });
    } catch (error) {
      console.error('Candlestick error:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch candlestick data' });
    }
  }

  async getOrderBook(req, res) {
    try {
      const { symbol, limit = 20 } = req.params;
      const orderBook = await binanceService.getOrderBook(`${symbol.toUpperCase()}USDT`, parseInt(limit));
      
      const bids = orderBook.bids.slice(0, limit).map(bid => ({
        price: parseFloat(bid[0]),
        quantity: parseFloat(bid[1]),
        total: parseFloat(bid[0]) * parseFloat(bid[1])
      }));
      
      const asks = orderBook.asks.slice(0, limit).map(ask => ({
        price: parseFloat(ask[0]),
        quantity: parseFloat(ask[1]),
        total: parseFloat(ask[0]) * parseFloat(ask[1])
      }));
      
      let cumulativeBid = 0;
      const bidsWithCumulative = bids.map(bid => {
        cumulativeBid += bid.quantity;
        return { ...bid, cumulative: cumulativeBid };
      });
      
      let cumulativeAsk = 0;
      const asksWithCumulative = asks.map(ask => {
        cumulativeAsk += ask.quantity;
        return { ...ask, cumulative: cumulativeAsk };
      });
      
      res.json({
        success: true,
        data: {
          symbol: symbol.toUpperCase(),
          bids: bidsWithCumulative,
          asks: asksWithCumulative,
          spread: asks[0]?.price - bids[0]?.price,
          midPrice: (asks[0]?.price + bids[0]?.price) / 2,
          lastUpdate: Date.now()
        }
      });
    } catch (error) {
      console.error('Order book error:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch order book' });
    }
  }
}

module.exports = new TradingController();