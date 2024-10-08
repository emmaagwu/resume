import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
        {/* Navbar appears on all pages */}
        <Navbar />
        
        <Routes>
          {/* Define routes for different pages */}
          <Route path="/" element={<HomePage />} />
          {/* Other routes like job details can be added later */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
