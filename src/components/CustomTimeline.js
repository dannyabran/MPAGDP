import React, { useRef, useState } from 'react';
import '../App.css';

const CustomTimeline = ({ selectedVideo, onSegmentSelect, maxSegments }) => {
  const customProgressRef = useRef(null);
  const currentSegmentRef = useRef(null);
  const [segmentsCount, setSegmentsCount] = useState(0);

  const startSegment = (e) => {

    if (segmentsCount >= maxSegments) {
      return;
    }

    const rect = customProgressRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const start = (offsetX / rect.width) * 100; 
    const indicator = document.createElement('div');
    indicator.className = 'segment-indicator';
    indicator.style.left = `${start}%`;
    customProgressRef.current.appendChild(indicator);

    currentSegmentRef.current = { start, end: null, indicator, src: selectedVideo };
  };

  const updateSegment = (e) => {
    if (currentSegmentRef.current) {
      const rect = customProgressRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const end = (offsetX / rect.width) * 100; 
      const width = end - currentSegmentRef.current.start;
      currentSegmentRef.current.indicator.style.width = `${width}%`;
    }
  };

  const endSegment = (e) => {
    if (currentSegmentRef.current) {
      const rect = customProgressRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const end = (offsetX / rect.width) * 100; 

      currentSegmentRef.current.end = end;

      onSegmentSelect(currentSegmentRef.current);

      setSegmentsCount((prevCount) => prevCount + 1);
      currentSegmentRef.current = null;
    }
  };

  return (
    <div className="custom-timeline">
      <div
        ref={customProgressRef}
        className="custom-progress"
        onMouseDown={startSegment}
        onMouseMove={updateSegment}
        onMouseUp={endSegment}
      ></div>
    </div>
  );
};

export default CustomTimeline;
