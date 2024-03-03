import React, {useState} from 'react';
import './PlaybackButton.css';


const PlaybackButton = () => {
  // State to manage play/pause; true if currently playing, false otherwise
  const [isPlaying, setIsPlaying] = useState(false);

  // SVG paths for play and pause icons
  const playIcon = (
    <path d="M33.6515 19.9457C34.3929 20.3905 34.7637 20.613 34.8923 20.8991C35.0095 21.1598 35.0095 21.4583 34.8923 21.7191C34.7637 22.0052 34.3929 22.2276 33.6515 22.6725L3.33188 40.8643C2.55217 41.3321 2.16232 41.566 1.84153 41.5395C1.5494 41.5154 1.28257 41.3643 1.11158 41.1262C0.923826 40.8648 0.923826 40.4101 0.923826 39.5008L0.923826 3.11733C0.923826 2.20804 0.923826 1.7534 1.11158 1.49195C1.28257 1.25387 1.5494 1.10279 1.84153 1.07866C2.16232 1.05218 2.55217 1.28609 3.33188 1.75391L33.6515 19.9457Z" fill="#D9D9D9"/>
  );

  const pauseIcon = (
    <>
      <rect y="1.52588e-05" width="13.3153" height="42" fill="#D9D9D9"/>
      <rect x="21.6848" width="13.3153" height="42" fill="#D9D9D9"/>
    </>
  );

  // Event handler for click events on the playback button
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <button onClick={togglePlayback} className="Playback-Button">
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="43" viewBox="0 0 36 43" fill="none">
        {isPlaying ? pauseIcon : playIcon}
      </svg>
    </button>
  );
};

export default PlaybackButton;
