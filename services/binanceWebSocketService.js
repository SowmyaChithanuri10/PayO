
const WebSocket = require('ws');
const EventEmitter = require('events');

class BinanceWebSocketService extends EventEmitter {
  constructor() {
    super();
    this.ws = null;
    this.subscriptions = new Map(); // symbol -> price data
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 10;
  }

  connect() {
    // Connect to Binance WebSocket for all USDT pairs
    // You can customize which streams to subscribe to
    const streamUrl = 'wss://stream.binance.com:9443/stream?streams=!ticker@arr';
    
    this.ws = new WebSocket(streamUrl);
    
    this.ws.on('open', () => {
      console.log('Connected to Binance WebSocket');
      this.isConnected = true;
      this.reconnectAttempts = 0;
      
      // Subscribe to 24hr ticker for all symbols
      const subscribeMsg = {
        method: 'SUBSCRIBE',
        params: ['!ticker@arr'],
        id: 1
      };
      this.ws.send(JSON.stringify(subscribeMsg));
    });

    this.ws.on('message', (data) => {
      try {
        const parsed = JSON.parse(data);
        
        if (parsed.stream === '!ticker@arr' && parsed.data) {
          // Process all tickers at once
          const tickers = parsed.data;
          const marketData = {};
          
          tickers.forEach(ticker => {
            if (ticker.s.endsWith('USDT')) {
              const symbol = ticker.s.replace('USDT', '');
              marketData[symbol] = {
                symbol: symbol,
                fullSymbol: ticker.s,
                price: parseFloat(ticker.c),
                priceChange: parseFloat(ticker.p),
                priceChangePercent: parseFloat(ticker.P),
                volume: parseFloat(ticker.v),
                quoteVolume: parseFloat(ticker.q),
                high: parseFloat(ticker.h),
                low: parseFloat(ticker.l),
                open: parseFloat(ticker.o),
                bidPrice: parseFloat(ticker.b),
                askPrice: parseFloat(ticker.a),
                weightedAvgPrice: parseFloat(ticker.w),
                count: ticker.n,
                lastUpdate: Date.now()
              };
              
              // Update subscription cache
              this.subscriptions.set(symbol, marketData[symbol]);
            }
          });
          
          // Emit full market update event
          this.emit('marketUpdate', marketData);
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    });

    this.ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      this.isConnected = false;
    });

    this.ws.on('close', () => {
      console.log('WebSocket connection closed');
      this.isConnected = false;
      this.reconnect();
    });
  }

  reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
      console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);
      setTimeout(() => this.connect(), delay);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  // Subscribe to individual symbol streams for more detailed updates
  subscribeToSymbol(symbol) {
    if (!this.ws || !this.isConnected) return;
    
    const subscribeMsg = {
      method: 'SUBSCRIBE',
      params: [`${symbol.toLowerCase()}usdt@ticker`],
      id: Date.now()
    };
    this.ws.send(JSON.stringify(subscribeMsg));
  }

  // Get current price for a symbol
  getPrice(symbol) {
    return this.subscriptions.get(symbol);
  }

  // Get all current prices
  getAllPrices() {
    return Array.from(this.subscriptions.values());
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

module.exports = new BinanceWebSocketService();