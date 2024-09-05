const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  ticker: { type: String, required: true },  // Stock ticker (e.g., AAPL, TSLA)
  title: { type: String, required: true },  // Title of the news article
  description: { type: String },  // Description of the news article
  url: { type: String, required: true },  // URL to the full article
  source: { type: String },  // Source of the news article (e.g., CNN, Bloomberg)
  publishedAt: { type: Date, required: true },  // Date when the article was published
  sentiment: {  // Sentiment analysis score
    compound: { type: Number },  // Overall sentiment score
    positive: { type: Number },  // Score for positive sentiment
    neutral: { type: Number },  // Score for neutral sentiment
    negative: { type: Number }  // Score for negative sentiment
  }
});

const NewsArticle = mongoose.model('NewsArticle', newsSchema);

module.exports = NewsArticle;
