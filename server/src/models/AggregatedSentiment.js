const mongoose = require('mongoose');

const aggregatedSentimentSchema = new mongoose.Schema({
  ticker: { type: String, required: true, unique: true },  // Ensure each ticker is unique in this collection
  averageCompound: { type: Number, required: true },  // Average compound sentiment score
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NewsArticle' }]  // Array of article IDs
});

const AggregatedSentiment = mongoose.model('AggregatedSentiment', aggregatedSentimentSchema);

module.exports = AggregatedSentiment;
