import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

const SegmentDisplay = ({ segments }) => {
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
      segmentsRef.current.removeChild(selectedVideo);
      setSelectedVideo(null);
    }
  };

  return (
      <div className="down-section">
        <div className="controls-segments">
          <button onClick={handlePlay} className='play'><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
</svg></button>
          <button onClick={handlePause} className='pause'><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
</svg></button>
          <button onClick={handleDelete} className='delete'><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg></button>
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
