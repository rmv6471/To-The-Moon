import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'; // Make sure to create a CSS file for styling

const NavigationBar = () => {
  return (
    <nav className="navigation">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/news">News</Link></li>
        <li><Link to="/trends">Trends</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
