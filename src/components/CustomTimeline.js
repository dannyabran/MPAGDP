import React, { useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';

const CustomTimeline = ({ selectedVideo, onSegmentSelect, maxSegments, segmentsCount, videoRef }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const regionsRef = useRef({});

  useEffect(() => {
    if (waveformRef.current && videoRef.current) {
      const videoElement = videoRef.current.getVideoElement();

      if (videoElement) {
        wavesurfer.current = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: '#212422',
          progressColor: '#A22C29',
          backend: 'MediaElement',
          barWidth: 3,
          barRadius: 2,
          barHeight: 0.7,
          height: 90,
          media: videoElement,
        });

        const wsRegions = wavesurfer.current.registerPlugin(RegionsPlugin.create());

        wavesurfer.current.load(selectedVideo);

        wavesurfer.current.on('ready', () => {
          wsRegions.enableDragSelection({
            color: 'rgba(255, 0, 0, 0.1)',
          });
        });

        const handleRegionCreated = (region) => {
          if (segmentsCount < maxSegments) {
            onSegmentSelect({ start: region.start, end: region.end, src: selectedVideo });
            regionsRef.current[region.id] = region; 
          } else {
            region.remove(); 
          }
        };

        wsRegions.on('region-created', handleRegionCreated);

        return () => {
          wsRegions.un('region-created', handleRegionCreated);
          wavesurfer.current.destroy();
        };
      }
    }
  }, [selectedVideo, maxSegments, onSegmentSelect, segmentsCount, videoRef]);

  useEffect(() => {
    Object.keys(regionsRef.current).forEach((id) => {
      const region = regionsRef.current[id];
      if (region < segmentsCount) {
        region.remove(); 
        delete regionsRef.current[id];      
      }
    });
  }, [segmentsCount]);

  return (
    <div className="custom-timeline">
      <div ref={waveformRef} className="waveform"></div>
    </div>
  );
};

export default CustomTimeline;
