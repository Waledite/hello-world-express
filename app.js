const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Existing route (now at /api/text)
app.get('/api/text', (req, res) => {
  res.send('Hello World');
});

// New JSON API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World' });
});

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };