const WebSocket = require("ws");
 
let latestPrices = {};
 
function connectBinance() {
  const ws = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");
 
  ws.on("open", () => {
    console.log("Binance WebSocket Connected");
  });
 
  ws.on("message", (data) => {
    const parsed = JSON.parse(data);
 
    parsed.forEach((coin) => {
      if (coin.s.endsWith("USDT")) {
        latestPrices[coin.s] = {
          symbol: coin.s,
          price: parseFloat(coin.c),
          changePercent: parseFloat(coin.P),
          high: parseFloat(coin.h),
          low: parseFloat(coin.l),
          volume: parseFloat(coin.v),
          time: Date.now()
        };
      }
    });
  });
 
  ws.on("close", () => {
    console.log("Binance WebSocket closed, reconnecting...");
    setTimeout(connectBinance, 3000); // auto-reconnect
  });
 
  ws.on("error", (err) => {
    console.log(" Binance error:", err.message);
  });
}
 
// getter (important)
function getLatestPrices() {
  return Object.values(latestPrices);
}
 
function getPrice(symbol) {
  return latestPrices[symbol.toUpperCase()];
}
 
module.exports = {
  connectBinance,
  getLatestPrices,
  getPrice
};