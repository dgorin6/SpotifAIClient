import React, {useState, createContext} from 'react';
import './App.css';
import Header from './Components/Header';
import Prompt from './Components/Prompt';
import PlaylistDisplay from './Components/PlaylistDisplay';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserContext from './Components/UserContext';
import Disclaimer from './Components/Disclaimer';
function App() {
  const [authToken, setAuthToken] = useState<string | null>(null)
  return (
    <Router>
      <div className="App">
        <UserContext.Provider value = {{authToken, setAuthToken}}>
        <Header />
        <Routes>
          <Route  path="/" element={<Prompt />} />
          <Route path="/playlist" element={<PlaylistDisplay />} />
        </Routes>
        <Disclaimer />
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
