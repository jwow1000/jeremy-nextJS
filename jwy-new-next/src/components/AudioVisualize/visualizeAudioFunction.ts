interface VisualizeAudioProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  analyserRef: React.RefObject<AnalyserNode | null>;
}

export const visualizeAudio = ({ canvasRef, analyserRef }: VisualizeAudioProps) => {
  if (!canvasRef.current) return;

  const SMOOTHING = 0.75;
  const NUM_POINTS = 48;
  const smoothed = new Float32Array(NUM_POINTS);

  // Music energy naturally rolls off with frequency, so raw FFT magnitude is
  // bass-heavy — compensate with a gain that ramps up toward the high end.
  const GAIN = new Float32Array(NUM_POINTS);
  for (let i = 0; i < NUM_POINTS; i++) {
    const norm = i / (NUM_POINTS - 1);
    GAIN[i] = 1 + norm * 3;
  }

  const renderFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const analyser = analyserRef.current;
    const w = canvas.width;
    const h = canvas.height;

    if (analyser) {
      const binCount = analyser.frequencyBinCount;
      const raw = new Uint8Array(binCount);
      analyser.getByteFrequencyData(raw);

      for (let i = 0; i < NUM_POINTS; i++) {
        const start = Math.floor((i / NUM_POINTS) * binCount);
        const end = Math.floor(((i + 1) / NUM_POINTS) * binCount);
        let sum = 0;
        for (let j = start; j < end; j++) sum += raw[j];
        const avg = Math.min((sum / Math.max(end - start, 1) / 255) * GAIN[i], 1);
        smoothed[i] = smoothed[i] * SMOOTHING + avg * (1 - SMOOTHING);
      }
    }

    ctx.clearRect(0, 0, w, h);

    // Solid opaque white + mix-blend-mode: difference (see CSS) inverts
    // whatever is rendered behind the canvas — a translucent stroke would
    // only partially invert it.
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();

    const step = w / (NUM_POINTS - 1);
    const mid = h / 2;

    for (let i = 0; i < NUM_POINTS; i++) {
      const x = i * step;
      const y = mid - smoothed[i] * mid * 0.9;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.stroke();

    requestAnimationFrame(renderFrame);
  };

  renderFrame();
};
