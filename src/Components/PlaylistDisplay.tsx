import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


const PlaylistDisplay = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [playlist, setPlaylist] = useState('');
    const {state} = useLocation();
    const { prompt } = state; 

  useEffect(() => {
    // Make a request to your backend microservice
    fetch('http://localhost:3000/playlist', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.text())
    .then((data) => {
      setPlaylist(data);
      setIsLoading(false);
    })
    .catch((error) => {
    console.error('Error generating playlist:', error);
    });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner component
  }

  return (
    <div>
      <h2>Generated Playlist</h2>
      <ul>
        {playlist.split(',').map((uri, index) => (
          <li key={index}>{uri}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistDisplay;
