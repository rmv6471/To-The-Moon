const express = require('express');
const mongoose = require('mongoose');
const NewsArticle = require('./models/NewsArticle');
const Sentiment = require('./models/Sentiment');
const fetchNewsArticles = require('./fetchNewsArticles'); // Import the fetchNewsArticles function
require('dotenv').config();

const app = express();
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes

// Fetch and store news articles by stock ticker
app.get('/api/news/:ticker', async (req, res) => {
  try {
    const { ticker } = req.params;

    // Check if articles exist in the database
    let articles = await NewsArticle.find({ ticker });

    if (articles.length === 0) {
      // If no articles found, fetch from NewsAPI
      articles = await fetchNewsArticles(ticker);

      // Store the fetched articles in MongoDB
      const savedArticles = await Promise.all(
        articles.map(article => {
          const newsArticle = new NewsArticle({
            ticker,
            title: article.title,
            url: article.url,
            source: article.source.name,
            publishedAt: article.publishedAt,
          });
          return newsArticle.save();
        })
      );

      return res.json(savedArticles);
    }

    // Return the articles from the database
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching and storing news articles' });
  }
});

// Save sentiment data
app.post('/api/sentiments', async (req, res) => {
  try {
    const sentiment = new Sentiment(req.body);
    await sentiment.save();
    res.json(sentiment);
  } catch (err) {
    res.status(500).json({ error: 'Error saving sentiment data' });
  }
});

// Retrieve sentiment data by stock ticker
app.get('/api/sentiments/:ticker', async (req, res) => {
  try {
    const { ticker } = req.params;
    const sentiment = await Sentiment.find({ ticker });
    res.json(sentiment);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching sentiment data' });
  }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
