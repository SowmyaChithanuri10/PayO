const WebSocket = require("ws");

let latestPrices = {};

function connectBinance() {

  console.log("connectBinance STARTED");

  const ws = new WebSocket(
    "wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker/solusdt@ticker"
  );

  ws.on("open", () => {
    console.log("Binance WebSocket Connected");
  });

  ws.on("message", (data) => {

    console.log("MESSAGE RECEIVED");

    const parsed = JSON.parse(data);

    const coin = parsed.data;

    latestPrices[coin.s] = {
      symbol: coin.s,
      price: parseFloat(coin.c),
      changePercent: parseFloat(coin.P),
      high: parseFloat(coin.h),
      low: parseFloat(coin.l),
      volume: parseFloat(coin.v),
      time: Date.now()
    };

  });

  ws.on("error", (err) => {
    console.log("WS ERROR", err.message);
  });

  ws.on("close", () => {
    console.log("WS CLOSED");
  });

}

function getLatestPrices() {
  return Object.values(latestPrices);
}

module.exports = {
  connectBinance,
  getLatestPrices
};