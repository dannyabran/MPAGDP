import React, { useState } from 'react';
import '../App.css';
import VideoPlayer from '../components/VideoPlayer';
import CustomTimeline from '../components/CustomTimeline';
import SegmentDisplay from '../components/SegmentDisplay';
import video1 from './img/video1.mp4';
import video2 from './img/video2.mp4';
import video3 from './img/video3.mp4';
import video4 from './img/video4.mp4';
import img1 from './img/video1.png';
import img2 from './img/video2.png';
import img3 from './img/video3.png';
import img4 from './img/video4.png';

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
          <CustomTimeline selectedVideo={selectedVideo} onSegmentSelect={handleSegmentSelect} maxSegments={16} />
          <SegmentDisplay segments={segments}/>
        </div>
        {isVideoSelectorVisible && (
          <div className='video-selector'>
            <img src={img1} alt="video1" onClick={() => handleVideoSelect(video1)} />
            <img src={img2} alt="video2" onClick={() => handleVideoSelect(video2)} />
            <img src={img3} alt="video1" onClick={() => handleVideoSelect(video3)} />
            <img src={img4} alt="video2" onClick={() => handleVideoSelect(video4)} />
          </div>
        )}
        <div className="side">
          <div className='videos-button' onClick={toggleVideoSelector}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-play-fill" viewBox="0 0 16 16">
  <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M6 6.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V6.884z"/>
</svg></div>
          <div className='music-button'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-music-fill" viewBox="0 0 16 16">
  <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M11 6.64v1.75l-2 .5v3.61c0 .495-.301.883-.662 1.123C7.974 13.866 7.499 14 7 14s-.974-.134-1.338-.377C5.302 13.383 5 12.995 5 12.5s.301-.883.662-1.123C6.026 11.134 6.501 11 7 11c.356 0 .7.068 1 .196V6.89a1 1 0 0 1 .757-.97l1-.25A1 1 0 0 1 11 6.64"/>
</svg></div>
          <div className='exit-button'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg></div>
        </div>
      </div>
    );
  };
  
  export default Remistura;
