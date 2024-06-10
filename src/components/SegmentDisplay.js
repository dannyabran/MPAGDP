import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

const SegmentDisplay = ({ segments, onDelete }) => {
  const segmentsRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const displaySegments = () => {
      if (segments && segments.length > 0) {
        segmentsRef.current.innerHTML = "";
        segments.forEach((segment, index) => {
          const segmentVideo = document.createElement('video');
          segmentVideo.src = segment.src;
          segmentVideo.controls = false;
          segmentVideo.autoplay = true;
          segmentVideo.volume = 0.2;

          const onMetadataLoaded = () => {
            segmentVideo.currentTime = (segment.start / 100) * segmentVideo.duration;
          };

          const onTimeUpdate = () => {
            if (segmentVideo.currentTime >= (segment.end / 100) * segmentVideo.duration) {
              segmentVideo.currentTime = (segment.start / 100) * segmentVideo.duration;
            }
          };

          const selectVideo = () => {
            setSelectedVideo((prevSelectedVideo) => {
              if (prevSelectedVideo === segmentVideo) {
                segmentVideo.classList.remove('selected'); 
                return null;
              } else {
                if (prevSelectedVideo) {
                  prevSelectedVideo.classList.remove('selected'); 
                }
                segmentVideo.classList.add('selected'); 
                return segmentVideo;
              }
            });
          };

          segmentVideo.addEventListener('loadedmetadata', onMetadataLoaded);
          segmentVideo.addEventListener('timeupdate', onTimeUpdate);
          segmentVideo.addEventListener('click', selectVideo);

          segmentsRef.current.appendChild(segmentVideo);

          return () => {
            segmentVideo.removeEventListener('loadedmetadata', onMetadataLoaded);
            segmentVideo.removeEventListener('timeupdate', onTimeUpdate);
            segmentVideo.removeEventListener('click', selectVideo);
          };
        });
      }
    };

    displaySegments();

    return () => {
      segmentsRef.current.innerHTML = "";
    };
  }, [segments]);

  const handlePlay = () => {
    if (selectedVideo) {
      selectedVideo.play();
    }
  };

  const handlePause = () => {
    if (selectedVideo) {
      selectedVideo.pause();
    }
  };

  const handleVolumeChange = (event) => {
    if (selectedVideo) {
      selectedVideo.volume = event.target.value;
    }
  };

  const handleDelete = (event) => {
    if (selectedVideo) {
      onDelete(selectedVideo);
    }
  };

  return (
      <div className="down-section">
        <div className="controls-segments">
          <button onClick={handlePlay}>Play</button>
          <button onClick={handlePause}>Pause</button>
          <button onClick={handleDelete}>Delete</button>
          <label>
            Volume:
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              onChange={handleVolumeChange}
              defaultValue="0.2"
            />
          </label>
        </div>
        <div ref={segmentsRef} className='segments'></div>
      </div>
  );
};

export default SegmentDisplay;
