const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Serve static frontend
app.use(express.static(path.join(__dirname, '..', 'public')));

// API endpoints
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from nodeapp' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.post('/api/echo', (req, res) => {
  res.json({ received: req.body, timestamp: Date.now() });
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`nodeapp listening on http://localhost:${port}`);
});
