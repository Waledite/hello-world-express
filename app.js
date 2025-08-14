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

// Export the raw app for testing
module.exports = app;

// Server start logic - only when run directly
if (require.main === module) {
  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  
  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Server closed');
    });
  });
}