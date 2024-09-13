import React from 'react';
import StockWidget from '../components/StockWidget';
import './HomePage.css'; 


const HomePage = () => {
  return (
    <div className="home-container">
      <div className="centered-content">
        <p className ="to-the-text">To The</p>
        <p className="moon-text">Moon</p>
        <p className ="description-text">Invest in your favorite</p>
        <p className = "description-text">stocks with the help</p>
        <p className = "description-text">sentiment analysis.</p>
      </div>
    </div>
  );
};


export default HomePage;
