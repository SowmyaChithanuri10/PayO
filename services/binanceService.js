const WebSocket = require("ws");

let latestPrices = {};

function connectBinance() {

  console.log("connectBinance STARTED");

  const ws = new WebSocket(
    "wss://stream.binance.com:9443/ws/!ticker@arr"
  );

  ws.on("open", () => {
    console.log(" Binance WebSocket Connected");
  });

  ws.on("message", (data) => {

    console.log(" Receiving Binance data");

    const parsed = JSON.parse(data);

    parsed.forEach((coin) => {

      if (coin.s.endsWith("USDT")) {

        latestPrices[coin.s] = {
          symbol: coin.s,
          price: parseFloat(coin.c),
          changePercent: parseFloat(coin.P),
        };

      }

    });

  });

  ws.on("close", () => {
    console.log(" WebSocket CLOSED");
  });

  ws.on("error", (err) => {
    console.log(" WebSocket ERROR");
    console.log(err);
  });

}

function getLatestPrices() {
  return Object.values(latestPrices);
}

module.exports = {
  connectBinance,
  getLatestPrices
};