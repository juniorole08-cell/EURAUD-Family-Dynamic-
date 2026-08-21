// Mock Data Feed Service
// Simulates live COT reports, economic calendar, and news feeds

import { IMPACT_LEVELS, NEWS_SOURCES } from '../constants';

const generateRandomChange = (min = -2, max = 2) => {
  return Math.random() * (max - min) + min;
};

const generateRandomPrice = (base = 1, variance = 0.05) => {
  return base + (Math.random() - 0.5) * variance * 2;
};

const generateNewsHeadlines = () => [
  {
    id: `n_${Date.now()}_1`,
    headline: 'ECB Signals Potential Rate Hold Amid Persistent Inflation Concerns',
    source: NEWS_SOURCES[Math.floor(Math.random() * NEWS_SOURCES.length)],
    currency: 'EUR',
    impact: IMPACT_LEVELS.HIGH,
    sentiment: generateRandomChange(-1, 1),
    timestamp: 'just now',
  },
  {
    id: `n_${Date.now()}_2`,
    headline: 'Australian Employment Data Beats Forecasts, Supports RBA Hawkish Stance',
    source: NEWS_SOURCES[Math.floor(Math.random() * NEWS_SOURCES.length)],
    currency: 'AUD',
    impact: IMPACT_LEVELS.HIGH,
    sentiment: generateRandomChange(-1, 1),
    timestamp: '5 mins ago',
  },
  {
    id: `n_${Date.now()}_3`,
    headline: 'US Treasury Yields Rise on Strong NFP; Dollar Strengthens Broadly',
    source: NEWS_SOURCES[Math.floor(Math.random() * NEWS_SOURCES.length)],
    currency: 'USD',
    impact: IMPACT_LEVELS.MEDIUM,
    sentiment: generateRandomChange(-1, 1),
    timestamp: '15 mins ago',
  },
  {
    id: `n_${Date.now()}_4`,
    headline: 'EUR/AUD Technical Breakdown: Support Level at 1.6480 Under Pressure',
    source: 'Investing.com',
    currency: 'EUR',
    impact: IMPACT_LEVELS.MEDIUM,
    sentiment: generateRandomChange(-1, 1),
    timestamp: '30 mins ago',
  },
  {
    id: `n_${Date.now()}_5`,
    headline: 'RBA Minutes: Officials Express Confidence in Current Policy Stance',
    source: 'Forex Factory',
    currency: 'AUD',
    impact: IMPACT_LEVELS.MEDIUM,
    sentiment: generateRandomChange(-1, 1),
    timestamp: '45 mins ago',
  },
  {
    id: `n_${Date.now()}_6`,
    headline: 'Fed Chair Powell Warns of Economic Headwinds; USD Dips on Comments',
    source: 'ForexLive',
    currency: 'USD',
    impact: IMPACT_LEVELS.LOW,
    sentiment: generateRandomChange(-1, 1),
    timestamp: '1 hour ago',
  },
];

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

  // Fetch news feed
  fetchNews: async (maxItems = 6) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const news = generateNewsHeadlines().slice(0, maxItems);
        resolve({
          data: news,
          timestamp: new Date(),
          count: news.length,
        });
      }, 500);
    });
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