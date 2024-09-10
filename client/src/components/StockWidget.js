import React from 'react';
import './StockWidget.css';
import { Link } from 'react-router-dom';  // Import Link

const StockWidget = ({ name, ticker, sentiment }) => {
  return (
    <div className="stock-widget">
      <h2>{name} ({ticker})</h2>
      <p>Sentiment Score: {sentiment}</p>
      <Link to={`/news/${ticker}`}>View News</Link>  {/* Dynamic link based on ticker */}
    </div>
  );
};

export default StockWidget;
