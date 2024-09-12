import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SentimentScore = ({ ticker }) => {
  const [sentiment, setSentiment] = useState(null);

  useEffect(() => {
    axios.get(`/api/aggregated/${ticker}`)
      .then(response => {
        setSentiment(response.data);
      })
      .catch(error => {
        console.error('Error fetching sentiment:', error);
      });
  }, [ticker]);  // Dependency array with ticker ensures the effect runs when ticker changes

  return (
    <div>
      <h1>Sentiment Score for {ticker}</h1>
      {sentiment ? (
        <div>
          <p>Compound Score: {sentiment.averageCompound.toFixed(2)}</p>
          <p>Associated Articles: {sentiment.articles.length}</p>
        </div>
      ) : (
        <p>No sentiment data available.</p>
      )}
    </div>
  );
};

export default SentimentScore;
