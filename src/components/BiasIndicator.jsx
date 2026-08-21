import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const BiasIndicator = ({ bias, influence, loading }) => {
  if (loading) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-3">
        <div className="h-6 w-32 bg-slate-700 rounded animate-pulse" />
        <div className="h-4 w-48 bg-slate-700 rounded animate-pulse" />
      </div>
    );
  }

  const { label, color, score } = bias;
  const { dadPct, momPct } = influence;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
      <div className="text-slate-400 text-sm mb-3">EUR/AUD Bias</div>
      <div className={`px-3 py-2 rounded-lg border ${color} mb-4 inline-block`}>
        <div className="font-bold text-sm">{label}</div>
        <div className="text-xs opacity-75">Score: {score > 0 ? '+' : ''}{score}</div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">EUR/USD Influence</span>
          <div className="flex items-center gap-2">
            <TrendingUp size={12} className="text-emerald-400" />
            <span className="text-emerald-400 font-medium">{dadPct}%</span>
          </div>
        </div>
        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${dadPct}%` }}
          />
        </div>
      </div>

      <div className="space-y-2 mt-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">AUD/USD Influence</span>
          <div className="flex items-center gap-2">
            <TrendingDown size={12} className="text-rose-400" />
            <span className="text-rose-400 font-medium">{momPct}%</span>
          </div>
        </div>
        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-rose-500 transition-all"
            style={{ width: `${momPct}%` }}
          />
        </div>
      </div>
    </div>
  );
};
