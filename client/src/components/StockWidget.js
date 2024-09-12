import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StockWidget.css';
import { Link } from 'react-router-dom';

const StockWidget = ({ name, ticker }) => {
  const [sentiment, setSentiment] = useState(null);

  useEffect(() => {
    // Fetch the sentiment score when the component mounts or when the ticker changes
    axios.get(`/api/aggregated/${ticker}`)
      .then(response => {
        if (response.data && response.data.averageCompound) {
          setSentiment(response.data.averageCompound.toFixed(2));  // Format the sentiment score
        } else {
          setSentiment('N/A');  // Set to 'N/A' if there's no sentiment data
        }
      })
      .catch(error => {
        console.error('Error fetching sentiment data:', error);
        setSentiment('Error');  // Set sentiment to 'Error' on API call failure
      });
  }, [ticker]);

  return (
    <div className="stock-widget">
      <h2>{name} ({ticker})</h2>
      <p>Sentiment Score: {sentiment ?? 'Loading...'}</p>
      <Link to={`/news/${ticker}`}>View News</Link>
    </div>
  );
};

export default StockWidget;
