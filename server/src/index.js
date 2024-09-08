const express = require('express');
const mongoose = require('mongoose');
const NewsArticle = require('./models/NewsArticle');
const aggregatedSentiment = require('./models/AggregatedSentiment');
const fetchNewsArticles = require('./fetchNewsArticles.js'); // Import the fetchNewsArticles function

const aggregatedSentimentRoutes = require('./routes/aggregatedSentimentRoutes');


// Load environment variables from .env file in the root directory
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const app = express();
app.use(express.json()); // To parse JSON bodies

mongoose.set('strictQuery', false); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const newsRoutes = require('./routes/newsRoutes');
const sentimentRoutes = require('./routes/sentimentRoutes');

// Use routes
app.use('/api/news', newsRoutes);
app.use('/api/sentiments', sentimentRoutes);
app.use('/api/aggregated', aggregatedSentimentRoutes);


//Call fetchNewsArticles
app.get('/api/news/:ticker', async (req, res) => {
  const ticker = req.params.ticker;
  
  try {
    const articles = await fetchNewsArticles(ticker);
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching news articles' });
  }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
