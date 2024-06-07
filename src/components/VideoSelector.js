import React from 'react';
import img1 from '../pages/img/video1.png';
import img2 from '../pages/img/video2.png';
import video1 from '../pages/img/video1.mp4';
import video2 from '../pages/img/video2.mp4';

const VideoSelector = ({ onSelectVideo }) => {
  return (
    <div className="side">
      <img src={img1} alt="video1" onClick={() => onSelectVideo(video1)} />
      <img src={img2} alt="video2" onClick={() => onSelectVideo(video2)} />
    </div>
  );
};

export default VideoSelector;
