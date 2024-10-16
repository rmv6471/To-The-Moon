// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import Home from './pages/HomePage';
import News from './pages/NewsPage';  
import Trends from './pages/TrendsPage';  
import About from './pages/AboutPage';
import SentimentScore from './components/SentimentScore';  
import StockDetail from './pages/StockDetails';

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
        <Route path="/sentiment/:ticker" element={<SentimentScore />} />
        <Route path="/stock/:ticker" element={<StockDetail />} />
      </Routes>
      
    </Router>
  );
};

export default App;
