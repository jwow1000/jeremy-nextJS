"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import styles from "@/app/ui/audioVisualizer.module.css";

interface AudioVisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  width: number;
  height: number;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audioRef, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const [isAudioSetup, setIsAudioSetup] = useState(false);

  // Setup Web Audio API once when the component mounts or when audio element is available
  useEffect(() => {
    if (!audioRef.current || isAudioSetup) return;

    const setupAudio = () => {
      try {
        // Create audio context
        const audioContext = new (window.AudioContext || 
          (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        audioContextRef.current = audioContext;

        // Create analyzer
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        analyserRef.current = analyser;
        dataArrayRef.current = dataArray;

        // Create and connect source
        const source = audioContext.createMediaElementSource(audioRef.current);
        sourceRef.current = source;
        
        // Connect nodes: source -> analyser -> destination
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        setIsAudioSetup(true);
        console.log("Audio setup completed successfully");
      } catch (error) {
        console.error("Error setting up audio:", error);
      }
    };

    // We'll set up audio on first user interaction or play event
    const handleInteraction = () => {
      if (!isAudioSetup) {
        setupAudio();
      }
    };

    // Set up on play event
    audioRef.current.addEventListener("play", handleInteraction);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("play", handleInteraction);
      }
      
      // Clean up audio context and connections when component unmounts
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [audioRef, isAudioSetup]);

  // Setup Three.js visualization
  useEffect(() => {
    if (!canvasRef.current) return;

    // Setup Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true 
    });
    renderer.setSize(width, height);

    // Shader uniforms
    const uniforms = {
      uAudioData: { value: new Float32Array(128) },
      uTime: { value: 0.0 },
    };

    // Shader material
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uAudioData[128];
        uniform float uTime;
        varying vec2 vUv;
        
        void main() {
          float intensity = 0.0;
          float index = floor(vUv.x * 128.0);
          
          // Get audio intensity for this pixel
          if (index >= 0.0 && index < 128.0) {
            intensity = uAudioData[int(index)];
          }
          
          // Create wave effect based on y-coordinate and time
          float wave = sin(vUv.y * 10.0 + uTime) * 0.05;
          intensity = max(intensity, wave);
          
          // Create a gradient from purple to orange
          vec3 color = mix(
            vec3(0.3, 0.0, 0.5),  // dark purple
            vec3(1.0, 0.5, 0.2),  // orange
            intensity
          );
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    // Fullscreen Quad
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update audio data
      if (analyserRef.current && dataArrayRef.current) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        
        // Update shader uniforms with audio data
        for (let i = 0; i < 128; i++) {
          uniforms.uAudioData.value[i] = dataArrayRef.current[i] / 255.0;
        }
        
        // Update time for animations
        uniforms.uTime.value += 0.01;
      }
      
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [width, height]); // Only re-run if dimensions change

  return <canvas ref={canvasRef} className={styles.canvasWrapper} />;
};

export default AudioVisualizer;