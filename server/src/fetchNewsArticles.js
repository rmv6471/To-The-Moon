const axios = require('axios');

const fetchNewsArticles = async (ticker) => {
  const apiKey = process.env.NEWS_API_KEY;
  const url = `https://newsapi.org/v2/everything?q=${ticker}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    return response.data.articles.map(article => ({
      title: article.title,
      url: article.url,
      source: article.source.name,
      publishedAt: article.publishedAt,
      description: article.description 
    }));
  } catch (err) {
    console.error('Error fetching news from NewsAPI:', err);
    throw err;
  }
};

module.exports = fetchNewsArticles;
