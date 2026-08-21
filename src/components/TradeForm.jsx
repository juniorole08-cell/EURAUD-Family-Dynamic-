import React, { useState } from 'react';
import { X } from 'lucide-react';
import { TRADE_DIRECTION, PAIRS } from '../constants';

const TradeForm = ({ onSubmit, onCancel, currentBias, influence }) => {
  const [formData, setFormData] = useState({
    pair: 'EUR/AUD',
    direction: TRADE_DIRECTION.LONG,
    entry: '',
    sl: '',
    tp: '',
    rr: '',
    bias: currentBias?.label || 'NEUTRAL',
    confluence: Math.max(influence?.dadPct || 0, influence?.momPct || 0),
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.entry && formData.sl) {
      onSubmit({
        id: `t_${Date.now()}`,
        pair: formData.pair,
        direction: formData.direction,
        entry: parseFloat(formData.entry),
        sl: parseFloat(formData.sl),
        tp: formData.tp ? parseFloat(formData.tp) : null,
        rr: formData.rr ? parseFloat(formData.rr) : null,
        bias: formData.bias,
        confluence: parseInt(formData.confluence),
        notes: formData.notes,
        timestamp: new Date(),
        status: 'OPEN',
      });
      setFormData({
        pair: 'EUR/AUD',
        direction: TRADE_DIRECTION.LONG,
        entry: '',
        sl: '',
        tp: '',
        rr: '',
        bias: currentBias?.label || 'NEUTRAL',
        confluence: Math.max(influence?.dadPct || 0, influence?.momPct || 0),
        notes: '',
      });
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">New Trade Entry</h3>
        <button
          onClick={onCancel}
          className="p-1 hover:bg-slate-700 rounded transition-colors"
        >
          <X size={18} className="text-slate-400" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Pair */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Pair</label>
            <select
              value={formData.pair}
              onChange={(e) => setFormData({ ...formData, pair: e.target.value })}
              className="w-full px-2 py-2 bg-slate-700 border border-slate-600 rounded text-sm text-white"
            >
              <option value="EUR/AUD">EUR/AUD</option>
              <option value="EUR/USD">EUR/USD</option>
              <option value="AUD/USD">AUD/USD</option>
            </select>
          </div>

          {/* Direction */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Direction</label>
            <select
              value={formData.direction}
              onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
              className="w-full px-2 py-2 bg-slate-700 border border-slate-600 rounded text-sm text-white"
            >
              <option value={TRADE_DIRECTION.LONG}>LONG</option>
              <option value={TRADE_DIRECTION.SHORT}>SHORT</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Entry */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Entry</label>
            <input
              type="number"
              step="0.0001"
              value={formData.entry}
              onChange={(e) => setFormData({ ...formData, entry: e.target.value })}
              placeholder="0.0000"
              className="w-full px-2 py-2 bg-slate-700 border border-slate-600 rounded text-sm text-white placeholder-slate-500"
              required
            />
          </div>

          {/* SL */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Stop Loss</label>
            <input
              type="number"
              step="0.0001"
              value={formData.sl}
              onChange={(e) => setFormData({ ...formData, sl: e.target.value })}
              placeholder="0.0000"
              className="w-full px-2 py-2 bg-slate-700 border border-slate-600 rounded text-sm text-white placeholder-slate-500"
              required
            />
          </div>

          {/* TP */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Take Profit</label>
            <input
              type="number"
              step="0.0001"
              value={formData.tp}
              onChange={(e) => setFormData({ ...formData, tp: e.target.value })}
              placeholder="0.0000"
              className="w-full px-2 py-2 bg-slate-700 border border-slate-600 rounded text-sm text-white placeholder-slate-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* RR */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Risk:Reward</label>
            <input
              type="number"
              step="0.1"
              value={formData.rr}
              onChange={(e) => setFormData({ ...formData, rr: e.target.value })}
              placeholder="1.5"
              className="w-full px-2 py-2 bg-slate-700 border border-slate-600 rounded text-sm text-white placeholder-slate-500"
            />
          </div>

          {/* Confluence */}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Confluence %</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.confluence}
              onChange={(e) => setFormData({ ...formData, confluence: e.target.value })}
              className="w-full px-2 py-2 bg-slate-700 border border-slate-600 rounded text-sm text-white"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Trade rationale, setup details..."
            rows="3"
            className="w-full px-2 py-2 bg-slate-700 border border-slate-600 rounded text-sm text-white placeholder-slate-500 resize-none"
          />
        </div>

        {/* Submit */}
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 rounded text-sm font-medium text-white transition-colors"
          >
            Open Trade
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded text-sm font-medium text-slate-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TradeForm;
