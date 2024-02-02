import React from 'react';
import './App.css';
import { AppBar, Toolbar, Typography } from '@mui/material';
import "./Fonts/Vollkorn/Vollkorn-Bold.ttf";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ErrorPage from './Components/ErrorPage';
import HomePage from './Components/HomePage';
 
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={ <HomePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        </Router>
    </div>
  );
}
 
export default App;