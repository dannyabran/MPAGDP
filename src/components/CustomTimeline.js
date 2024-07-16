import React, { useRef, useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';

const CustomTimeline = ({ selectedVideo, onSegmentSelect, maxSegments }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [segmentsCount, setSegmentsCount] = useState(0);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#212422',
        progressColor: '#A22C29',
        backend: 'MediaElement',
        mediaType: 'video',
        barWidth: 3,
        barRadius: 2,
        barHeight: 0.7,
      });

      const wsRegions = wavesurfer.current.registerPlugin(RegionsPlugin.create());

      wavesurfer.current.load(selectedVideo);

      wavesurfer.current.on('ready', () => {
        wsRegions.enableDragSelection({
          color: 'rgba(255, 0, 0, 0.1)'
        });
      });

      wsRegions.on('region-created', (region) => {
        if (segmentsCount < maxSegments) {
          setSegmentsCount((prevCount) => prevCount + 1);
          onSegmentSelect({ start: region.start, end: region.end, src: selectedVideo });
        } else {
          region.remove();
        }
      });
    }

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [selectedVideo, maxSegments, onSegmentSelect]);

  return (
    <div className="custom-timeline">
      <div ref={waveformRef} className="waveform"></div>
    </div>
  );
};

export default CustomTimeline;