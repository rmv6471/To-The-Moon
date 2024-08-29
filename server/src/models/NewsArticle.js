const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  ticker: { type: String, required: true },  // Stock ticker (e.g., AAPL, TSLA)
  title: { type: String, required: true },  // Title of the news article
  url: { type: String, required: true },  // URL to the full article
  source: { type: String },  // Source of the news article (e.g., CNN, Bloomberg)
  publishedAt: { type: Date, required: true },  // Date when the article was published
});

const NewsArticle = mongoose.model('NewsArticle', newsSchema);

module.exports = NewsArticle;
