const mongoose = require('mongoose');

const sentimentSchema = new mongoose.Schema({
  ticker: { type: String, required: true },  // Stock ticker (e.g., AAPL, TSLA)
  sentimentScore: { type: Number, required: true },  // Sentiment score (e.g., -1 to 1)
  date: { type: Date, default: Date.now },  // Date when the sentiment was calculated
  newsArticles: [{  // Array of related news articles
    title: String,
    url: String,
    source: String
  }]
});

const Sentiment = mongoose.model('Sentiment', sentimentSchema);

module.exports = Sentiment;
