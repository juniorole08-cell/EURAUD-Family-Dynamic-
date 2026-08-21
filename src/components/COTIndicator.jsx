import React from 'react';

export const COTIndicator = ({ cot, loading }) => {
  if (loading || !cot) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
        <div className="h-6 w-32 bg-slate-700 rounded animate-pulse" />
      </div>
    );
  }

  const renderBar = (label, value, max) => (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <span className="text-slate-300 font-medium">{(value / 1000).toFixed(0)}k</span>
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );

  const euMax = Math.max(
    cot.euFutures.commercialLong,
    cot.euFutures.commercialShort,
    cot.euFutures.nonCommercialLong,
    cot.euFutures.nonCommercialShort
  );

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-4">
      <div>
        <div className="text-slate-400 text-sm mb-3">EUR Futures COT</div>
        <div className="space-y-3">
          {renderBar('Commercial Long', cot.euFutures.commercialLong, euMax)}
          {renderBar('Commercial Short', cot.euFutures.commercialShort, euMax)}
          {renderBar('Non-Commercial Long', cot.euFutures.nonCommercialLong, euMax)}
          {renderBar('Non-Commercial Short', cot.euFutures.nonCommercialShort, euMax)}
        </div>
        <div className={`mt-3 px-2 py-1 rounded text-xs font-medium ${
          cot.euFutures.netPositioning > 0
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
        }`}>
          Net: {cot.euFutures.netPositioning > 0 ? '+' : ''}{(cot.euFutures.netPositioning / 1000).toFixed(0)}k
        </div>
      </div>
    </div>
  );
};
