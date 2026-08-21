// Data Feed Service
// Live news sentiment from Alpha Vantage; prices, COT, and calendar remain simulated

import { API_CONFIG, IMPACT_LEVELS } from '../constants';

const generateRandomChange = (min = -2, max = 2) => {
  return Math.random() * (max - min) + min;
};

const generateRandomPrice = (base = 1, variance = 0.05) => {
  return base + (Math.random() - 0.5) * variance * 2;
};

const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';
const NEWS_TICKERS = ['FOREX:EUR', 'FOREX:AUD', 'FOREX:USD'];

// Alpha Vantage timestamps look like "20240115T093000"
const parseAlphaVantageTimestamp = (raw) => {
  if (!raw || raw.length < 15) return new Date();
  const iso = `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}T${raw.slice(9, 11)}:${raw.slice(11, 13)}:${raw.slice(13, 15)}Z`;
  const parsed = new Date(iso);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
};

const formatRelativeTime = (date) => {
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} min${diffMins === 1 ? '' : 's'} ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
};

// Pick the currency this article is most relevant to, from its per-ticker sentiment breakdown
const resolveCurrency = (tickerSentiment = []) => {
  const relevant = NEWS_TICKERS
    .map((ticker) => tickerSentiment.find((t) => t.ticker === ticker))
    .filter(Boolean)
    .sort((a, b) => parseFloat(b.relevance_score) - parseFloat(a.relevance_score));

  if (relevant.length === 0) return { currency: 'USD', relevance: 0, sentimentScore: 0 };

  const top = relevant[0];
  return {
    currency: top.ticker.split(':')[1],
    relevance: parseFloat(top.relevance_score) || 0,
    sentimentScore: parseFloat(top.ticker_sentiment_score) || 0,
  };
};

const resolveImpact = (relevance) => {
  if (relevance >= 0.5) return 'High';
  if (relevance >= 0.2) return 'Medium';
  return 'Low';
};

const mapArticleToNewsItem = (article, index) => {
  const { currency, relevance, sentimentScore } = resolveCurrency(article.ticker_sentiment);
  const publishedAt = parseAlphaVantageTimestamp(article.time_published);

  return {
    id: article.url || `n_${publishedAt.getTime()}_${index}`,
    headline: article.title,
    source: article.source,
    currency,
    impact: resolveImpact(relevance),
    sentiment: sentimentScore || parseFloat(article.overall_sentiment_score) || 0,
    timestamp: formatRelativeTime(publishedAt),
  };
};

const generateCOTReport = () => ({
  id: `cot_${Date.now()}`,
  week: new Date().toISOString().split('T')[0],
  euFutures: {
    commercialLong: Math.floor(Math.random() * 500000),
    commercialShort: Math.floor(Math.random() * 500000),
    nonCommercialLong: Math.floor(Math.random() * 300000),
    nonCommercialShort: Math.floor(Math.random() * 300000),
    netPositioning: Math.floor(Math.random() * 100000) - 50000,
  },
  audFutures: {
    commercialLong: Math.floor(Math.random() * 200000),
    commercialShort: Math.floor(Math.random() * 200000),
    nonCommercialLong: Math.floor(Math.random() * 150000),
    nonCommercialShort: Math.floor(Math.random() * 150000),
    netPositioning: Math.floor(Math.random() * 50000) - 25000,
  },
  timestamp: Date.now(),
});

const generateEconomicCalendar = () => ([
  {
    id: `ec_${Date.now()}_1`,
    event: 'ECB Interest Rate Decision',
    country: 'EU',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    forecast: '4.25%',
    previous: '4.25%',
    impact: IMPACT_LEVELS.HIGH,
  },
  {
    id: `ec_${Date.now()}_2`,
    event: 'Australian CPI (YoY)',
    country: 'AU',
    date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    forecast: '2.8%',
    previous: '3.2%',
    impact: IMPACT_LEVELS.HIGH,
  },
  {
    id: `ec_${Date.now()}_3`,
    event: 'US Non-Farm Payroll',
    country: 'US',
    date: new Date(Date.now() + 259200000).toISOString().split('T')[0],
    forecast: '180K',
    previous: '159K',
    impact: IMPACT_LEVELS.HIGH,
  },
  {
    id: `ec_${Date.now()}_4`,
    event: 'EUR Retail Sales (MoM)',
    country: 'EU',
    date: new Date(Date.now() + 345600000).toISOString().split('T')[0],
    forecast: '0.2%',
    previous: '-0.5%',
    impact: IMPACT_LEVELS.MEDIUM,
  },
  {
    id: `ec_${Date.now()}_5`,
    event: 'RBA Cash Rate Decision',
    country: 'AU',
    date: new Date(Date.now() + 432000000).toISOString().split('T')[0],
    forecast: '4.35%',
    previous: '4.35%',
    impact: IMPACT_LEVELS.HIGH,
  },
]);

export const dataFeedService = {
  // Fetch live prices (simulated)
  fetchPrices: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          eurUsd: {
            price: generateRandomPrice(1.0850, 0.02),
            changePct: generateRandomChange(-1, 1),
            timestamp: new Date(),
          },
          audUsd: {
            price: generateRandomPrice(0.6550, 0.015),
            changePct: generateRandomChange(-1, 1),
            timestamp: new Date(),
          },
        });
      }, 300);
    });
  },

  // Fetch live news sentiment from Alpha Vantage
  fetchNews: async (maxItems = 6) => {
    const url = new URL(ALPHA_VANTAGE_BASE_URL);
    url.searchParams.set('function', 'NEWS_SENTIMENT');
    url.searchParams.set('tickers', NEWS_TICKERS.join(','));
    url.searchParams.set('topics', 'forex');
    url.searchParams.set('sort', 'LATEST');
    url.searchParams.set('limit', String(Math.max(maxItems, 6)));
    url.searchParams.set('apikey', API_CONFIG.ALPHA_VANTAGE_KEY);

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Alpha Vantage request failed with status ${response.status}`);
    }

    const payload = await response.json();
    if (payload.Note || payload.Information || payload['Error Message']) {
      throw new Error(payload.Note || payload.Information || payload['Error Message']);
    }

    const news = (payload.feed || []).slice(0, maxItems).map(mapArticleToNewsItem);

    return {
      data: news,
      timestamp: new Date(),
      count: news.length,
    };
  },

  // Fetch COT report (weekly)
  fetchCOTReport: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: generateCOTReport(),
          timestamp: new Date(),
        });
      }, 400);
    });
  },

  // Fetch economic calendar
  fetchEconomicCalendar: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: generateEconomicCalendar(),
          timestamp: new Date(),
          count: 5,
        });
      }, 450);
    });
  },

  // Aggregate all feeds
  fetchAllFeeds: async (maxNews = 6) => {
    try {
      const [prices, news, cot, calendar] = await Promise.all([
        dataFeedService.fetchPrices(),
        dataFeedService.fetchNews(maxNews),
        dataFeedService.fetchCOTReport(),
        dataFeedService.fetchEconomicCalendar(),
      ]);

      return {
        success: true,
        data: {
          prices,
          news,
          cot,
          calendar,
        },
        timestamp: new Date(),
      };
    } catch (err) {
      return {
        success: false,
        error: err.message,
        timestamp: new Date(),
      };
    }
  },
};