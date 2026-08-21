import { useState, useEffect, useCallback } from 'react';
import { dataFeedService } from '../services';
import { storageService } from '../services';
import { API_CONFIG } from '../constants';

/**
 * Hook for managing live data feeds with caching and polling
 */
export const useDataFeeds = (autoStart = true) => {
  const [prices, setPrices] = useState({
    eurUsd: { price: 1.0850, changePct: 0, timestamp: new Date() },
    audUsd: { price: 0.6550, changePct: 0, timestamp: new Date() },
  });
  const [news, setNews] = useState([]);
  const [cot, setCot] = useState(null);
  const [calendar, setCalendar] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSync, setLastSync] = useState(new Date());

  const fetchFeeds = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await dataFeedService.fetchAllFeeds(API_CONFIG.MAX_NEWS_ITEMS);

      if (result.success) {
        setPrices(result.data.prices);
        setNews(result.data.news.data || []);
        setCot(result.data.cot.data);
        setCalendar(result.data.calendar.data || []);
        storageService.setCachedNews(result.data.news.data);
        storageService.setCachedCOT(result.data.cot.data);
        setLastSync(new Date());
      } else {
        setError(result.error || 'Failed to fetch feeds');
        // Fallback to cache
        const cachedNews = storageService.getCachedNews();
        if (cachedNews?.data) {
          setNews(cachedNews.data);
        }
      }
    } catch (err) {
      setError(err.message);
      console.error('Feed fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!autoStart) return;

    // Initial fetch
    fetchFeeds();

    // Setup polling interval
    const interval = setInterval(fetchFeeds, API_CONFIG.REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [autoStart, fetchFeeds]);

  return {
    prices,
    news,
    cot,
    calendar,
    loading,
    error,
    lastSync,
    refresh: fetchFeeds,
  };
};
