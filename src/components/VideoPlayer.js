import React from 'react';
import ReactPlayer from 'react-player/youtube';

const VideoPlayer = ({ videoId, onReady }) => {
  const url = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div className="video-player">
      <ReactPlayer
        url={url}
        controls
        onReady={onReady}
      />
    </div>
  );
};

export default VideoPlayer;
