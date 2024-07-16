import React, { useState, useEffect } from 'react';
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
import * as Icon from 'react-bootstrap-icons';

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

const Remistura = () => {
    const [segments, setSegments] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState();
    const [showVideoSelector, setShowVideoSelector] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const { width } = useWindowDimensions();
  
    const handleVideoSelect = (video) => {
      setSelectedVideo(video);
    };
  
    const handleSegmentSelect = (segment) => {
        setSegments((prevSegments) => [...prevSegments, segment]);
    };

    const toggleVideoSelector = () => setShowVideoSelector(!showVideoSelector);

    const closeVideoSelector = () => {
      setIsClosing(true);
      setTimeout(() => {
        setShowVideoSelector(false);
        setIsClosing(false);
      }, 300);
    };
    return (
      <div>
        {width < 500 ? (
          <div className='main'>
            <div className='top-side'>
              <div className='add-video' onClick={toggleVideoSelector}>
                <Icon.Plus size={50} />
              </div>
              <div className='video-player'>
                <VideoPlayer selectedVideo={selectedVideo} />
                <CustomTimeline selectedVideo={selectedVideo} onSegmentSelect={handleSegmentSelect} maxSegments={8} />
              </div>
            </div>
            <div className='bottom-side'>
            <SegmentDisplay segments={segments}/>
            </div>
            {showVideoSelector && (
            <div className={`video-selector ${isClosing ? 'closing' : ''}`}>
              <div className='close' onClick={closeVideoSelector}>
                <Icon.X size={50} color='#f4f0e7'/> 
              </div>
              <div className='selector-images'>
                <img src={img1} alt="video1" onClick={() => handleVideoSelect(video1)} />
                <img src={img2} alt="video2" onClick={() => handleVideoSelect(video2)} />
                <img src={img3} alt="video1" onClick={() => handleVideoSelect(video3)} />
                <img src={img4} alt="video2" onClick={() => handleVideoSelect(video4)} />
              </div>
            </div>
          )}
          </div>
        ) : (
          <div className='main'>
            <div className='left-side'>
              <div className="video-player">
                <VideoPlayer selectedVideo={selectedVideo} />
                <CustomTimeline selectedVideo={selectedVideo} onSegmentSelect={handleSegmentSelect} maxSegments={16} />
              </div>
              <SegmentDisplay segments={segments}/>
            </div>
            <div className="right-side">
                <div className='header'>
                </div>
                <div className='video-selector'>
                    <img src={img1} alt="video1" onClick={() => handleVideoSelect(video1)} />
                    <img src={img2} alt="video2" onClick={() => handleVideoSelect(video2)} />
                    <img src={img3} alt="video1" onClick={() => handleVideoSelect(video3)} />
                    <img src={img4} alt="video2" onClick={() => handleVideoSelect(video4)} />
                </div>
            </div>
        </div>
        )}
      </div>
    );
  };
  
  export default Remistura;
