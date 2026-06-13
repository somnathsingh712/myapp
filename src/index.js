const express = require('express');
const path = require('path');
const client = require('prom-client');
const app = express();

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const register = client.register;

client.collectDefaultMetrics({ register });

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

app.get('/metrics', async (req, res) => {
  const metrics = await register.metrics();
  res.set('Content-Type', register.contentType);
  res.send(metrics);
});

// Health check for Kubernetes
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
