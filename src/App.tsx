import React from 'react';
import './App.css';
import Header from './Components/Header';
import Prompt from './Components/Prompt';
import PlaylistDisplay from './Components/PlaylistDisplay';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route  path="/" element={<Prompt />} />
          <Route path="/playlist" element={<PlaylistDisplay />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
