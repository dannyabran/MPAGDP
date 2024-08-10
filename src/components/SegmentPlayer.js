import React, { useRef, useEffect, useState } from 'react';
import * as Icon from 'react-bootstrap-icons';
import '../App.css';

const SegmentPlayer = ({ segment, onDelete, onSelect, isSelected }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleLoadedMetadata = () => {
      videoElement.currentTime = (segment.start / 100) * videoElement.duration;
    };

    const handleTimeUpdate = () => {
      if (videoElement.currentTime >= (segment.end / 100) * videoElement.duration) {
        videoElement.currentTime = (segment.start / 100) * videoElement.duration;
      }
    };

    videoElement.src = segment.src;
    videoElement.volume = 0.2;
    videoElement.autoplay = true;
    videoElement.preload = 'auto';

    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [segment]);

  const handlePlayPause = (e) => {
    e.stopPropagation();
    const videoElement = videoRef.current;
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
        setIsPlaying(true);
      } else {
        videoElement.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.volume = e.target.value;
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div
      className={`segment-container`}
      onClick={onSelect}
    >
      <video ref={videoRef} className={`video-element ${isSelected ? 'selected' : ''}`} />
      <div className="segment-controls" style={{ display: isSelected ? 'flex' : 'none' }}>
        <button onClick={handlePlayPause}>
          {isPlaying ? (
            <Icon.PauseFill color="#f4f0e7" size={30} />
          ) : (
            <Icon.PlayFill color="#f4f0e7" size={30} />
          )}
        </button>
        <input
          className='volume-segments'
          type="range"
          min={0}
          max={1}
          step={0.01}
          defaultValue={0.2}
          onChange={handleVolumeChange}
        />
        <button onClick={handleDelete}>
          <Icon.TrashFill color="#f4f0e7" size={20} />
        </button>
      </div>
    </div>
  );
};

export default SegmentPlayer;
