import React from 'react';
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
  return (
    <div className="container">
      <section className="top-section">
        <h2>Top 5 Stocks of the Day (Based on sentiment analysis)</h2>
        <div className="stock-list">
          {/* Placeholder for top stocks */}
          <div className="stock-item">Stock 1: Sentiment Score</div>
          <div className="stock-item">Stock 2: Sentiment Score</div>
          <div className="stock-item">Stock 3: Sentiment Score</div>
          <div className="stock-item">Stock 4: Sentiment Score</div>
          <div className="stock-item">Stock 5: Sentiment Score</div>
        </div>
      </section>
      <section className="bottom-section">
        <h2>Bottom 5 Stocks of the Day (Based on sentiment analysis)</h2>
        <div className="stock-list">
          {/* Placeholder for bottom stocks */}
          <div className="stock-item">Stock 1: Sentiment Score</div>
          <div className="stock-item">Stock 2: Sentiment Score</div>
          <div className="stock-item">Stock 3: Sentiment Score</div>
          <div className="stock-item">Stock 4: Sentiment Score</div>
          <div className="stock-item">Stock 5: Sentiment Score</div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
