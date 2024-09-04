const vader = require('vader-sentiment');

const analyzeSentiment = (text) => {
  const result = vader.SentimentIntensityAnalyzer.polarity_scores(text);
  return result;
};

module.exports = analyzeSentiment;