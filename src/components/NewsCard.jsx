import React from 'react';
import { Zap } from 'lucide-react';

const ImpactBadge = ({ impact }) => {
  const colors = {
    High: 'bg-rose-500/20 border-rose-500/50 text-rose-300',
    Medium: 'bg-amber-500/20 border-amber-500/50 text-amber-300',
    Low: 'bg-slate-600/20 border-slate-600/50 text-slate-300',
  };

  return (
    <span className={`text-xs px-2 py-1 rounded border ${colors[impact] || colors.Low}`}>
      {impact}
    </span>
  );
};

export const NewsCard = ({ news, maxItems = 6, loading, onRefresh }) => {
  if (loading && news.length === 0) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-16 bg-slate-700 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  const displayNews = news.slice(0, maxItems);

  return (
    <div className="space-y-2">
      {displayNews.length === 0 ? (
        <div className="text-slate-400 text-sm text-center py-4">No news available</div>
      ) : (
        displayNews.map((item) => (
          <div
            key={item.id}
            className="bg-slate-800 border border-slate-700 rounded-lg p-3 hover:border-slate-600 transition-colors group"
          >
            <div className="flex items-start gap-2 mb-2">
              <Zap size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors truncate">
                  {item.headline}
                </h3>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs text-slate-400">{item.source}</span>
                  <ImpactBadge impact={item.impact} />
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-500 ml-5">{item.timestamp}</div>
          </div>
        ))
      )}
      {displayNews.length > 0 && (
        <button
          onClick={onRefresh}
          className="w-full mt-3 px-3 py-2 text-xs bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded transition-colors text-slate-300"
        >
          Refresh News
        </button>
      )}
    </div>
  );
};
