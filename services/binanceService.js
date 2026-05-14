let latestPrices = {};

function connectBinance() {
  console.log("connectBinance STARTED");

  const ws = new WebSocket(
    "wss://stream.binance.com:9443/ws/!ticker@arr"
  );

  ws.on("open", () => {
    console.log("Binance WebSocket Connected");
  });

  ws.on("message", (data) => {
    const parsed = JSON.parse(data);

    console.log("Received:", parsed.length);

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

    console.log(
      "Stored coins:",
      Object.keys(latestPrices).length
    );
  });

  ws.on("close", () => {
    console.log("Binance WebSocket closed");
    setTimeout(connectBinance, 3000);
  });

  ws.on("error", (err) => {
    console.log("Binance error:", err.message);
  });
}