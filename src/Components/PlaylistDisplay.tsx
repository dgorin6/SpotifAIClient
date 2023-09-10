import React, { useEffect, useState, useContext} from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { Spotify } from 'react-spotify-embed';
import ReactLoading from 'react-loading';
import UserContext from './UserContext';
import TitleSelect from './TitleSelect';
import CreateSuccess from './CreateSuccess';
import { access } from 'fs';

const PlaylistDisplay = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [uris, setUris] = useState<Array<string>>([]);
  const [ids, setIds] = useState<Array<string>>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [playlistTitle, setPlaylistTitle] = useState<string>('');
  const [createActive, setCreateActive] = useState(false);
  const [createSuccessActive, setCreateSuccessActive] = useState(false);
  const [link, setLink] = useState<string>('');
  const { state } = useLocation();
  const navigate = useNavigate();
  const {prompt} = state;
  const {authToken} = useContext(UserContext)
  useEffect(() => {
      if (!authToken) {
        navigate("/");
      }
      else {
        getPlaylist();
        getUserId();
      }
    }, []);
  const getPlaylist = async () => {
    fetch('http://localhost:3000/playlist', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const playlist = data.playlist
          const ids = playlist.split(',').map((uri: string) => uri.trim().replace('spotify:track:', ''));
          setUris(playlist.split(','))
          setIds(ids)
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error generating playlist:', error);
        });
  }
  const getUserId = async () => {
    fetch('https://api.spotify.com/v1/me', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${authToken}`,
  },
})
  .then(response => response.json())
  .then(data => {
    const userId = data.id;
    setUserId(userId);
  })
  .catch(error => {
    console.error('Error fetching user data:', error);
  });
  }
  const createPlaylist = async () => {
    const title = playlistTitle
    fetch('http://localhost:3000/createPlaylist', {
      method: 'POST',
      body: JSON.stringify({ uris, title, authToken, userId }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const link = data.link;
        setLink(link)
        setCreateSuccessActive(true)
      })
      .catch((error) => {
        console.error('Error generating playlist:', error);
      });
  }
  if (isLoading) {
    return (
      <div className="loading-display">
        <ReactLoading type="bars" color="#1db954" height={400} width={200} />
      </div>
    );
  }

  return (
    <div className="playlist-display">
      <h2 className="playlist-title">Generated Playlist</h2>
      <button onClick = {() => setCreateActive(true)} className="create-playlist-button">Create Playlist</button>
      <ul className="track-list">
        {ids.map((id, index) => (
          <li key={index} className="track-item">
            <Spotify wide link={`https://open.spotify.com/track/${id}`} />
          </li>
        ))}
      </ul>
      {createActive && <TitleSelect 
      setCreateActive={setCreateActive} 
      createPlaylist={createPlaylist} 
      title={playlistTitle} setTitle={setPlaylistTitle} />}
      {createSuccessActive && <CreateSuccess link = {link}/>}
    </div>
  );
};

export default PlaylistDisplay;
