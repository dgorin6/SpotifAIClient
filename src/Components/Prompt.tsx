import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Prompt = () => {
  const nav = useNavigate();
  const [prompt, setPrompt] = useState('');

  const handlePromptChange = (e: React.ChangeEvent<any>) => {
    setPrompt(e.target.value);
  };

  const generatePlaylist = () => {
    nav("/playlist", {state: {prompt: prompt}});
  };

  return (
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
    </div>
  );
};

export default Prompt;
