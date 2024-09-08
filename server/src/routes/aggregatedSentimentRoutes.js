const express = require('express');
const router = express.Router();
const AggregatedSentiment = require('../models/AggregatedSentiment');  // Add this line
const updateAggregatedSentiment = require('../utils/sentimentAggregator'); // Verify correct path

// POST route to trigger sentiment aggregation manually
router.post('/aggregate/:ticker', async (req, res) => {
  try {
    const ticker = req.params.ticker;
    await updateAggregatedSentiment(ticker);
    res.status(200).json({ message: `Aggregated sentiment updated for ${ticker}` });
  } catch (err) {
    res.status(500).json({ message: 'Failed to aggregate sentiment', error: err.message });
  }
});

// GET route to fetch aggregated sentiment data
router.get('/:ticker', async (req, res) => {
  try {
    const ticker = req.params.ticker;
    const aggregatedData = await AggregatedSentiment.findOne({ ticker });
    if (aggregatedData) {
      res.status(200).json(aggregatedData);
    } else {
      res.status(404).json({ message: 'No aggregated data found for this ticker' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving aggregated sentiment', error: err.message });
  }
});

module.exports = router;
