const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/text', (req, res) => {
  res.type('text').send('Hello World');
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World' });
});

// Export the app for testing
module.exports = app;

// Only start server when run directly (not in tests)
if (require.main === module) {
  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  module.exports.server = server;
}