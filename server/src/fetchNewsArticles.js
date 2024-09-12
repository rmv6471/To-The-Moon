const axios = require('axios');
const analyzeSentiment = require('./utils/sentimentAnalysis'); 
const AggregatedSentiment = require('./models/AggregatedSentiment');

async function updateAggregatedSentiment(ticker) {
  const articles = await NewsArticle.find({ ticker });
  const averageCompound = articles.reduce((acc, article) => acc + (article.sentiment.compound || 0), 0) / articles.length;

  let aggregated = await AggregatedSentiment.findOne({ ticker });
  if (!aggregated) {
    aggregated = new AggregatedSentiment({ ticker, averageCompound, articles: articles.map(article => article._id) });
  } else {
    aggregated.averageCompound = averageCompound;
    aggregated.articles = articles.map(article => article._id);
  }

  await aggregated.save();
}



const fetchNewsArticles = async (ticker) => {
  const apiKey = process.env.NEWS_API_KEY;
  const date = new Date();
  const fromDate = new Date(date.getTime() - 48 * 60 * 60 * 1000).toISOString(); //Obtains stock information from past 48 horus
  const url = `https://newsapi.org/v2/everything?q=${ticker}&from=${fromDate}&sortBy=publishedAt&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const articlesWithSentiment = await Promise.all(response.data.articles.map(async article => {
      const sentiment = analyzeSentiment(article.description);
      return {
        title: article.title,
        url: article.url,
        source: article.source.name,
        publishedAt: article.publishedAt,
        description: article.description,
        sentiment  
      };
    }));
    return articlesWithSentiment;
  } catch (err) {
    console.error('Error fetching news from NewsAPI:', err.response ? err.response.data : err.message);
    throw err;
  }
};

module.exports = fetchNewsArticles;
