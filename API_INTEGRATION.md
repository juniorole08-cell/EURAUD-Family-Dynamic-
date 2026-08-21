# EUR/AUD Family Dynamic - API Integration Guide

## Current Status: Demo Mode

The app currently runs in **demo mode** with simulated data. No external APIs are connected.

---

## Mock Data Services

### Data Feed Service
**File:** `src/services/dataFeedService.js`

Generates:
- **Prices:** Random walk simulation for EUR/USD, AUD/USD
- **News:** 6 headlines from curated forex sources
- **COT:** Weekly Commitments of Traders positioning
- **Calendar:** 5 upcoming economic events

**Refresh Interval:** 30 seconds (configurable via `.env`)

---

## Integration Roadmap

### Phase 1: Real Price Data (Priority: HIGH)

**Options:**
1. **Polygon.io** (Recommended)
   - Free tier: 5 requests/min
   - Covers forex, stocks, crypto
   - API: `/v1/ticker/C:EURUSD`
   - Documentation: https://polygon.io/docs/forex/get_ticker

2. **Alpha Vantage**
   - Free tier: 5 requests/min, 500/day
   - Forex data included
   - API: `query?function=FX_INTRADAY&from_symbol=EUR`
   - Documentation: https://www.alphavantage.co/documentation/

3. **Twelve Data**
   - Free tier: 800 API calls/day
   - Real-time forex & crypto
   - API: `/quote?symbol=EUR/USD`
   - Documentation: https://twelvedata.com/docs

**Implementation:**
```javascript
// Replace dataFeedService.fetchPrices()
export const fetchPrices = async () => {
  const apiKey = process.env.REACT_APP_POLYGON_KEY;
  const eurusd = await axios.get(
    `https://api.polygon.io/v1/ticker/C:EURUSD/quote`,
    { params: { apikey: apiKey } }
  );
  const audusd = await axios.get(
    `https://api.polygon.io/v1/ticker/C:AUDUSD/quote`,
    { params: { apikey: apiKey } }
  );
  return { eurusd: eurusd.data, audusd: audusd.data };
};
```

---

### Phase 2: News & Events (Priority: MEDIUM)

**Options:**
1. **Forex Factory Calendar**
   - Free scraping (check terms)
   - or: Use unofficial API
   - Coverage: All major economic events

2. **Trading Economics API**
   - Paid tier: $99/month
   - Free tier: Limited
   - Includes calendar + forecasts
   - Documentation: https://tradingeconomics.com/api/

3. **NewsAPI.org**
   - Free tier: 100 requests/day
   - Filter by keyword ("forex", "EUR", "AUD")
   - API: `/v2/everything?q=EUR+AUD&sortBy=publishedAt`
   - Documentation: https://newsapi.org/docs

**Implementation:**
```javascript
export const fetchNews = async (query = 'EUR AUD forex') => {
  const apiKey = process.env.REACT_APP_NEWSAPI_KEY;
  const response = await axios.get(
    `https://newsapi.org/v2/everything`,
    { params: { q: query, sortBy: 'publishedAt', apiKey } }
  );
  return response.data.articles;
};
```

---

### Phase 3: COT Reports (Priority: MEDIUM)

**Options:**
1. **CFTC Data (Official)**
   - Free public data
   - Published weekly
   - Manual JSON upload or parser
   - Source: https://www.cftc.gov/MarketReports/CommitmentsofTraders/

2. **Quandl / Nasdaq Data Link**
   - Free tier: 300 API calls/day
   - Pre-formatted COT data
   - API: `/api/v3/datasets/CFTC/GC_F_ALL_...`
   - Documentation: https://data.nasdaq.com/

**Implementation:**
```javascript
export const fetchCOTReport = async () => {
  const apiKey = process.env.REACT_APP_QUANDL_KEY;
  const response = await axios.get(
    `https://data.nasdaq.com/api/v3/datasets/CFTC/GC_F_ALL_FUT_VAL.json`,
    { params: { apikey: apiKey } }
  );
  return response.data.dataset;
};
```

---

### Phase 4: Real-Time WebSocket (Priority: LOW)

**Options:**
1. **Polygon.io Streams**
   - WebSocket connection
   - Real-time price updates
   - Implementation: Socket.io wrapper

2. **Twelve Data WebSocket**
   - Low latency
   - Forex + crypto
   - Documentation: https://twelvedata.com/docs/websocket

**Implementation:**
```javascript
const socket = io('wss://stream.twelve.data.com/v1', {
  reconnection: true,
});

socket.on('connect', () => {
  socket.emit('subscribe', { instrument_key: 'EUR/USD' });
});

socket.on('price', (data) => {
  setPrice(data.price);
});
```

---

## Setup Instructions

### 1. Choose Your API Provider
Recommendation: **Polygon.io** (best free tier)

### 2. Get API Key
- Go to provider's website
- Sign up for free tier
- Copy API key

### 3. Add to `.env.local`
```env
REACT_APP_POLYGON_KEY=your_api_key_here
REACT_APP_NEWSAPI_KEY=your_api_key_here
REACT_APP_QUANDL_KEY=your_api_key_here
```

### 4. Update Service
Replace mock functions in `dataFeedService.js`

### 5. Add Error Handling
```javascript
try {
  const data = await fetchFromAPI();
  return data;
} catch (error) {
  console.error('API Error:', error);
  // Fallback to cached data
  return storageService.getCachedNews();
}
```

### 6. Test Locally
```bash
npm start
# Check console for API calls
```

---

## Rate Limiting Best Practices

```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.example.com',
});

// Retry on rate limit
apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 429) {
      // Wait 60 seconds, retry
      await new Promise(resolve => setTimeout(resolve, 60000));
      return apiClient.request(error.config);
    }
    return Promise.reject(error);
  }
);
```

---

## Caching Strategy

```javascript
const cache = {
  prices: { data: null, timestamp: 0 },
  news: { data: null, timestamp: 0 },
};

const CACHE_TTL = 30000; // 30 seconds

export const getCachedData = (key) => {
  const now = Date.now();
  if (cache[key].timestamp + CACHE_TTL > now) {
    return cache[key].data; // Use cache
  }
  return null; // Fetch fresh data
};
```

---

## Monitoring & Analytics

**Track API performance:**
```javascript
const trackAPICall = (endpoint, duration, success) => {
  console.log(`${endpoint}: ${duration}ms (${success ? 'OK' : 'FAIL')}`);
  // Send to analytics service (Sentry, LogRocket, etc.)
};
```

---

## Deployment Considerations

### Environment Variables on Netlify
1. Go to Netlify dashboard → Site settings
2. Build & deploy → Environment
3. Add:
   ```
   REACT_APP_POLYGON_KEY = your_key
   REACT_APP_NEWSAPI_KEY = your_key
   ```
4. Redeploy site

### CORS Issues
If API doesn't support CORS:
- Use CORS proxy: `https://cors-anywhere.herokuapp.com/`
- or set up backend proxy
- or request CORS access from API provider

---

## Resources

- **Polygon.io:** https://polygon.io
- **Alpha Vantage:** https://www.alphavantage.co
- **Twelve Data:** https://twelvedata.com
- **NewsAPI:** https://newsapi.org
- **CFTC Data:** https://www.cftc.gov/MarketReports/CommitmentsofTraders/
- **Quandl:** https://data.nasdaq.com

---

**Questions?** Open an issue or contact: juniorole08@gmail.com
