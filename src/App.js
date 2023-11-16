import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

export const App = () => {
  const [artistName, setArtistName] = useState('');
  const [musicData, setMusicData] = useState([]);

  const fetchMusicData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/music/artist', {
        params: { artist: artistName }
      });
      setMusicData(response.data);
    } catch (error) {
      console.error('Error fetching music data:', error);
    }
  };

  useEffect(() => {
    // Fetch music data when the component mounts
    fetchMusicData();
  }, []);

  return (
    <div className="title-head-wrapper">
      <div className="title-head">
        <h1 className="title">Music Search App</h1>
        <label className="Artist-name" htmlFor="artistName">
          Artist Name
          <div>
            <input
              type="text"
              id="artistName"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)} />
          </div>
        </label>
        <div>
          <button className="search-button" type="button" onClick={fetchMusicData}>
            Search
          </button>
        </div>
        <div>
          {musicData.map((music) => (
            <div key={music.id}>
              <h2>{music.trackName}</h2>
              <p>{music.artistName}</p>
              {/* Add more details as needed */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};