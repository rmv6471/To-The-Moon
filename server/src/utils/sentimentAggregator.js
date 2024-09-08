const NewsArticle = require('../models/NewsArticle');
const AggregatedSentiment = require('../models/AggregatedSentiment');

const updateAggregatedSentiment = async (ticker) => {
  try {
    // Aggregate sentiment scores from NewsArticle collection
    const aggregationResults = await NewsArticle.aggregate([
      { $match: { ticker, 'sentiment.compound': { $exists: true } } },
      { $group: {
          _id: '$ticker',
          averageCompound: { $avg: '$sentiment.compound' },
          articles: { $push: '$_id' }  // Collects all article IDs
      }}
    ]);

    if (aggregationResults.length > 0) {
      const { averageCompound, articles } = aggregationResults[0];

      // Update or create a document in AggregatedSentiment collection
      await AggregatedSentiment.findOneAndUpdate(
        { ticker },
        { ticker, averageCompound, articles },
        { new: true, upsert: true }  // Option to create a new doc if it doesn't exist
      );
    }

  } catch (error) {
    console.error('Error aggregating sentiment data:', error);
    throw error;  // Re-throw to handle it further up the call stack if necessary
  }
};

module.exports = updateAggregatedSentiment;
