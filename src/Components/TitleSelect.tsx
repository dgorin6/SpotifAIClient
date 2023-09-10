import React, { useState } from 'react';

interface ITitleSelect {
    setCreateActive: (active: boolean) => void,
    title: string,
    setTitle: (title: string) => void,
    createPlaylist: () => {}
}
const TitleSelect = ({ setCreateActive, createPlaylist, title, setTitle}: ITitleSelect) => {

  const handleCreatePlaylist = () => {
    if (title == null || title.trim() !== '') {

      createPlaylist();
      setCreateActive(false)
    }
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <div className="overlay-header">
          <h2>Choose a Title</h2>
          <button onClick={() => {setCreateActive(false)}} className="close-button">
            <span>&times;</span>
          </button>
        </div>
        <input
          type="text"
          placeholder="Enter Playlist Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleCreatePlaylist}>Create Playlist</button>
      </div>
    </div>
  );
};

export default TitleSelect;
