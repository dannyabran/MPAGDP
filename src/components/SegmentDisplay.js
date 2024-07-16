import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';

const SegmentDisplay = ({ segments }) => {
  const segmentsRef = useRef(null);
  const [selectedSegment, setSelectedSegment] = useState(null);

  useEffect(() => {
    const displaySegments = () => {
      if (segments && segments.length > 0) {
        segmentsRef.current.innerHTML = "";
        segments.forEach((segment, index) => {
          const segmentContainer = document.createElement('div');
          segmentContainer.className = 'segment-container';

          const segmentVideo = document.createElement('video');
          segmentVideo.src = segment.src;
          segmentVideo.controls = false;
          segmentVideo.autoplay = true;
          segmentVideo.volume = 0.2;

          const controlsContainer = document.createElement('div');
          controlsContainer.className = 'segment-controls';
          controlsContainer.style.display = 'none';

          const playPauseButton = document.createElement('button');
          playPauseButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/></svg>';
          playPauseButton.onclick = () => {
            if (segmentVideo.paused) {
              segmentVideo.play();
              playPauseButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/></svg>';
            } else {
              segmentVideo.pause();
              playPauseButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16"> <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/> </svg>';
            }
          };
          const volumeInput = document.createElement('input');
          volumeInput.type = 'range';
          volumeInput.min = '0';
          volumeInput.max = '1';
          volumeInput.step = '0.01';
          volumeInput.value = '0.2';
          volumeInput.oninput = (e) => segmentVideo.volume = e.target.value;

          controlsContainer.appendChild(playPauseButton);
          controlsContainer.appendChild(volumeInput);

          segmentContainer.appendChild(segmentVideo);
          segmentContainer.appendChild(controlsContainer);

          const onMetadataLoaded = () => {
            segmentVideo.currentTime = (segment.start / 100) * segmentVideo.duration;
          };

          const onTimeUpdate = () => {
            if (segmentVideo.currentTime >= (segment.end / 100) * segmentVideo.duration) {
              segmentVideo.currentTime = (segment.start / 100) * segmentVideo.duration;
            }
          };

          const selectSegment = () => {
            setSelectedSegment((prevSelected) => {
              if (prevSelected === segmentContainer) {
                controlsContainer.style.display = 'none';
                segmentVideo.classList.remove('selected');
                return null;
              } else {
                if (prevSelected) {
                  prevSelected.querySelector('.segment-controls').style.display = 'none';
                  prevSelected.classList.remove('selected');
                }
                controlsContainer.style.display = 'flex';
                segmentVideo.classList.add('selected');
                return segmentContainer;
              }
            });
          };

          segmentVideo.addEventListener('loadedmetadata', onMetadataLoaded);
          segmentVideo.addEventListener('timeupdate', onTimeUpdate);
          segmentVideo.addEventListener('click', selectSegment);

          segmentsRef.current.appendChild(segmentContainer);

          return () => {
            segmentVideo.removeEventListener('loadedmetadata', onMetadataLoaded);
            segmentVideo.removeEventListener('timeupdate', onTimeUpdate);
            segmentVideo.removeEventListener('click', selectSegment);
          };
        });
      }
    };

    displaySegments();

    return () => {
      segmentsRef.current.innerHTML = "";
    };
  }, [segments]);

  return (
    <div ref={segmentsRef} className="down-section"></div>
  );
};

export default SegmentDisplay;