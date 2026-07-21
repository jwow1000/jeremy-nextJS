"use client";
import React, { useRef, useState, useEffect } from "react";
import { computePeaks, renderWaveform } from "./waveform";
import Image from "next/image";
import styles from "./audioPlayer.module.css";

const NUM_WAVEFORM_POINTS = 100;

interface AudioPlayerProps {
  audioSrc: string;
  title: string;
  imageSrc: string;
  imageAlt?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioSrc,
  title,
  imageSrc,
  imageAlt,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const peaksRef = useRef<Float32Array | null>(null);
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

  useEffect(() => {
    let cancelled = false;

    computePeaks(audioSrc, NUM_WAVEFORM_POINTS).then((peaks) => {
      if (!cancelled) peaksRef.current = peaks;
    });

    return () => {
      cancelled = true;
    };
  }, [audioSrc]);

  useEffect(() => {
    renderWaveform({ canvasRef, audioRef, peaksRef });
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
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
      <div className={styles.playerImageContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={imageSrc}
            alt={imageAlt || "no description available"}
            fill
            style={{ objectFit: "cover" }}
          ></Image>
        </div>
      </div>

      <audio ref={audioRef} crossOrigin="anonymous" >
        <source src={audioSrc} type="audio/mpeg" />
      </audio>

      <div className={styles.overlay}>
        <div className={styles.title}>{title}</div>

        <div>
          <div className={styles.controlsRow}>
            <button className={styles.playPause} onClick={togglePlayPause}>
              {isPlaying ? "||" : ">"}
            </button>
            <div className={styles.progressBarWrapper}>
              <canvas
                ref={canvasRef}
                width={300}
                height={40}
                className={styles.canvas}
              />
              <input
                id="trackScrub"
                ref={progressRef}
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                className={`${styles.rangeInput} ${styles.progressBar}`}
              />
            </div>
          </div>
          <div className={styles.volumeRow}>
            <label htmlFor="volume" className={styles.labels}>
              Volume
            </label>
            <input
              id="volume"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className={`${styles.rangeInput} ${styles.volumeControl}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
