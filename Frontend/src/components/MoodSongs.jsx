import React, { useState, useRef } from 'react';
import './MoodSongs.css';

const MoodSongs = ({ Songs = [] }) => {
  const [playingIndex, setPlayingIndex] = useState(null);
  const audioRefs = useRef([]);

  const togglePlayPause = (index) => {
    const currentAudio = audioRefs.current[index];

    if (!currentAudio) return;

    if (playingIndex === index) {
      currentAudio.pause();
      setPlayingIndex(null);
    } else {
      // Pause any other audio that is playing
      if (playingIndex !== null && audioRefs.current[playingIndex]) {
        audioRefs.current[playingIndex].pause();
      }
      currentAudio.play();
      setPlayingIndex(index);
    }
  };

  return (
    <div className='Mood-songs'>
      <h2>Recommended Songs</h2>

      {Songs.map((song, index) => (
        <div className='Song' key={index}>
          <div className='title'>
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </div>
          <div className='play-pause-button'>
            <audio
              ref={(el) => (audioRefs.current[index] = el)}
              src={song.audio}
            />
            <i
              className={playingIndex === index ? "ri-pause-line" : "ri-play-circle-fill"}
              onClick={() => togglePlayPause(index)}
              style={{ cursor: 'pointer', fontSize: '24px' }}
            ></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoodSongs;
