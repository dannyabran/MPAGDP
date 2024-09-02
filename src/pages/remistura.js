import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../App.css';
import VideoPlayer from '../components/VideoPlayer';
import CustomTimeline from '../components/CustomTimeline';
import SegmentDisplay from '../components/SegmentDisplay';
import * as Icon from 'react-bootstrap-icons';
import Tutorial from '../components/Tutorial';
import Header from '../components/Header';

const importAll = (r) => r.keys().map(r);

const images = importAll(require.context('./img', false, /\.(png|jpe?g|svg)$/));
const videos = importAll(require.context('./videos', false, /\.(mp4|webm)$/));

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [segmentsCount, setSegmentsCount] = useState(0);
  const [showVideoSelector, setShowVideoSelector] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const videoPlayerRef = useRef(null);
  const { width } = useWindowDimensions();

  const handleSetSelectedVideo = useCallback((video) => {
    setSelectedVideo(video);
  }, []);

  const handleImageSelect = (video, index) => {
    setSelectedVideo(video);
    setSelectedImage(index);
  };

  const handleSegmentSelect = (segment) => {
    setSegments((prevSegments) => [
      ...prevSegments,
      { ...segment, id: generateUniqueId() },
    ]);
    setSegmentsCount((prevCount) => prevCount + 1);
  };

  const generateUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);

  const handleDeleteSegment = (id) => {
    setSegments((prevSegments) => prevSegments.filter((segment) => segment.id !== id));
    setSegmentsCount((prevCount) => prevCount - 1);
  };

  const toggleVideoSelector = () => setShowVideoSelector((prev) => !prev);

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
        <div className="main">
          <div className="top-side">
          <div className="add-video" onClick={toggleVideoSelector}>
              {selectedImage !== null ? (
                <Icon.ArrowRepeat size={40} /> 
              ) : (
                <Icon.Plus size={50} />
              )}
            </div>
            <div className="video-player">
              <VideoPlayer ref={videoPlayerRef} selectedVideo={selectedVideo} />
              <CustomTimeline
                selectedVideo={selectedVideo}
                onSegmentSelect={handleSegmentSelect}
                maxSegments={8}
                segmentsCount={segmentsCount}
                videoRef={videoPlayerRef}
              />
            </div>
          </div>
          <div className="bottom-side">
            <SegmentDisplay segments={segments} onDeleteSegment={handleDeleteSegment} />
          </div>
          {showVideoSelector && (
            <div className={`video-selector ${isClosing ? 'closing' : ''}`}>
              <div className="close" onClick={closeVideoSelector}>
                <Icon.X size={50} color="#f4f0e7" />
              </div>
              <div className="selector-images">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`video${index + 1}`}
                    onClick={() => handleImageSelect(videos[index], index)}
                    className={selectedImage === index ? 'selected' : ''}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="main">
          <Tutorial />
          <div className="left-side">
            <div className="video-player">
              <VideoPlayer ref={videoPlayerRef} selectedVideo={selectedVideo} />
              <CustomTimeline
                selectedVideo={selectedVideo}
                onSegmentSelect={handleSegmentSelect}
                maxSegments={16}
                segmentsCount={segmentsCount}
                videoRef={videoPlayerRef}
              />
            </div>
            <SegmentDisplay segments={segments} onDeleteSegment={handleDeleteSegment} />
          </div>
          <div className="right-side">
            <div className="header">
              <Header />
            </div>
            <div className="video-selector">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`video${index + 1}`}
                  onClick={() => handleImageSelect(videos[index], index)}
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
