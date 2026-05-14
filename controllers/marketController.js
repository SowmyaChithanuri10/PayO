const NodeCache = require("node-cache");

const {getMarkets} = require("../services/coingeckoService");


// cache for 30 seconds
const cache = new NodeCache({
  stdTTL: 30
});



exports.markets = async (req, res) => {

  try {

    // check cache
    const cachedMarkets = cache.get("markets");

    if (cachedMarkets) {

      console.log("Markets from cache");

      return res.json(cachedMarkets);
    }


    // fetch from coingecko
    const data = await getMarkets();


    // clean response
    const formattedData = data.map((coin) => ({
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      image: coin.image,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      market_cap_rank: coin.market_cap_rank,
      total_volume: coin.total_volume,
      price_change_percentage_24h:
        coin.price_change_percentage_24h
    }));


    // save cache
    cache.set("markets", formattedData);


    console.log("Markets from CoinGecko");

    res.json(formattedData);

  } catch (error) {

    console.log(error.message);

    res.status(500).json({
      message: "Failed to fetch market data"
    });

  }

};