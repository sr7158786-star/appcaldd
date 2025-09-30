import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import FoodScanner from './components/FoodScanner';
import FoodDetail from './components/FoodDetail';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/scanner" element={<FoodScanner />} />
          <Route path="/food/:id" element={<FoodDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;