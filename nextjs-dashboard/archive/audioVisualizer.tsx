'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AudioVisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  width: number;
  height: number;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audioRef, width, height }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const contextStartedRef = useRef(false); // prevent re-initialization

  useEffect(() => {
    if (!audioRef.current || contextStartedRef.current) return;

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
    const analyser = audioContext.createAnalyser();
    let source: MediaElementAudioSourceNode | null = null;

    const setupAudio = async () => {
      if (contextStartedRef.current) return;

      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      if (!source) {
        source = audioContext.createMediaElementSource(audioRef.current!);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
      }

      contextStartedRef.current = true;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const animate = () => {
        requestAnimationFrame(animate);

        analyser.getByteFrequencyData(dataArray);

        const average = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
        cube.scale.set(1, 1 + average / 50, 1);

        renderer.render(scene, camera);
      };

      animate();
    };

    const handlePlay = () => {
      setupAudio();
    };

    audioRef.current.addEventListener('play', handlePlay);

    return () => {
      audioRef.current?.removeEventListener('play', handlePlay);
      if (source) source.disconnect();
      analyser.disconnect();
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [audioRef, width, height]);

  return <div ref={mountRef} />;
};

export default AudioVisualizer;
