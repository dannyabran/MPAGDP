import React, { useState, useEffect, useRef } from 'react';
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
import Tutorial from '../components/Tutorial';

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
    const [selectedImage, setSelectedImage] = useState(null);
    const [segmentsCount, setSegmentsCount] = useState(0);

    const VideoPlayerRef = useRef(null); 

    const { width } = useWindowDimensions();
  
    const handleVideoSelect = (video) => {
      setSelectedVideo(video);
    };

    const handleImageSelect = (video, index) => {
      setSelectedVideo(video);
      setSelectedImage(index);
      closeVideoSelector();
    };
  
    const handleSegmentSelect = (segment) => {
        setSegments((prevSegments) => [...prevSegments, segment]);
        setSegmentsCount(prevCount => prevCount + 1);
    };

    const handleDeleteSegment = (index) => {
      setSegments(prevSegments => prevSegments.filter((_, i) => i !== index));
      setSegmentsCount(prevCount => prevCount - 1);
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
                <VideoPlayer ref={VideoPlayerRef} selectedVideo={selectedVideo} />
                <CustomTimeline selectedVideo={selectedVideo} onSegmentSelect={handleSegmentSelect} maxSegments={8} segmentsCount={segmentsCount} videoRef={VideoPlayerRef}/>
              </div>
            </div>
            <div className='bottom-side'>
            <SegmentDisplay segments={segments} onDeleteSegment={handleDeleteSegment}/>
            </div>
            {showVideoSelector && (
            <div className={`video-selector ${isClosing ? 'closing' : ''}`}>
              <div className='close' onClick={closeVideoSelector}>
                <Icon.X size={50} color='#f4f0e7'/> 
              </div>
              <div className='selector-images'>
              {[img1, img2, img3, img4].map((img, index) => (
                  <img 
                    key={index}
                    src={img} 
                    alt={`video${index + 1}`} 
                    onClick={() => handleImageSelect([video1, video2, video3, video4][index], index)}
                    className={selectedImage === index ? 'selected' : ''}
                  />
                ))}
              </div>
            </div>
          )}
          </div>
        ) : (
          <div className='main'>
            <Tutorial />
            <div className='left-side'>
              <div className="video-player">
                <VideoPlayer ref={VideoPlayerRef} selectedVideo={selectedVideo} />
                <CustomTimeline selectedVideo={selectedVideo} onSegmentSelect={handleSegmentSelect} maxSegments={16} segmentsCount={segmentsCount} videoRef={VideoPlayerRef}/>
              </div>
              <SegmentDisplay segments={segments} onDeleteSegment={handleDeleteSegment}/>
            </div>
            <div className="right-side">
                <div className='header'>
                </div>
                <div className='video-selector'>
                  {[img1, img2, img3, img4].map((img, index) => (
                  <img 
                    key={index}
                    src={img} 
                    alt={`video${index + 1}`} 
                    onClick={() => handleImageSelect([video1, video2, video3, video4][index], index)}
                    className={selectedImage === index ? 'selected' : ''}
                  />
                ))}
                </div>
            </div>
        </div>
        )}
      </div>
    );
  };
  
  export default Remistura;
