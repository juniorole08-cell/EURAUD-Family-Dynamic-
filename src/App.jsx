import React, { useState, useEffect } from 'react';
import { LogOut, RefreshCw } from 'lucide-react';
import { authService } from '../services';
import { useDataFeeds, useTradeJournal, useBiasAnalysis, useTheme } from '../hooks';
import {
  ThemeToggle,
  PriceDisplay,
  BiasIndicator,
  NewsCard,
  TradeCard,
  EconomicCalendar,
  COTIndicator,
} from '../components';
import Dashboard from './pages/Dashboard';
import TradeJournal from './pages/TradeJournal';
import Analytics from './pages/Analytics';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { theme, toggleTheme } = useTheme();
  const { prices, news, cot, calendar, loading, refresh, lastSync } = useDataFeeds();
  const { trades, addTrade, updateTrade, deleteTrade, closeTrade, getStats } = useTradeJournal();
  const { childBias, influence, calculateNewsImpact } = useBiasAnalysis(
    prices.eurUsd.changePct,
    prices.audUsd.changePct
  );

  // Initialize auth
  useEffect(() => {
    const session = authService.restoreSession();
    if (!session.success) {
      authService.createDemoAccount();
      setCurrentUser(authService.getCurrentUser());
    } else {
      setCurrentUser(session.user);
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">EUR/AUD Family Dynamic</h1>
          <p className="text-slate-400 mb-6">Initializing...</p>
        </div>
      </div>
    );
  }

  const pageProps = {
    prices,
    news,
    cot,
    calendar,
    loading,
    lastSync,
    trades,
    addTrade,
    updateTrade,
    deleteTrade,
    closeTrade,
    getStats,
    childBias,
    influence,
    calculateNewsImpact,
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-slate-950' : 'bg-slate-50'}`}>
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">EUR/AUD Family Dynamic</h1>
            <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">
              {currentUser.email}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={refresh}
              disabled={loading}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 border border-slate-700"
              title="Refresh data"
            >
              <RefreshCw
                size={18}
                className={`text-slate-400 ${loading ? 'animate-spin' : ''}`}
              />
            </button>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <button
              onClick={handleLogout}
              className="px-3 py-2 text-sm bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors text-slate-300"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-t border-slate-700 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2">
            {['dashboard', 'journal', 'analytics'].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  currentPage === page
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                {page === 'dashboard'
                  ? 'Dashboard'
                  : page === 'journal'
                  ? 'Trade Journal'
                  : 'Analytics'}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'dashboard' && <Dashboard {...pageProps} />}
        {currentPage === 'journal' && <TradeJournal {...pageProps} />}
        {currentPage === 'analytics' && <Analytics {...pageProps} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-slate-500">
          Last sync: {lastSync.toLocaleTimeString()} | Demo mode | No real API connections
        </div>
      </footer>
    </div>
  );
};

export default App;
