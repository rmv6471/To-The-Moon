const express = require('express');
const router = express.Router();
const sentimentController = require('../controllers/sentimentController');

router.get('/', sentimentController.getSentimentData);

module.exports = router;
