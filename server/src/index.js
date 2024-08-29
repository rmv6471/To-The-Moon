const express = require('express');
const mongoose = require('mongoose');
const NewsArticle = require('./models/NewsArticle');
const Sentiment = require('./models/Sentiment');
const fetchNewsArticles = require('./fetchNewsArticles.js'); // Import the fetchNewsArticles function
require('dotenv').config();

const app = express();
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Import routes
const newsRoutes = require('./routes/newsRoutes');
const sentimentRoutes = require('./routes/sentimentRoutes');

// Use routes
app.use('/api/news', newsRoutes);
app.use('/api/sentiments', sentimentRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
