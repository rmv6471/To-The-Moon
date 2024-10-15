import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockWidget from '../components/StockWidget';
import './HomePage.css';

const HomePage = () => {
  const [stocks, setStocks] = useState([]);
  const tickers = ['NVDA', 'AAPL', 'META', 'GOOGL', 'AMZN'];

  useEffect(() => {
    const fetchStockData = async (ticker) => {
      try {
        const response = await axios.get(`/api/aggregated/${ticker}`);
        return {
          name: response.data.name,
          ticker: ticker,
          sentiment: response.data.averageCompound,
        };
      } catch (error) {
        console.error('Error fetching data for ticker:', ticker, error);
        return { name: ticker, ticker, sentiment: 'Error' };
      }
    };

    Promise.all(tickers.map((ticker) => fetchStockData(ticker))).then(
      (results) => {
        setStocks(results);
      }
    );
  }, []);

  return (
    <div className="home-container">
      <div className="centered-content">
        <p className="to-the-text">To The</p>
        <p className="moon-text">Moon</p>
        <p className="description-text">Invest in your favorite</p>
        <p className="description-text">stocks with the help</p>
        <p className="description-text">of sentiment analysis.</p>
        
        <div className="widgets-container">
          <div className="widgets-left">
            {stocks.slice(0, 2).map((stock) => (
              <StockWidget
                key={stock.ticker}
                name={stock.name}
                ticker={stock.ticker}
                sentiment={stock.sentiment}
              />
            ))}
          </div>
          <div className="widgets-right">
            {stocks.slice(2, 4).map((stock) => (
              <StockWidget
                key={stock.ticker}
                name={stock.name}
                ticker={stock.ticker}
                sentiment={stock.sentiment}
              />
            ))}
          </div>
        </div>

        <div className="widgets-fifth">
          {stocks[4] && (
            <StockWidget
              key={stocks[4].ticker}
              name={stocks[4].name}
              ticker={stocks[4].ticker}
              sentiment={stocks[4].sentiment}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
