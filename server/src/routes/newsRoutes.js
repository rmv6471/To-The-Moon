const express = require('express');
const router = express.Router();
const NewsArticle = require('../models/NewsArticle');
const fetchNewsArticles = require('../fetchNewsArticles'); // Import the fetchNewsArticles function

// POST endpoint to create a new news article
router.post('/', async (req, res) => {
  try {
    const newsArticle = new NewsArticle(req.body);
    const savedArticle = await newsArticle.save();
    res.status(201).json(savedArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET endpoint to fetch and store news articles by ticker
router.get('/:ticker', async (req, res) => {
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
            description: article.description, 
            url: article.url,
            source: article.source,
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

module.exports = router;
