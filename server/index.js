// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const tradeRouter = require('./routes/trade');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simple header auth for frontend -> backend
app.use((req, res, next) => {
  if (req.path.startsWith('/trade')) {
    const key = req.headers['x-api-key'] || req.query.api_key;
    if (!key || key !== process.env.APP_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }
  next();
});

app.use('/trade', tradeRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Trade server running on port ${PORT}`));
