import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const PriceDisplay = ({ pair, price, changePct, loading }) => {
  const isPositive = changePct >= 0;
  const changeColor = isPositive ? 'text-emerald-400' : 'text-rose-400';
  const arrowIcon = isPositive ? 
    <TrendingUp size={16} /> : 
    <TrendingDown size={16} />;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
      <div className="text-slate-400 text-sm mb-2">{pair}</div>
      <div className="flex items-baseline gap-3">
        {loading ? (
          <div className="h-8 w-24 bg-slate-700 rounded animate-pulse" />
        ) : (
          <>
            <div className="text-2xl font-bold text-white">{price.toFixed(4)}</div>
            <div className={`flex items-center gap-1 ${changeColor} text-sm font-medium`}>
              {arrowIcon}
              {changePct > 0 ? '+' : ''}{changePct.toFixed(2)}%
            </div>
          </>
        )}
      </div>
    </div>
  );
};
