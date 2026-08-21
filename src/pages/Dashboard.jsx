import React from 'react';
import { Activity, TrendingUp, BarChart3 } from 'lucide-react';
import {
  PriceDisplay,
  BiasIndicator,
  NewsCard,
  EconomicCalendar,
  COTIndicator,
} from '../components';

const Dashboard = ({
  prices,
  news,
  cot,
  calendar,
  loading,
  lastSync,
  childBias,
  influence,
}) => {
  return (
    <div className="space-y-8">
      {/* Key Metrics Row */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Activity size={20} /> Live Market Snapshot
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PriceDisplay
            pair="EUR/USD"
            price={prices.eurUsd.price}
            changePct={prices.eurUsd.changePct}
            loading={loading}
          />
          <PriceDisplay
            pair="AUD/USD"
            price={prices.audUsd.price}
            changePct={prices.audUsd.changePct}
            loading={loading}
          />
          <BiasIndicator bias={childBias} influence={influence} loading={loading} />
        </div>
      </section>

      {/* News & Calendar Row */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp size={20} /> Market Events
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* News */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-3">News Feed</h3>
            <NewsCard news={news} loading={loading} onRefresh={() => {}} />
          </div>

          {/* Economic Calendar */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Economic Calendar</h3>
            <EconomicCalendar events={calendar} loading={loading} />
          </div>
        </div>
      </section>

      {/* COT & Analytics */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <BarChart3 size={20} /> Market Positioning
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <COTIndicator cot={cot} loading={loading} />
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Trading Setup</h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-slate-400">Current Bias</div>
                <div className={`mt-1 text-lg font-bold ${childBias.color.split(' ')[0]}`}>
                  {childBias.label}
                </div>
              </div>
              <div className="border-t border-slate-700 pt-3">
                <div className="text-slate-400">Confluence Level</div>
                <div className="mt-1 text-lg font-bold text-emerald-400">
                  {influence.dadPct > 60 || influence.momPct > 60 ? 'HIGH' : 'MODERATE'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
