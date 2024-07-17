import React, { useState } from 'react';
import '../App.css';
import * as Icon from 'react-bootstrap-icons';

const VideoControls = ({
  toggleButtonRef,
  progressRef,
  progressBarRef,
  timeText,
  volume,
  setVolume,
  muted,
  setMuted,
}) => {
  const [showVolume, setShowVolume] = useState(false);

  return (
    <div className="controls">
      <div ref={toggleButtonRef} className="toggleButton">
        <Icon.PlayFill color='#f4f0e7'size={30}/>
      </div>
      <div className="time">{timeText}</div>
      <div ref={progressRef} className="progress">
        <div ref={progressBarRef} className="progress__filled"></div>
      </div>
      <div 
        className="volume-control"
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
      >
        <div onClick={() => setMuted(!muted)}>
          {muted ? <Icon.VolumeMuteFill size={30} color='#f4f0e7' /> : <Icon.VolumeUpFill size={30}  color='#f4f0e7'/>}
        </div>
        {showVolume && (
          <input
            className='range'
            type="range"
            min={0}
            max={1}
            step={0.02}
            value={volume}
            onChange={(e) => setVolume(e.target.valueAsNumber)}
          />
        )}
      </div>
    </div>
  );
};

export default VideoControls;