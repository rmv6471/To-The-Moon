// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import Home from './pages/HomePage';
import News from './pages/NewsPage';  // Assume you have this
import Trends from './pages/TrendsPage';  // Assume you have this
import About from './pages/AboutPage';

const App = () => {
  return (
    <Router>
      <Header />
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/about" element={<About />} />
      </Routes>
      
    </Router>
  );
};

export default App;
