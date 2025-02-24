'use client'
import React, { useRef, useState, useEffect } from "react";
// import AudioVisualizer from "@/app/lib/audioVisualizer";
import styles from "@/app/ui/audioPlayer.module.css";

interface AudioPlayerProps {
  audioSrc: string;
  title: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({audioSrc, title}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newProgress = Number(e.target.value);
    audio.currentTime = (newProgress / 100) * audio.duration;
    setProgress(newProgress);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = Number(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
  };

  return (
    <div className={styles.audioPlayer}>
      <div className={styles.title}>{title}</div>
      {/* <div className={styles.animationWrapper}>
        <AudioVisualizer audioRef={audioRef} width={200} height={200} />
      </div> */}
      <audio ref={audioRef} src={audioSrc}></audio>
      
      <button className={styles.playPause} onClick={togglePlayPause}>
        {isPlaying ? "||" : ">"}
      </button>
      <label htmlFor="trackScrub" className={styles.labels}>Track</label>
      <input
        id="trackScrub"
        ref={progressRef}
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleProgressChange}
        className={styles.progressBar}
      />
      <label htmlFor="volume" className={styles.labels}>Volume</label>
      <input
        id="volume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className={styles.volumeControl}
      />
    </div>
  );
};

export default AudioPlayer;
