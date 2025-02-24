'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AudioVisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  width: number;
  height: number;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audioRef, width, height }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    mountRef.current?.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(audioRef.current);
    const analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    // Resume the AudioContext on user interaction
    const handleUserInteraction = async () => {
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
    };

    // Add event listeners to resume the AudioContext
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const animate = () => {
      requestAnimationFrame(animate);

      analyser.getByteFrequencyData(dataArray);

      const average = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
      cube.scale.set(1, 1 + average / 50, 1);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [audioRef, width, height]);

  return <div ref={mountRef} />;
};

export default AudioVisualizer;