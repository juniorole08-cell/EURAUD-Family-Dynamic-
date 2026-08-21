import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

export const TradeCard = ({ trade, onUpdate, onClose, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(trade);

  const handleClose = (exitPrice) => {
    onClose(trade.id, exitPrice);
  };

  const pnl = trade.exit ? (trade.exit - trade.entry) * 10000 : null;
  const pnlColor = pnl && pnl > 0 ? 'text-emerald-400' : 'text-rose-400';
  const statusColor = trade.status === 'CLOSED' ? 'text-slate-400' : 'text-emerald-400';

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-sm font-bold text-white">{trade.pair}</div>
          <span className={`text-xs px-2 py-1 rounded ${statusColor} bg-slate-700/50 border border-slate-600`}>
            {trade.direction}
          </span>
        </div>
        <button
          onClick={() => onDelete(trade.id)}
          className="p-1 hover:bg-slate-700 rounded transition-colors"
          aria-label="Delete trade"
        >
          <X size={16} className="text-slate-400" />
        </button>
      </div>

      {/* Entry & Exit */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <div className="text-xs text-slate-400">Entry</div>
          <div className="text-white font-medium">{trade.entry.toFixed(4)}</div>
        </div>
        {trade.exit && (
          <div>
            <div className="text-xs text-slate-400">Exit</div>
            <div className="text-white font-medium">{trade.exit.toFixed(4)}</div>
          </div>
        )}
      </div>

      {/* PnL */}
      {trade.result && (
        <div className={`text-sm font-bold ${pnlColor}`}>
          {trade.result}
        </div>
      )}

      {/* Bias & Confluence */}
      <div className="text-xs text-slate-400 space-y-1">
        <div>Bias: <span className="text-slate-300">{trade.bias}</span></div>
        <div>Confluence: <span className="text-slate-300">{trade.confluence}%</span></div>
      </div>

      {/* Notes */}
      {trade.notes && (
        <div className="text-xs text-slate-400 italic border-t border-slate-700 pt-2">
          {trade.notes}
        </div>
      )}

      {/* Close Button (for open trades) */}
      {(!trade.status || trade.status === 'OPEN') && (
        <input
          type="number"
          step="0.0001"
          placeholder="Exit price"
          defaultValue={trade.exit || ''}
          onChange={(e) => setEditData({ ...editData, exit: parseFloat(e.target.value) })}
          className="w-full px-2 py-1 bg-slate-700 border border-slate-600 rounded text-sm text-white placeholder-slate-500 text-right"
        />
      )}

      {(!trade.status || trade.status === 'OPEN') && editData.exit && (
        <button
          onClick={() => handleClose(editData.exit)}
          className="w-full px-3 py-2 bg-emerald-600 hover:bg-emerald-500 rounded text-sm font-medium text-white transition-colors"
        >
          Close Trade
        </button>
      )}
    </div>
  );
};
