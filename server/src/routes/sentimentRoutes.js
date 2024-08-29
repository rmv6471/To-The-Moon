const express = require('express');
const router = express.Router();
const Sentiment = require('../models/Sentiment');

// POST endpoint to create a new sentiment
router.post('/', async (req, res) => {
  try {
    const newSentiment = new Sentiment(req.body);
    const savedSentiment = await newSentiment.save();
    res.status(201).json(savedSentiment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET endpoint to fetch sentiment data by ticker
router.get('/:ticker', async (req, res) => {
  try {
    const { ticker } = req.params;
    const sentiment = await Sentiment.find({ ticker });
    res.json(sentiment);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching sentiment data' });
  }
});

module.exports = router;
