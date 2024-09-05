const fetchNewsArticles = require('../utils/fetchNewsArticles');
const analyzeSentiment = require('../utils/sentimentAnalysis');
const NewsArticle = require('../models/NewsArticle');

exports.fetchAndAnalyzeNews = async (req, res) => {
  const { ticker } = req.params;
  try {
    const articles = await fetchNewsArticles(ticker);
    const articlesWithSentiment = articles.map(article => ({
      ...article,
      sentiment: analyzeSentiment(article.description)
    }));

    // Save the articles with sentiment
    await NewsArticle.insertMany(articlesWithSentiment);
    res.json(articlesWithSentiment);
  } catch (err) {
    console.error('Failed to fetch and analyze news:', err);
    res.status(500).json({ message: 'Failed to process news articles' });
  }
};
