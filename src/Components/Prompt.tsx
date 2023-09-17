import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
const Prompt = () => {
  const nav = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {authToken, setAuthToken} = useContext(UserContext);
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUri = process.env.NODE_ENV !== "development" ? "https://spotifai.net" : "http://localhost:3001";
  console.log(process.env.NODE_ENV);
  const scopes = 'playlist-modify-public playlist-modify-private';
  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scopes)}&response_type=token`;
  useEffect(() => {
    if (authToken) {
      setIsAuthenticated(true)
    } else {
      localStorage.clear();
      const params = new URLSearchParams(window.location.hash.substring(1));
      const token = params.get('access_token');

      if (token) {
        setAuthToken(token);
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleLoginClick = () => {
    window.location.href = spotifyAuthUrl;
  };
  const handlePromptChange = (e: React.ChangeEvent<any>) => {
    setPrompt(e.target.value);
  };

  const generatePlaylist = () => {
    nav("/playlist", {state: {prompt: prompt}});
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div className='login-screen'>
          <button className = 'login-button' onClick={handleLoginClick}>Log In with Spotify</button>
        </div>
      ) : (
    <div className="playlist-generator">
      <div className="textbox-container">
        <textarea
          className="textbox"
          placeholder="Enter your prompt for playlist generation..."
          value={prompt}
          onChange={handlePromptChange}
        />
      </div>
      <button className="generate-button" onClick={generatePlaylist}>
        Generate Playlist
      </button>
    </div>)}
    </div>
  );
};

export default Prompt;
