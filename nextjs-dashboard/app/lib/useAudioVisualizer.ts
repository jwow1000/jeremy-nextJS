import { useEffect, useRef } from 'react';

export function useAudioVisualizer(
  audioRef: React.RefObject<HTMLAudioElement | null>,
  drawFn: (data: Uint8Array, analyser: AnalyserNode) => void
) {
  const startedRef = useRef(false);
  const rafId = useRef<number>(0);
  const analyserRef = useRef<AnalyserNode>(null); 
  const audioContextRef = useRef<AudioContext>(null);
  const dataArrayRef = useRef<Uint8Array>(null);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl || startedRef.current) return;

    const handlePlay = async () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
        const source = audioContextRef.current.createMediaElementSource(audioEl);
        const analyser = audioContextRef.current.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioContextRef.current.destination);

        analyser.fftSize = 256;
        analyserRef.current = analyser;
        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      }

      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      const loop = () => {
        if (analyserRef.current && dataArrayRef.current) {
          analyserRef.current.getByteFrequencyData(dataArrayRef.current);
          drawFn(dataArrayRef.current, analyserRef.current);
        }
        rafId.current = requestAnimationFrame(loop);
      };

      startedRef.current = true;
      loop();
    };

    audioEl.addEventListener('play', handlePlay);

    return () => {
      audioEl.removeEventListener('play', handlePlay);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      analyserRef.current?.disconnect();
      audioContextRef.current?.close();
    };
  }, [audioRef, drawFn]);
}
