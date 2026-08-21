import React from 'react';
import { Calendar, TrendingUp } from 'lucide-react';

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

export const EconomicCalendar = ({ events, loading }) => {
  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-14 bg-slate-700 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {events.length === 0 ? (
        <div className="text-slate-400 text-sm text-center py-4">No calendar events</div>
      ) : (
        events.map((event) => (
          <div
            key={event.id}
            className="bg-slate-800 border border-slate-700 rounded-lg p-3 hover:border-slate-600 transition-colors"
          >
            <div className="flex items-start gap-3">
              <Calendar size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-white truncate">{event.event}</h3>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs text-slate-400">{event.country}</span>
                  <span className="text-xs text-slate-400">{event.date}</span>
                  <ImpactBadge impact={event.impact} />
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Forecast: <span className="text-slate-300">{event.forecast}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
