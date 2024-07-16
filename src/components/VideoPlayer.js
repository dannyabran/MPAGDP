import React, { useRef, useEffect, useState } from 'react';
import '../App.css';
import VideoControls from './VideoControls';
import * as Icon from 'react-bootstrap-icons';

const VideoPlayer = ({ selectedVideo }) => {
  const videoRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const progressRef = useRef(null);
  const progressBarRef = useRef(null);
  const [timeText, setTimeText] = useState("00:00");
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const progressBar = progressBarRef.current;

    const finalVolume = muted ? 0 : volume ** 2;
    video.volume = finalVolume;

    const togglePlay = () => {
      if (video.paused || video.ended) {
        video.play();
      } else {
        video.pause();
      }
    };

    const updateToggleButton = () => {
      toggleButtonRef.current.innerHTML = video.paused ? "►" : "❚❚";
    };

    const handleProgress = () => {
      const progressPercentage = (video.currentTime / video.duration) * 100;
      progressBar.style.flexBasis = `${progressPercentage}%`;
    };

    const updateCurrentTimeDisplay = () => {
      const minutes = Math.floor(video.currentTime / 60);
      const seconds = Math.floor(video.currentTime % 60).toString().padStart(2, '0');
      setTimeText(`${minutes}:${seconds}`);
    };

    const scrub = (e) => {
      const rect = progressRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const scrubTime = (offsetX / rect.width) * video.duration;
      video.currentTime = scrubTime;
    };

    toggleButtonRef.current.addEventListener('click', togglePlay);
    video.addEventListener('play', updateToggleButton);
    video.addEventListener('pause', updateToggleButton);
    video.addEventListener('timeupdate', handleProgress);
    video.addEventListener('timeupdate', updateCurrentTimeDisplay);
    progressRef.current.addEventListener('click', scrub);

    return () => {
      toggleButtonRef.current.removeEventListener('click', togglePlay);
      video.removeEventListener('play', updateToggleButton);
      video.removeEventListener('pause', updateToggleButton);
      video.removeEventListener('timeupdate', handleProgress);
      video.removeEventListener('timeupdate', updateCurrentTimeDisplay);
      progressRef.current.removeEventListener('click', scrub);
    };
  }, [selectedVideo, volume, muted]);

  return (
    <div id="video">
      <video ref={videoRef} key={selectedVideo}>
        <source src={selectedVideo} type="video/mp4"></source>
      </video>
      <VideoControls
        toggleButtonRef={toggleButtonRef}
        progressRef={progressRef}
        progressBarRef={progressBarRef}
        timeText={timeText}
        volume={volume}
        setVolume={setVolume}
        muted={muted}
        setMuted={setMuted}
      />
    </div>
  );
};

export default VideoPlayer;