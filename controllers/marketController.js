const {getLatestPrices,getPrice} = require("../services/binanceService");
 
// GET /api/prices
exports.markets = async (req, res) => {
  try {
    const data = getLatestPrices();
 
    res.json({
      source: "binance",
      count: data.length,
      data
    });
 
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch Binance market data"
    });
  }
};
 
// GET /api/price/:symbol
exports.singlePrice = (req, res) => {
  const symbol = req.params.symbol;
 
  const data = getPrice(symbol);
 
  if (!data) {
    return res.status(404).json({
      message: "Price not available yet"
    });
  }
 
  res.json({
    source: "binance",
    data
  });
};