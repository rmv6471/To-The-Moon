const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Import routes
const sentimentRoutes = require('./routes/sentimentRoutes');
app.use('/api/sentiment', sentimentRoutes);

module.exports = app;
