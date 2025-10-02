interface VisualizeAudioProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null> ;
  analyserRef: React.RefObject<AnalyserNode | null>;
}

export const visualizeAudio = ({canvasRef, analyserRef}: VisualizeAudioProps) => {
  if (!canvasRef.current) return ;
  
  const SMOOTHING = 0.8; // 0 = no smoothing, 1 = infinite smoothing
  const previousData = new Uint8Array(256); // or analyser.fftSize / 2

  const renderFrame = () => {
    if (!analyserRef.current || !canvasRef.current) return;

    const analyser = analyserRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rawData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(rawData);

    // Apply smoothing
    for (let i = 0; i < rawData.length; i++) {
      previousData[i] = previousData[i] * SMOOTHING + rawData[i] * (1 - SMOOTHING);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = 8;
    let startX = 0;

    for (let i = 0; i < previousData.length; i++) {
      startX = i * 8;
      // const length = i < 6 ? previousData[i] / 2 : previousData[i];
      const norm = (i+1) / previousData.length; // 0 = low, 1 = high
      const weighting = Math.pow(norm, 0.5); // tweak exponent: <1 boosts highs, >1 boosts lows
      const length = previousData[i] * weighting;

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0.2, "#f5c2cb8e");
      gradient.addColorStop(0.5, "#ffffff7b");
      gradient.addColorStop(1.0, "#f5c2cb8e");

      ctx.fillStyle = gradient;
      ctx.fillRect(
        startX,
        canvas.height,
        barWidth,
        -length * 3
      );
    }

    requestAnimationFrame(renderFrame);
  };

  renderFrame();

}
