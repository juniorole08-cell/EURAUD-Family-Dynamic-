// LocalStorage Service for persisting trades, settings, and user preferences

const STORAGE_KEYS = {
  TRADES: 'euraud_trades',
  THEME: 'euraud_theme',
  USER_PREFS: 'euraud_user_prefs',
  LAST_SYNC: 'euraud_last_sync',
  CACHED_NEWS: 'euraud_cached_news',
  CACHED_COT: 'euraud_cached_cot',
};

export const storageService = {
  // ── TRADES ──
  getTrades: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TRADES);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Error reading trades:', err);
      return [];
    }
  },

  saveTrades: (trades) => {
    try {
      localStorage.setItem(STORAGE_KEYS.TRADES, JSON.stringify(trades));
      return true;
    } catch (err) {
      console.error('Error saving trades:', err);
      return false;
    }
  },

  addTrade: (trade) => {
    const trades = storageService.getTrades();
    trades.unshift(trade);
    return storageService.saveTrades(trades);
  },

  updateTrade: (tradeId, updates) => {
    const trades = storageService.getTrades();
    const index = trades.findIndex(t => t.id === tradeId);
    if (index !== -1) {
      trades[index] = { ...trades[index], ...updates };
      return storageService.saveTrades(trades);
    }
    return false;
  },

  deleteTrade: (tradeId) => {
    const trades = storageService.getTrades();
    const filtered = trades.filter(t => t.id !== tradeId);
    return storageService.saveTrades(filtered);
  },

  clearTrades: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.TRADES);
      return true;
    } catch (err) {
      console.error('Error clearing trades:', err);
      return false;
    }
  },

  // ── THEME ──
  getTheme: () => {
    try {
      const theme = localStorage.getItem(STORAGE_KEYS.THEME);
      return theme || 'dark';
    } catch (err) {
      return 'dark';
    }
  },

  setTheme: (theme) => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
      return true;
    } catch (err) {
      console.error('Error saving theme:', err);
      return false;
    }
  },

  // ── USER PREFERENCES ──
  getUserPrefs: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PREFS);
      return data ? JSON.parse(data) : { refreshInterval: 30000, maxNewsItems: 6 };
    } catch (err) {
      return { refreshInterval: 30000, maxNewsItems: 6 };
    }
  },

  saveUserPrefs: (prefs) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PREFS, JSON.stringify(prefs));
      return true;
    } catch (err) {
      console.error('Error saving preferences:', err);
      return false;
    }
  },

  // ── CACHE ──
  getCachedNews: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CACHED_NEWS);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      return null;
    }
  },

  setCachedNews: (news) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CACHED_NEWS, JSON.stringify({
        data: news,
        timestamp: Date.now(),
      }));
      return true;
    } catch (err) {
      console.error('Error caching news:', err);
      return false;
    }
  },

  getCachedCOT: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CACHED_COT);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      return null;
    }
  },

  setCachedCOT: (cot) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CACHED_COT, JSON.stringify({
        data: cot,
        timestamp: Date.now(),
      }));
      return true;
    } catch (err) {
      console.error('Error caching COT:', err);
      return false;
    }
  },

  clearAllCache: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CACHED_NEWS);
      localStorage.removeItem(STORAGE_KEYS.CACHED_COT);
      localStorage.removeItem(STORAGE_KEYS.LAST_SYNC);
      return true;
    } catch (err) {
      console.error('Error clearing cache:', err);
      return false;
    }
  },

  // ── SYNC ──
  getLastSync: () => {
    try {
      const timestamp = localStorage.getItem(STORAGE_KEYS.LAST_SYNC);
      return timestamp ? parseInt(timestamp) : 0;
    } catch (err) {
      return 0;
    }
  },

  setLastSync: (timestamp) => {
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_SYNC, timestamp.toString());
      return true;
    } catch (err) {
      console.error('Error saving sync timestamp:', err);
      return false;
    }
  },
};