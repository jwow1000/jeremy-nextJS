'use client'
import React, { useRef, useState, useEffect } from "react";
import { visualizeAudio } from "./visualizeAudioFunction";
import styles from "@/app/ui/audioPlayer.module.css";

interface AudioPlayerProps {
  audioSrc: string;
  title: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({audioSrc, title}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);


  useEffect(() => {
    const audio = audioRef.current;
    const canvas = canvasRef.current;
    if (!audio || !canvas) return;

    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(audio);
    const analyser = audioContext.createAnalyser();

    analyser.fftSize = 256; // you can adjust this
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyserRef.current = analyser;

    // clean up
    return () => {
      analyser.disconnect();
      source.disconnect();
      audioContext.close();
    };
  }, []);

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
      // Start visualization here
      visualizeAudio({ canvasRef, analyserRef });
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
      
      <canvas
        ref={canvasRef}
        width={200}
        height={100}
        className={styles.canvas}
      />
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