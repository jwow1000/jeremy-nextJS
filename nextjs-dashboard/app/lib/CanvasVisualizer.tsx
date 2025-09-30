'use client';
import React, { useRef } from 'react';
import { useAudioVisualizer } from './useAudioVisualizer';

interface CanvasVisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  width: number;
  height: number;
}

const CanvasVisualizer: React.FC<CanvasVisualizerProps> = ({ audioRef, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useAudioVisualizer(audioRef, (dataArray) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    const barWidth = (width / dataArray.length) * 2.5;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      const barHeight = dataArray[i];
      ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
      ctx.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);
      x += barWidth + 1;
    }
  });

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default CanvasVisualizer;
