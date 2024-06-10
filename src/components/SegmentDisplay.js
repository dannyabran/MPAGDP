import React, { useEffect, useRef } from 'react';
import '../App.css';

const SegmentDisplay = ({ segments }) => {
  const downSectionRef = useRef(null);

  useEffect(() => {
    const displaySegments = () => {
      if (segments && segments.length > 0) {
        downSectionRef.current.innerHTML = "";
        segments.forEach((segment) => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          const segmentVideo = document.createElement('video');
          segmentVideo.src = segment.src;
          segmentVideo.controls = false;
          segmentVideo.volume = 0.2;

          const onMetadataLoaded = () => {
            segmentVideo.currentTime = (segment.start / 100) * segmentVideo.duration;
          };

          const onTimeUpdate = () => {
            if (segmentVideo.currentTime >= (segment.end / 100) * segmentVideo.duration) {
              segmentVideo.currentTime = (segment.start / 100) * segmentVideo.duration;
              segmentVideo.play();
            }
          };

          segmentVideo.addEventListener('loadedmetadata', onMetadataLoaded);
          segmentVideo.addEventListener('timeupdate', onTimeUpdate);

          let drawInterval;
          const onPlay = () => {
            drawInterval = setInterval(() => {
              context.drawImage(segmentVideo, 0, 0, canvas.width, canvas.height);
            }, 1000 / 30);
          };

          const onPause = () => {
            clearInterval(drawInterval);
          };

          segmentVideo.addEventListener('play', onPlay);
          segmentVideo.addEventListener('pause', onPause);

          downSectionRef.current.appendChild(canvas);
          segmentVideo.play();

          return () => {
            segmentVideo.removeEventListener('loadedmetadata', onMetadataLoaded);
            segmentVideo.removeEventListener('timeupdate', onTimeUpdate);
            segmentVideo.removeEventListener('play', onPlay);
            segmentVideo.removeEventListener('pause', onPause);
          };
        });
      }
    };

    displaySegments();

    return () => {
      downSectionRef.current.innerHTML = "";
    };
  }, [segments]);

  return (
    <div ref={downSectionRef} className="down-section"></div>
  );
};

export default SegmentDisplay;
