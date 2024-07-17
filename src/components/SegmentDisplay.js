import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import ReactDOMServer from 'react-dom/server';
import * as Icon from 'react-bootstrap-icons';

const SegmentDisplay = ({ segments, onDeleteSegment }) => {
  const segmentsRef = useRef(null);
  const [selectedSegment, setSelectedSegment] = useState(null);

  useEffect(() => {
    const displaySegments = () => {
      if (segmentsRef.current && segments && segments.length > 0) {
        segmentsRef.current.innerHTML = "";
        segments.forEach((segment, index) => {
          const segmentContainer = document.createElement('div');
          segmentContainer.className = 'segment-container';

          const segmentVideo = document.createElement('video');
          segmentVideo.src = segment.src;
          segmentVideo.controls = false;
          segmentVideo.autoplay = true;
          segmentVideo.volume = 0.2;
          segmentVideo.setAttribute('webkit-playsinline', 'playsInline');

          const controlsContainer = document.createElement('div');
          controlsContainer.className = 'segment-controls';
          controlsContainer.style.display = 'none';

          const playPauseButton = document.createElement('button');
          playPauseButton.innerHTML = ReactDOMServer.renderToString(<Icon.PlayFill color='#f4f0e7' size={30}/>);
          playPauseButton.onclick = () => {
            if (segmentVideo.paused) {
              segmentVideo.play();
              playPauseButton.innerHTML = ReactDOMServer.renderToString(<Icon.PlayFill color='#f4f0e7' size={30}/>);
            } else {
              segmentVideo.pause();
              playPauseButton.innerHTML = ReactDOMServer.renderToString(<Icon.PauseFill color='#f4f0e7' size={30}/>);
            }
          };

          const volumeInput = document.createElement('input');
          volumeInput.type = 'range';
          volumeInput.min = '0';
          volumeInput.max = '1';
          volumeInput.step = '0.01';
          volumeInput.value = '0.2';
          volumeInput.oninput = (e) => segmentVideo.volume = e.target.value;

          const deleteButton = document.createElement('button');
          deleteButton.innerHTML = ReactDOMServer.renderToString(<Icon.TrashFill color='#f4f0e7' size={20}/>);
          deleteButton.onclick = () => onDeleteSegment && onDeleteSegment(index);

          controlsContainer.appendChild(playPauseButton);
          controlsContainer.appendChild(volumeInput);
          controlsContainer.appendChild(deleteButton);

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
        });
      }
    };

    displaySegments();

    return () => {
      if (segmentsRef.current) {
        segmentsRef.current.innerHTML = "";
      }
    };
  }, [segments, onDeleteSegment]);

  return (
    <div ref={segmentsRef} className="down-section"></div>
  );
};

export default SegmentDisplay;