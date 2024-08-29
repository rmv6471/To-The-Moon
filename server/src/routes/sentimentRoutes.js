const express = require('express');
const router = express.Router();
const Sentiment = require('../models/Sentiment'); // Adjust the path if necessary

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

module.exports = router;
