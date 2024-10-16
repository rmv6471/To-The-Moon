import React, { useState } from 'react';
import './Header.css';
import stocks from '../stocksData.js';

const Header = () => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value.length > 1) {
      const filteredSuggestions = stocks.filter(stock =>
        stock.ticker.toLowerCase().includes(value.toLowerCase()) ||
        stock.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (ticker) => {
    setInput('');
    setSuggestions([]);
    history.push(`/stock/${ticker}`); // Navigate to the stock detail page
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>To the Moon</h1>
        <input
          type="text"
          placeholder="Search ticker, company, or profile"
          value={input}
          onChange={handleChange}
        />
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((stock) => (
              <li key={stock.ticker} onClick={() => handleSelectSuggestion(stock.ticker)}>
                {stock.name} ({stock.ticker})
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
