const axios = require('axios');

class CoinGeckoService {
  constructor() {
    this.baseURL = process.env.COINGECKO_API_URL || 'https://api.coingecko.com/api/v3';
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  // Get market data for top cryptocurrencies
  async getMarketData(currency = 'usd', perPage = 100, page = 1) {
    try {
      const response = await this.client.get('/coins/markets', {
        params: {
          vs_currency: currency,
          order: 'market_cap_desc',
          per_page: perPage,
          page: page,
          sparkline: false,
          price_change_percentage: '24h,7d'
        }
      });
      
      return response.data.map(coin => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        image: coin.image,
        currentPrice: coin.current_price,
        marketCap: coin.market_cap,
        marketCapRank: coin.market_cap_rank,
        totalVolume: coin.total_volume,
        high24h: coin.high_24h,
        low24h: coin.low_24h,
        priceChange24h: coin.price_change_24h,
        priceChangePercentage24h: coin.price_change_percentage_24h,
        priceChangePercentage7d: coin.price_change_percentage_7d_in_currency,
        circulatingSupply: coin.circulating_supply,
        totalSupply: coin.total_supply,
        ath: coin.ath,
        athChangePercentage: coin.ath_change_percentage,
        athDate: coin.ath_date,
        atl: coin.atl,
        atlChangePercentage: coin.atl_change_percentage,
        atlDate: coin.atl_date,
        lastUpdated: coin.last_updated
      }));
    } catch (error) {
    console.error(error.message);
    }
  }

  // Get trending coins
  async getTrending() {
    try {
      const response = await this.client.get('/search/trending');
      return response.data.coins.map(item => ({
        id: item.item.id,
        name: item.item.name,
        symbol: item.item.symbol.toUpperCase(),
        thumb: item.item.thumb,
        large: item.item.large,
        marketCapRank: item.item.market_cap_rank,
        priceBtc: item.item.price_btc,
        score: item.item.score
      }));
    } catch (error) {
      console.error(error.message);
    }
  }

  // Get global market data
  async getGlobalData() {
    try {
      const response = await this.client.get('/global');
      const data = response.data.data;
      
      return {
        totalMarketCap: data.total_market_cap,
        totalVolume: data.total_volume,
        marketCapPercentage: data.market_cap_percentage,
        activeCryptocurrencies: data.active_cryptocurrencies,
        upcomingIcos: data.upcoming_icos,
        ongoingIcos: data.ongoing_icos,
        endedIcos: data.ended_icos,
        markets: data.markets
      };
    } catch (error) {
    const axios = require('axios');

class CoinGeckoService {
  constructor() {
    this.baseURL = process.env.COINGECKO_API_URL || 'https://api.coingecko.com/api/v3';
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  // Get market data for top cryptocurrencies
  async getMarketData(currency = 'usd', perPage = 100, page = 1) {
    try {
      const response = await this.client.get('/coins/markets', {
        params: {
          vs_currency: currency,
          order: 'market_cap_desc',
          per_page: perPage,
          page: page,
          sparkline: false,
          price_change_percentage: '24h,7d'
        }
      });
      
      return response.data.map(coin => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        image: coin.image,
        currentPrice: coin.current_price,
        marketCap: coin.market_cap,
        marketCapRank: coin.market_cap_rank,
        totalVolume: coin.total_volume,
        high24h: coin.high_24h,
        low24h: coin.low_24h,
        priceChange24h: coin.price_change_24h,
        priceChangePercentage24h: coin.price_change_percentage_24h,
        priceChangePercentage7d: coin.price_change_percentage_7d_in_currency,
        circulatingSupply: coin.circulating_supply,
        totalSupply: coin.total_supply,
        ath: coin.ath,
        athChangePercentage: coin.ath_change_percentage,
        athDate: coin.ath_date,
        atl: coin.atl,
        atlChangePercentage: coin.atl_change_percentage,
        atlDate: coin.atl_date,
        lastUpdated: coin.last_updated
      }));
    } catch (error) {
     console.error(error.message);
    }
  }

  // Get trending coins
  async getTrending() {
    try {
      const response = await this.client.get('/search/trending');
      return response.data.coins.map(item => ({
        id: item.item.id,
        name: item.item.name,
        symbol: item.item.symbol.toUpperCase(),
        thumb: item.item.thumb,
        large: item.item.large,
        marketCapRank: item.item.market_cap_rank,
        priceBtc: item.item.price_btc,
        score: item.item.score
      }));
    } catch (error) {
      console.error(error.message);
    }
  }

  // Get global market data
  async getGlobalData() {
    try {
      const response = await this.client.get('/global');
      const data = response.data.data;
      
      return {
        totalMarketCap: data.total_market_cap,
        totalVolume: data.total_volume,
        marketCapPercentage: data.market_cap_percentage,
        activeCryptocurrencies: data.active_cryptocurrencies,
        upcomingIcos: data.upcoming_icos,
        ongoingIcos: data.ongoing_icos,
        endedIcos: data.ended_icos,
        markets: data.markets
      };
    } catch (error) {
      console.error(error.message);
    }
  }

  // Get coin details by ID
  async getCoinDetails(coinId) {
    try {
      const response = await this.client.get(`/coins/${coinId}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false
        }
      });
      
      const data = response.data;
      return {
        id: data.id,
        symbol: data.symbol.toUpperCase(),
        name: data.name,
        image: data.image,
        marketData: data.market_data,
        description: data.description.en,
        links: data.links,
        genesisDate: data.genesis_date,
        categories: data.categories
      };
    } catch (error) {
console.error(error.message);
    }
  }
}

module.exports = new CoinGeckoService();
      throw error;
    }
  }

  // Get coin details by ID
  async getCoinDetails(coinId) {
    try {
      const response = await this.client.get(`/coins/${coinId}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false
        }
      });
      
      const data = response.data;
      return {
        id: data.id,
        symbol: data.symbol.toUpperCase(),
        name: data.name,
        image: data.image,
        marketData: data.market_data,
        description: data.description.en,
        links: data.links,
        genesisDate: data.genesis_date,
        categories: data.categories
      };
    } catch (error) {
console.error(error.message);
    }
  }
}

module.exports = new CoinGeckoService();