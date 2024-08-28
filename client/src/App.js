import React from 'react';
import Header from './components/Header'; // Import the Header component
import HomePage from './pages/HomePage'; // Import the HomePage component

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <HomePage /> 
      </main>
    </div>
  );
};

export default App;
