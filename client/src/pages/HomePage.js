// src/pages/HomePage.js
import React from 'react';
import StockWidget from '../components/StockWidget';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <StockWidget name="Tesla Inc" ticker="TSLA" sentiment={1.24} />
      <StockWidget name="Apple Inc" ticker="AAPL" sentiment={-0.76} />
      {/* Add more widgets or other components as needed */}
    </div>
  );
};

export default HomePage;
