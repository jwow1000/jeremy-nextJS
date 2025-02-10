'use client';

import React, { useEffect, useRef } from 'react';
import styles from "@/app/ui/header.module.css";

interface RandomLinesProps {
  width?: number;
  height?: number;
  wAmount?: number;
  hAmount?: number;
  containerId?: string;
}

const RandomLines: React.FC<RandomLinesProps> = ({
  width = 800,
  height = 600,
  wAmount = 10,
  hAmount = 10,
  containerId = 'header-animation'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height); // Clear the canvas

    const chunkWidth = Math.floor(width / wAmount);
    const chunkHeight = Math.floor(height / hAmount);
    
    // Generate random color
    const color = `rgb(${Math.floor(Math.random() * 135 + 120)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 135 + 120)})`;
    
    const drawRandomLines = () => {
      for (let y = 0; y <= hAmount; y++) {
        for (let x = 0; x <= wAmount; x++) {
          const xPos = x * chunkWidth;
          const yPos = y * chunkHeight;
          const dir = Math.floor(Math.random() * 6);
    
          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
    
          const controlX = xPos + chunkWidth / 2 + (Math.random() * 20 - 10); // Random offset for organic curve
          const controlY = yPos + chunkHeight / 2 + (Math.random() * 20 - 10);
    
          if (dir === 0) {
            ctx.moveTo(xPos, yPos);
            ctx.quadraticCurveTo(controlX, controlY, xPos + chunkWidth, yPos);
          } else if (dir === 1) {
            ctx.moveTo(xPos + chunkWidth, yPos);
            ctx.quadraticCurveTo(controlX, controlY, xPos + chunkWidth, yPos + chunkHeight);
          } else if (dir === 2) {
            ctx.moveTo(xPos, yPos + chunkHeight);
            ctx.quadraticCurveTo(controlX, controlY, xPos + chunkWidth, yPos + chunkHeight);
          } else if (dir === 3) {
            ctx.moveTo(xPos, yPos);
            ctx.quadraticCurveTo(controlX, controlY, xPos, yPos + chunkHeight);
          } else if (dir === 4) {
            ctx.moveTo(xPos, yPos);
            ctx.quadraticCurveTo(controlX, controlY, xPos + chunkWidth, yPos + chunkHeight);
          } else if (dir === 5) {
            ctx.moveTo(xPos, yPos + chunkHeight);
            ctx.quadraticCurveTo(controlX, controlY, xPos + chunkWidth, yPos);
          }
    
          ctx.stroke();
        }
      }
    };

    drawRandomLines();
  }, [width, height, wAmount, hAmount]);

  return (
    <div id={containerId} style={{ width, height }}>
      <canvas ref={canvasRef} width={width} height={height} className={styles.animationWrapper} />
    </div>
  );
};

export default RandomLines;
