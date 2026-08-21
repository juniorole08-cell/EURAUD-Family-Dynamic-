# EUR/AUD Family Dynamic Terminal

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/juniorole08-cell/EURAUD-Family-Dynamic-.git
   cd EURAUD-Family-Dynamic-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   Opens http://localhost:3000 automatically.

### Environment Variables

Create `.env.local` (copy from `.env.example`):
```env
REACT_APP_API_MODE=demo
REACT_APP_MAX_NEWS_ITEMS=6
REACT_APP_REFRESH_INTERVAL=30000
REACT_APP_DEMO_USER_ID=user_demo_6USA1PPUFT39AYBF
```

---

## Development Workflow

### Available Scripts

#### `npm start`
Runs the app in development mode. Auto-reloads on changes.

#### `npm run build`
Builds the app for production in the `build/` folder.

#### `npm test`
Runs tests in watch mode.

#### `npm run eject`
⚠️ **One-way operation** — Exposes Webpack config. Don't use unless necessary.

---

## Netlify Deployment

### Option 1: GitHub Integration (Recommended)

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your GitHub repo
5. Netlify auto-detects `netlify.toml`
6. Deploy on push! ✅

### Option 2: CLI Deploy

```bash
npm run build
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

### Build Settings (Netlify Dashboard)
- **Build command:** `npm run build`
- **Publish directory:** `build`
- **Environment variables:** (none required for demo)

---

## Project Architecture

### Services Layer
- **storageService.js** — LocalStorage CRUD for trades, theme, prefs
- **authService.js** — Demo authentication (single user)
- **dataFeedService.js** — Mock live data feeds (prices, news, COT, calendar)

### Hooks Layer
- **useDataFeeds** — Polling & caching live market data
- **useTradeJournal** — Trade CRUD operations
- **useBiasAnalysis** — Parent/Child currency bias calculations
- **useTheme** — Dark/Light mode persistence

### Components Layer
- **ThemeToggle** — Dark/Light mode button
- **PriceDisplay** — Live price ticker
- **BiasIndicator** — EUR/AUD bias gauge with influence bars
- **NewsCard** — News feed with impact levels
- **TradeCard** — Individual trade display/management
- **EconomicCalendar** — Upcoming economic events
- **COTIndicator** — Commitments of Traders positioning
- **TradeForm** — New trade entry form

### Pages Layer
- **Dashboard** — Market overview (prices, bias, news, calendar, COT)
- **TradeJournal** — Trade management & statistics
- **Analytics** — Performance breakdown & metrics

---

## Key Features Explained

### Parent-Child Bias System
EUR/AUD is decomposed into:
- **Parent:** EUR/USD (strong currency)
- **Child:** AUD/USD (weak currency)

Bias is calculated from the difference in their movements:
```
EUR/AUD Bias = EUR/USD movement - AUD/USD movement
```

Influence shows which parent contributes more to the pair's movement.

### Live Data Polling
Every 30 seconds (configurable), the app:
1. Fetches prices, news, COT, calendar
2. Caches to localStorage
3. Updates React state
4. Triggers UI re-render

### Trade Persistence
All trades saved to localStorage:
- Survives page refresh
- Lost on browser cache clear
- Include entry, SL, TP, bias, confluence, notes

---

## Extending the App

### Adding a New Feature

1. **Create a service** in `src/services/`
2. **Create a hook** in `src/hooks/` (if complex logic)
3. **Create components** in `src/components/`
4. **Wire into page** (Dashboard, TradeJournal, Analytics)
5. **Update constants** if needed

### Integrating Real APIs

Replace `dataFeedService.js` with actual API calls:

```javascript
// Example: Fetch from Quandl
export const fetchPrices = async () => {
  const res = await axios.get('https://data.nasdaq.com/api/v3/datasets/FRED/...');
  return res.data;
};
```

Add API keys to `.env`:
```env
REACT_APP_QUANDL_API_KEY=your_key_here
```

---

## Performance Tips

- **Memoize components** to prevent unnecessary re-renders
- **Lazy load pages** using React.lazy()
- **Compress images** before adding
- **Use Lighthouse** to audit performance

---

## Common Issues

### "Dependency not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Port 3000 already in use"
```bash
npm start -- --port 3001
```

### "Build fails on Netlify"
Check:
- `netlify.toml` exists in root
- `package.json` has valid `build` script
- Node version on Netlify matches local (18+)

---

## Resources

- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [Netlify Docs](https://docs.netlify.com)

---

**Happy trading! 📈**
