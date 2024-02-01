import React from 'react';
import './App.css';
import { AppBar, Toolbar, Typography } from '@mui/material';
import "./Fonts/Vollkorn/Vollkorn-Bold.ttf";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ErrorPage from './Components/ErrorPage';
import Set from './Components/Screen2';
import MatrixTree from './Components/Screen3';
import ViewSet from './Components/Screen1';
import Navbar from './Components/NavBar';

function App() {
  return (
    <div className="App">
      <Router>
      <div className="app-container">
          <AppBar
            position="sticky"
            style={{ backgroundColor: "rgb(19, 84, 161)" }}
          >
            <Toolbar variant="dense" className="header-bar header-toolbar">
                <div className="header-logo">
                  <img
                    className="SW-logo"
                    src="./sw-logo-bm.png"
                    alt="logo"
                    style={{ maxWidth: "50px" }}
                  />
                  <img
                    className="SW-logo"
                    src="./sw-logo-txt.png"
                    alt="logo-title"
                    style={{ maxWidth: "150px" }}
                  />
                </div>
              <Typography
                variant="h6"
                sx={{
                  marginLeft: "30%",
                  fontSize: "22px",
                  fontWeight: 700,
                  letterSpacing: "0.17px",
                  color: "white",
                  textDecoration: "none",
                  fontFamily: "Volkorn",
                }}
                className="header-title"
              >
                Set Builder
              </Typography>
            </Toolbar>
          </AppBar>
          {/* <MatrixTree /> */}
          <Navbar />
        </div>
        <Routes>
          <Route exact path="/" element={ <ViewSet />} />
          <Route path="/newSet" element={ <Set />} />
          <Route path="/demo" element={ <MatrixTree />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;
