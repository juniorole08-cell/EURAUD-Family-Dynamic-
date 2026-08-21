# EUR/AUD Family Dynamic Terminal

**Live trading terminal for EUR/AUD currency pair analysis with family dynamic concepts (Parent-Child relationship modeling).**

> **Demo Mode** | No real API connections | Mock data feeds | LocalStorage persistence

---

## 🎯 Features

### 📊 Live Market Data
- **Real-time price feeds** for EUR/USD, AUD/USD, EUR/AUD
- **30-second auto-refresh** with manual refresh button
- **Price change indicators** (percentage & direction)
- **Offline fallback** with cached data

### 👨‍👩‍👧 Parent-Child Bias Analysis
- **EUR/USD** (Parent) vs **AUD/USD** (Child)
- **Bias calculation**: Ultra Bullish → Bullish → Neutral → Bearish → Ultra Bearish
- **Influence weighting**: Shows % contribution of each parent currency
- **Real-time updates** as market moves

### 📰 News & Economic Calendar
- **6 live news items** (Forex Factory, Investing.com, Trading Economics)
- **Impact levels**: High, Medium, Low
- **Upcoming economic events** with forecasts
- **Sentiment analysis** for EUR/AUD impact

### 📈 COT Report Analysis
- **EUR & AUD futures positioning**
- **Commercial vs Non-Commercial split**
- **Net positioning indicator**
- **Weekly data simulation**

### 📓 Trade Journal
- **Create/manage trades** with entry, SL, TP
- **Close trades** and track P&L in pips
- **Trade statistics**: Win rate, average pips, profit factor
- **Persistent storage** via localStorage

### 📊 Advanced Analytics
- **Win/Loss breakdown**
- **Risk:Reward tracking**
- **Confluence level scoring**
- **Performance trends**

### 🎨 UI/UX
- **Mobile-first responsive design**
- **Dark mode (toggle stored)**
- **Real-time market snapshots**
- **Smooth animations & transitions**

---

## 🚀 Quick Start

### Installation
```bash
git clone https://github.com/juniorole08-cell/EURAUD-Family-Dynamic-.git
cd EURAUD-Family-Dynamic-
npm install
```

### Development
```bash
npm start
# Opens http://localhost:3000
```

### Production Build
```bash
npm run build
# Creates optimized build in ./build/
```

---

## 🌐 Netlify Deployment

### Auto-Deploy from GitHub
1. Connect repo to Netlify
2. Netlify auto-detects `netlify.toml`
3. Build command: `npm run build`
4. Publish directory: `build/`
5. Environment: Demo mode (no API keys needed)

### Manual Deploy
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=build
```

### Environment Variables (Netlify)
- `REACT_APP_API_MODE=demo` (no API calls)
- `REACT_APP_MAX_NEWS_ITEMS=6`
- `REACT_APP_REFRESH_INTERVAL=30000`
- `NODE_ENV=production`

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ThemeToggle.jsx
│   ├── PriceDisplay.jsx
│   ├── BiasIndicator.jsx
│   ├── NewsCard.jsx
│   ├── TradeCard.jsx
│   ├── EconomicCalendar.jsx
│   ├── COTIndicator.jsx
│   └── TradeForm.jsx
├── pages/              # Page containers
│   ├── Dashboard.jsx   # Market overview
│   ├── TradeJournal.jsx # Trade management
│   └── Analytics.jsx   # Performance stats
├── services/           # Business logic
│   ├── storageService.js    # LocalStorage
│   ├── authService.js       # Demo auth
│   └── dataFeedService.js   # Mock data
├── hooks/              # Custom React hooks
│   ├── useDataFeeds.js      # Data polling
│   ├── useTradeJournal.js   # Trade CRUD
│   ├── useBiasAnalysis.js   # Bias calculation
│   └── useTheme.js          # Theme management
├── constants/          # Config & constants
│   └── config.js
├── App.jsx            # Main app component
└── index.js           # React entry point
```

---

## 🔐 Authentication

**Demo Mode Only:**
- Auto-login with ID: `6USA1PPUFT39AYBF`
- Session persists via localStorage
- Logout clears all trade data

For production, integrate with:
- Firebase Auth
- Supabase
- Auth0
- Custom backend

---

## 💾 Data Persistence

**LocalStorage Keys:**
- `euraud_trades` — Trade journal entries
- `euraud_theme` — Dark/Light mode preference
- `euraud_user_prefs` — User settings
- `euraud_cached_news` — Latest news snapshot
- `euraud_cached_cot` — Latest COT data
- `euraud_current_user` — Session info

**Note:** Data clears on localStorage clear. For permanent storage, migrate to:
- IndexedDB
- Firebase Firestore
- Backend database

---

## 📊 Live Data Feeds (Mock)

### Refresh Interval
- Default: **30 seconds**
- Configurable via `.env`: `REACT_APP_REFRESH_INTERVAL=30000`

### Data Sources (Demo)
- Prices: Random walk simulation
- News: Curated headlines from 5 sources
- COT: Weekly positioning simulation
- Calendar: 5 upcoming economic events

**To integrate real APIs:**
1. Replace `dataFeedService.js` with actual API calls
2. Add API keys to `.env`
3. Implement error handling & rate limiting
4. Add data validation & caching

---

## 🎨 Customization

### Colors & Theme
Edit `tailwind.config.js` for custom color schemes.

### Max News Items
Edit `.env`: `REACT_APP_MAX_NEWS_ITEMS=6` (default: 6)

### Refresh Rate
Edit `.env`: `REACT_APP_REFRESH_INTERVAL=30000` (milliseconds)

### Trade Pairs
Edit `src/constants/config.js` to add more currency pairs.

---

## 🧪 Testing

```bash
npm test
# Runs Jest tests
```

### Manual Testing Checklist
- [ ] Login/Logout flow
- [ ] Data refresh every 30s
- [ ] Create/edit/delete trades
- [ ] Close trades and track P&L
- [ ] Win rate & analytics update
- [ ] Theme toggle persists
- [ ] Offline mode (disable network)
- [ ] Mobile responsiveness

---

## 🐛 Troubleshooting

### Build fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Data not persisting
- Check browser localStorage is enabled
- Check console for quota exceeded errors
- Clear cache & retry

### Netlify deployment fails
- Check `netlify.toml` is in root
- Verify `build` script in `package.json`
- Check build logs in Netlify dashboard

---

## 📝 License

MIT — Free for personal & commercial use

---

## 🤝 Contributing

Fork → Create feature branch → Submit PR

---

## 📧 Support

For issues, open a GitHub issue or contact: juniorole08@gmail.com

---

**Built with React + Tailwind + Lucide Icons**
