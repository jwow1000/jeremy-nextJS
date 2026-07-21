const PLAYED_COLOR = "#da67fa";
const UNPLAYED_COLOR = "rgba(0, 0, 0, 0.15)";

export async function computePeaks(audioSrc: string, numPoints: number): Promise<Float32Array> {
  const response = await fetch(audioSrc);
  const arrayBuffer = await response.arrayBuffer();

  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const audioContext = new AudioContextClass();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  const channelData = audioBuffer.getChannelData(0);
  audioContext.close();

  const samplesPerBucket = Math.max(Math.floor(channelData.length / numPoints), 1);
  const peaks = new Float32Array(numPoints);

  for (let i = 0; i < numPoints; i++) {
    const start = i * samplesPerBucket;
    const end = Math.min(start + samplesPerBucket, channelData.length);
    let max = 0;
    for (let j = start; j < end; j++) {
      const abs = Math.abs(channelData[j]);
      if (abs > max) max = abs;
    }
    peaks[i] = max;
  }

  return peaks;
}

interface RenderWaveformProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  peaksRef: React.RefObject<Float32Array | null>;
}

// Draws a static, whole-track waveform (like a CDJ/turntable overview),
// with the already-played portion recolored as the playhead sweeps
// across it — rather than a real-time frequency animation.
export const renderWaveform = ({ canvasRef, audioRef, peaksRef }: RenderWaveformProps) => {
  const renderFrame = () => {
    const canvas = canvasRef.current;
    const audio = audioRef.current;
    const peaks = peaksRef.current;

    if (!canvas || !audio || !peaks) {
      requestAnimationFrame(renderFrame);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const numPoints = peaks.length;
    const progress = audio.duration ? audio.currentTime / audio.duration : 0;
    const playedBars = Math.floor(progress * numPoints);

    ctx.clearRect(0, 0, w, h);

    const bandWidth = w / numPoints;

    for (let i = 0; i < numPoints; i++) {
      const barHeight = Math.max(peaks[i] * h, 2);
      const x = i * bandWidth;
      const y = h - barHeight;
      ctx.fillStyle = i < playedBars ? PLAYED_COLOR : UNPLAYED_COLOR;
      ctx.fillRect(x, y, bandWidth, barHeight);
    }

    requestAnimationFrame(renderFrame);
  };

  renderFrame();
};

interface RenderMeterProps {
  meterFillRef: React.RefObject<HTMLDivElement | null>;
  analyserRef: React.RefObject<AnalyserNode | null>;
}

const METER_MIN_DB = -50;
const METER_SMOOTHING = 0.6;

// Live RMS level meter (in dB) read straight off the analyser's
// time-domain data — updates the fill width directly via a ref so it
// doesn't force a React re-render on every animation frame.
export const renderMeter = ({ meterFillRef, analyserRef }: RenderMeterProps) => {
  let buffer: Uint8Array<ArrayBuffer> | null = null;
  let smoothedLevel = 0;

  const renderFrame = () => {
    const meterFill = meterFillRef.current;
    const analyser = analyserRef.current;

    if (meterFill) {
      if (analyser) {
        if (!buffer || buffer.length !== analyser.fftSize) {
          buffer = new Uint8Array(analyser.fftSize);
        }
        analyser.getByteTimeDomainData(buffer);

        let sumSquares = 0;
        for (let i = 0; i < buffer.length; i++) {
          const normalized = (buffer[i] - 128) / 128;
          sumSquares += normalized * normalized;
        }
        const rms = Math.sqrt(sumSquares / buffer.length);
        const db = rms > 0 ? 20 * Math.log10(rms) : METER_MIN_DB;
        const level = Math.min(Math.max((db - METER_MIN_DB) / -METER_MIN_DB, 0), 1);
        smoothedLevel = smoothedLevel * METER_SMOOTHING + level * (1 - METER_SMOOTHING);
        meterFill.style.width = `${smoothedLevel * 100}%`;
      } else {
        smoothedLevel = 0;
        meterFill.style.width = "0%";
      }
    }

    requestAnimationFrame(renderFrame);
  };

  renderFrame();
};
