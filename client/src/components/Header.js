import React from 'react';
import './Header.css'; // Make sure to create a CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>To the Moon</h1>
        <input type="text" placeholder="Search ticker, company, or profile" />
      </div>
    </header>
  );
};

export default Header;
