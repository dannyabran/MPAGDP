import React from 'react';
import '../App.css';

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
  return (
    <div className="controls">
      <p ref={toggleButtonRef} className="toggleButton">►</p>
      <div className="time">{timeText}</div>
      <div ref={progressRef} className="progress">
        <div ref={progressBarRef} className="progress__filled"></div>
      </div>
      <input
        type="range"
        min={0}
        max={1}
        step={0.02}
        value={volume}
        onChange={event => setVolume(event.target.valueAsNumber)}
      />
      <button onClick={() => setMuted(!muted)}>
        {muted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
};

export default VideoControls;
