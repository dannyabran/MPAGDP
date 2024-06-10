import React, { useState } from 'react';
import '../App.css';
import VideoPlayer from '../components/VideoPlayer';
import CustomTimeline from '../components/CustomTimeline';
import SegmentDisplay from '../components/SegmentDisplay';
import video1 from './img/video1.mp4';
import video2 from './img/video2.mp4';
import img1 from './img/video1.png';
import img2 from './img/video2.png';

const Remistura = () => {
    const [segments, setSegments] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState();
    const [isVideoSelectorVisible, setIsVideoSelectorVisible] = useState(false);
  
    const handleVideoSelect = (video) => {
      setSelectedVideo(video);
    };
  
    const handleSegmentSelect = (segment) => {
        setSegments((prevSegments) => [...prevSegments, segment]);
    };

    const toggleVideoSelector = () => {
        setIsVideoSelectorVisible(!isVideoSelectorVisible);
    };
  
    return (
      <div className="main">
        <div className="video-player">
          <VideoPlayer selectedVideo={selectedVideo} />
          <CustomTimeline selectedVideo={selectedVideo} onSegmentSelect={handleSegmentSelect} maxSegments={7} />
          <SegmentDisplay segments={segments} />
        </div>
        {isVideoSelectorVisible && (
          <div className='video-selector'>
            <img src={img1} alt="video1" onClick={() => handleVideoSelect(video1)} />
            <img src={img2} alt="video2" onClick={() => handleVideoSelect(video2)} />
          </div>
        )}
        <div className="side">
          <div className='videos-button' onClick={toggleVideoSelector}></div>
          <div className='music-button'></div>
          <div className='exit-button'></div>
        </div>
      </div>
    );
  };
  
  export default Remistura;
