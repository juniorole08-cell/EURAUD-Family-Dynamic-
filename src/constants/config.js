// API Configuration
export const API_CONFIG = {
  MODE: process.env.REACT_APP_API_MODE || 'demo',
  MAX_NEWS_ITEMS: parseInt(process.env.REACT_APP_MAX_NEWS_ITEMS || '6'),
  REFRESH_INTERVAL: parseInt(process.env.REACT_APP_REFRESH_INTERVAL || '30000'),
  DEMO_USER_ID: process.env.REACT_APP_DEMO_USER_ID || 'user_demo_6USA1PPUFT39AYBF',
  ALPHA_VANTAGE_KEY: process.env.REACT_APP_ALPHA_VANTAGE_KEY || '6USA1PPUFT39AYBF',
};

// Currency Pairs
export const PAIRS = {
  EUR_USD: 'EUR/USD',
  AUD_USD: 'AUD/USD',
  EUR_AUD: 'EUR/AUD',
};

// News Sources
export const NEWS_SOURCES = [
  'Forex Factory',
  'Investing.com',
  'ForexLive',
  'Trading Economics',
  'DailyFX',
];

// Impact Levels
export const IMPACT_LEVELS = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
};

// Trade Direction
export const TRADE_DIRECTION = {
  LONG: 'LONG',
  SHORT: 'SHORT',
};

// Bias States
export const BIAS_STATES = {
  ULTRA_BULLISH: 'ULTRA BULLISH',
  BULLISH: 'BULLISH',
  NEUTRAL: 'NEUTRAL',
  BEARISH: 'BEARISH',
  ULTRA_BEARISH: 'ULTRA BEARISH',
};

// Color Schemes
export const COLOR_SCHEME = {
  ultra_bullish: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  bullish: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
  neutral: 'text-slate-400 bg-slate-800 border-slate-700',
  bearish: 'text-rose-300 bg-rose-500/10 border-rose-500/20',
  ultra_bearish: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
};