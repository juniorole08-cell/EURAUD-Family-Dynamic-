import React from 'react';
import { BarChart3, TrendingUp, PieChart } from 'lucide-react';

const Analytics = ({ trades, getStats }) => {
  const stats = getStats();
  const closed = trades.filter(t => t.status === 'CLOSED');

  const avgWinPips = closed.filter(t => t.result?.includes('WIN')).length > 0
    ? Math.round(
        closed
          .filter(t => t.result?.includes('WIN'))
          .reduce((sum, t) => sum + (t.pips || 0), 0) /
          closed.filter(t => t.result?.includes('WIN')).length
      )
    : 0;

  const avgLossPips = closed.filter(t => t.result?.includes('LOSS')).length > 0
    ? Math.round(
        closed
          .filter(t => t.result?.includes('LOSS'))
          .reduce((sum, t) => sum + (t.pips || 0), 0) /
          closed.filter(t => t.result?.includes('LOSS')).length
      )
    : 0;

  const profitFactor = avgLossPips > 0 ? (avgWinPips / avgLossPips).toFixed(2) : '∞';

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <BarChart3 size={20} /> Performance Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">Win Rate</div>
            <div className="text-3xl font-bold text-blue-400 mb-2">{stats.winRate}%</div>
            <div className="text-xs text-slate-500">Based on {stats.closed} trades</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">Avg Win</div>
            <div className="text-3xl font-bold text-emerald-400 mb-2">+{avgWinPips}</div>
            <div className="text-xs text-slate-500">Pips per winning trade</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">Avg Loss</div>
            <div className="text-3xl font-bold text-rose-400 mb-2">-{avgLossPips}</div>
            <div className="text-xs text-slate-500">Pips per losing trade</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">Profit Factor</div>
            <div className="text-3xl font-bold text-purple-400 mb-2">{profitFactor}</div>
            <div className="text-xs text-slate-500">Win avg / Loss avg</div>
          </div>
        </div>
      </section>

      {/* Trade Breakdown */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <PieChart size={20} /> Trade Breakdown
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-2">
            <div className="text-sm text-slate-400">Total Trades</div>
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: '100%' }} />
            </div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-2">
            <div className="text-sm text-slate-400">Open Trades</div>
            <div className="text-2xl font-bold text-emerald-400">{stats.open}</div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500"
                style={{ width: `${(stats.open / Math.max(stats.total, 1)) * 100}%` }}
              />
            </div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-2">
            <div className="text-sm text-slate-400">Closed Trades</div>
            <div className="text-2xl font-bold text-slate-300">{stats.closed}</div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-400"
                style={{ width: `${(stats.closed / Math.max(stats.total, 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Win/Loss Summary */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp size={20} /> Win/Loss Summary
        </h2>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-slate-400 mb-2">Total Pips Won</div>
              <div className="text-2xl font-bold text-emerald-400">
                +{closed.filter(t => t.result?.includes('WIN')).reduce((sum, t) => sum + (t.pips || 0), 0)}
              </div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-2">Total Pips Lost</div>
              <div className="text-2xl font-bold text-rose-400">
                -{closed.filter(t => t.result?.includes('LOSS')).reduce((sum, t) => sum + (t.pips || 0), 0)}
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="text-sm text-slate-400 mb-2">Net Pips</div>
            <div className={`text-3xl font-bold ${
              stats.totalPips >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {stats.totalPips >= 0 ? '+' : ''}{stats.totalPips}
            </div>
          </div>
        </div>
      </section>

      {stats.total === 0 && (
        <div className="text-center py-12 text-slate-400">
          <p>No trades yet. Create and close some trades to see analytics!</p>
        </div>
      )}
    </div>
  );
};

export default Analytics;
