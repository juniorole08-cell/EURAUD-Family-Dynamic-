import { useState, useCallback } from 'react';
import { storageService } from '../services';

/**
 * Hook for managing trade journal with localStorage persistence
 */
export const useTradeJournal = () => {
  const [trades, setTrades] = useState(() => storageService.getTrades());

  const addTrade = useCallback((trade) => {
    const newTrade = {
      ...trade,
      id: trade.id || `t_${Date.now()}`,
      timestamp: new Date(),
    };
    const updated = [newTrade, ...trades];
    setTrades(updated);
    storageService.saveTrades(updated);
    return newTrade;
  }, [trades]);

  const updateTrade = useCallback((tradeId, updates) => {
    const updated = trades.map(t => t.id === tradeId ? { ...t, ...updates } : t);
    setTrades(updated);
    storageService.saveTrades(updated);
  }, [trades]);

  const deleteTrade = useCallback((tradeId) => {
    const updated = trades.filter(t => t.id !== tradeId);
    setTrades(updated);
    storageService.saveTrades(updated);
  }, [trades]);

  const closeTrade = useCallback((tradeId, exitPrice, exitTime = new Date()) => {
    const trade = trades.find(t => t.id === tradeId);
    if (trade) {
      const pips = Math.round((exitPrice - trade.entry) * 10000);
      const result = trade.direction === 'LONG' ? (pips > 0 ? 'WIN' : 'LOSS') : (pips < 0 ? 'WIN' : 'LOSS');
      updateTrade(tradeId, {
        exit: exitPrice,
        exitTime,
        pips: Math.abs(pips),
        result: `${result} (${pips > 0 ? '+' : ''}${pips} pips)`,
        status: 'CLOSED',
      });
    }
  }, [trades, updateTrade]);

  const clearAllTrades = useCallback(() => {
    setTrades([]);
    storageService.clearTrades();
  }, []);

  const getStats = useCallback(() => {
    const closed = trades.filter(t => t.status === 'CLOSED');
    const wins = closed.filter(t => t.result && t.result.startsWith('WIN')).length;
    const losses = closed.filter(t => t.result && t.result.startsWith('LOSS')).length;
    const winRate = closed.length > 0 ? Math.round((wins / closed.length) * 100) : 0;
    const totalPips = closed.reduce((sum, t) => sum + (t.pips || 0), 0);

    return {
      total: trades.length,
      open: trades.filter(t => !t.status || t.status === 'OPEN').length,
      closed: closed.length,
      wins,
      losses,
      winRate,
      totalPips,
    };
  }, [trades]);

  return {
    trades,
    addTrade,
    updateTrade,
    deleteTrade,
    closeTrade,
    clearAllTrades,
    getStats,
  };
};
