import React, { useState } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import { TradeCard } from '../components';
import TradeForm from '../components/TradeForm';

const TradeJournal = ({
  trades,
  addTrade,
  updateTrade,
  deleteTrade,
  closeTrade,
  getStats,
  childBias,
  influence,
}) => {
  const [showForm, setShowForm] = useState(false);
  const stats = getStats();

  const openTrades = trades.filter(t => !t.status || t.status === 'OPEN');
  const closedTrades = trades.filter(t => t.status === 'CLOSED');

  return (
    <div className="space-y-6">
      {/* Stats */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen size={20} /> Trade Journal
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
            <div className="text-xs text-slate-400">Total Trades</div>
            <div className="text-2xl font-bold text-white mt-1">{stats.total}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
            <div className="text-xs text-slate-400">Open</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">{stats.open}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
            <div className="text-xs text-slate-400">Closed</div>
            <div className="text-2xl font-bold text-slate-300 mt-1">{stats.closed}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
            <div className="text-xs text-slate-400">Wins</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">{stats.wins}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
            <div className="text-xs text-slate-400">Losses</div>
            <div className="text-2xl font-bold text-rose-400 mt-1">{stats.losses}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
            <div className="text-xs text-slate-400">Win Rate</div>
            <div className="text-2xl font-bold text-blue-400 mt-1">{stats.winRate}%</div>
          </div>
        </div>
      </section>

      {/* Add Trade Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 rounded-lg font-medium text-white flex items-center gap-2 transition-colors"
      >
        <Plus size={18} /> New Trade
      </button>

      {/* Trade Form */}
      {showForm && (
        <TradeForm
          onSubmit={(trade) => {
            addTrade(trade);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
          currentBias={childBias}
          influence={influence}
        />
      )}

      {/* Open Trades */}
      {openTrades.length > 0 && (
        <section>
          <h3 className="text-md font-bold text-emerald-400 mb-3">Open Trades ({openTrades.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {openTrades.map(trade => (
              <TradeCard
                key={trade.id}
                trade={trade}
                onUpdate={updateTrade}
                onClose={closeTrade}
                onDelete={deleteTrade}
              />
            ))}
          </div>
        </section>
      )}

      {/* Closed Trades */}
      {closedTrades.length > 0 && (
        <section>
          <h3 className="text-md font-bold text-slate-400 mb-3">Closed Trades ({closedTrades.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {closedTrades.slice(0, 6).map(trade => (
              <TradeCard
                key={trade.id}
                trade={trade}
                onUpdate={updateTrade}
                onClose={closeTrade}
                onDelete={deleteTrade}
              />
            ))}
          </div>
          {closedTrades.length > 6 && (
            <div className="text-center mt-4 text-slate-400 text-sm">
              Showing 6 of {closedTrades.length} closed trades
            </div>
          )}
        </section>
      )}

      {trades.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <p className="mb-2">No trades yet. Start by creating your first trade!</p>
        </div>
      )}
    </div>
  );
};

export default TradeJournal;
