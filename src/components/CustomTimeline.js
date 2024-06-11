import React, { useRef, useState, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import '../App.css';

const CustomTimeline = ({ selectedVideo, onSegmentSelect, maxSegments }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const currentSegmentRef = useRef(null);
  const [segmentsCount, setSegmentsCount] = useState(0);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#ddd',
        progressColor: '#ff0000',
        backend: 'MediaElement',
        mediaType: 'video',
        barWidth: 3,
        barRadius: 2,
        barHeight: 0.7,
      });

      wavesurfer.current.load(selectedVideo);
    }

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [selectedVideo]);

  const startSegment = (e) => {
    if (segmentsCount >= maxSegments) {
      return;
    }

    const duration = wavesurfer.current.getDuration();
    const rect = waveformRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const start = (offsetX / rect.width) * duration;

    currentSegmentRef.current = { start, end: null, src: selectedVideo };
  };

  const updateSegment = (e) => {
    if (currentSegmentRef.current) {
      const duration = wavesurfer.current.getDuration();
      const rect = waveformRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const end = (offsetX / rect.width) * duration;

      const width = end - currentSegmentRef.current.start;
    }
  };

  const endSegment = (e) => {
    if (currentSegmentRef.current) {
      const duration = wavesurfer.current.getDuration();
      const rect = waveformRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const end = (offsetX / rect.width) * duration;

      currentSegmentRef.current.end = end;

      onSegmentSelect(currentSegmentRef.current);

      setSegmentsCount((prevCount) => prevCount + 1);
      currentSegmentRef.current = null;
    }
  };

  return (
    <div className="custom-timeline">
      <div
        ref={waveformRef}
        className="waveform"
        onMouseDown={startSegment}
        onMouseMove={updateSegment}
        onMouseUp={endSegment}
      ></div>
    </div>
  );
};

export default CustomTimeline;
