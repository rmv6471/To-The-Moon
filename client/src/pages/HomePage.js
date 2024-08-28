import React, { useState } from 'react';
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container">
      <header className="search-header">
        <input
          type="text"
          placeholder="Search for stocks... 📊📊📊"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </header>
      <section className="top-section">
        <h2>Top 5 Positive Sentiment Stocks 📈 📈 📈</h2>
        <div id = "positive-list" className="stock-list">
          {/* Placeholder for top stocks */}
          <div className="stock-item">Stock 1: Sentiment Score</div>
          <div className="stock-item">Stock 2: Sentiment Score</div>
          <div className="stock-item">Stock 3: Sentiment Score</div>
          <div className="stock-item">Stock 4: Sentiment Score</div>
          <div className="stock-item">Stock 5: Sentiment Score</div>
        </div>
      </section>
      <section className="bottom-section">
        <h2>Bottom 5 Negative Sentiment Stocks 📉 📉 📉</h2>
        <div id = "negative-list" className="stock-list">
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
