const express = require('express');
const mongoose = require('mongoose');
const NewsArticle = require('./models/NewsArticle'); // Assuming your model files are in a 'models' folder inside 'src'
const Sentiment = require('./models/Sentiment'); // Assuming your model files are in a 'models' folder inside 'src'
require('dotenv').config();

const app = express();
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes

// Fetch news articles by stock ticker
app.get('/api/news/:ticker', async (req, res) => {
  try {
    const { ticker } = req.params;
    const articles = await NewsArticle.find({ ticker });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching news articles' });
  }
});

// Save sentiment data
app.post('/api/sentiments', async (req, res) => {
  try {
    const sentiment = new Sentiment(req.body);
    await sentiment.save();
    res.json(sentiment);
  } catch (err) {
    res.status(500).json({ error: 'Error saving sentiment data' });
  }
});

// Retrieve sentiment data by stock ticker
app.get('/api/sentiments/:ticker', async (req, res) => {
  try {
    const { ticker } = req.params;
    const sentiment = await Sentiment.find({ ticker });
    res.json(sentiment);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching sentiment data' });
  }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
