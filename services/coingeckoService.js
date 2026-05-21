const axios = require('axios');

class CoinGeckoService {
  constructor() {
    this.baseURL = 'https://api.coingecko.com/api/v3';
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000
    });
    this.coinListCache = null;
  }

  async getCoinList() {
    if (this.coinListCache) return this.coinListCache;
    try {
      const response = await this.client.get('/coins/list');
      this.coinListCache = response.data;
      return this.coinListCache;
    } catch (error) {
      console.error('Error fetching coin list:', error.message);
      return [];
    }
  }

  async getGlobalData() {
    try {
      const response = await this.client.get('/global');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching global data:', error.message);
      return {};
    }
  }

  async getCoinDetails(coinId) {
    try {
      const response = await this.client.get(`/coins/${coinId}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: true,
          developer_data: false,
          sparkline: false
        }
      });
      
      return {
        name: response.data.name,
        description: response.data.description,
        links: {
          homepage: response.data.links?.homepage || [],
          twitter_screen_name: response.data.links?.twitter_screen_name,
          telegram_channel_identifier: response.data.links?.telegram_channel_identifier,
          subreddit_url: response.data.links?.subreddit_url
        },
        marketData: response.data.market_data,
        image: response.data.image
      };
    } catch (error) {
      console.error(`Error fetching ${coinId}:`, error.message);
      return null;
    }
  }

  async findCoinIdBySymbol(symbol) {
    const coinList = await this.getCoinList();
    const lowerSymbol = symbol.toLowerCase();
    const coin = coinList.find(c => c.symbol === lowerSymbol);
    return coin?.id || null;
  }
}

module.exports = new CoinGeckoService();