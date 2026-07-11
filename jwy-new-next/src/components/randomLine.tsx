"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface Props {
  trig: boolean;
  className?: string;
}

// Persists the last drawn path across remounts (e.g. mobile browser memory pressure)
let storedPath: string | null = null;

export default function RandomLine({ trig, className }: Props) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);
    const lineGenerator = d3.line();

    const points: [number, number][] = Array.from({ length: 12 }, () => [
      Math.random() * 100,
      Math.random() * 100,
    ]);
    const newPathD = lineGenerator(points) || "";

    let pathEl = svg.selectAll<SVGPathElement, unknown>("path");

    if (pathEl.empty()) {
      // On first mount: start at new position immediately.
      // On remount: start from last known position so transition picks up from there.
      pathEl = svg.append("path")
        .attr("fill", "none")
        .attr("class", "stroke-inherit")
        .attr("stroke-width", 1)
        .attr("d", storedPath ?? newPathD) as typeof pathEl;
    }

    pathEl
      .transition()
      .duration(storedPath ? 1000 : 0)
      .attr("d", newPathD);

    storedPath = newPathD;
  }, [trig]);

  return (
    <svg
      ref={ref}
      className={`w-full h-full ${className}`}
      viewBox="0 0 100 100"
      // preserveAspectRatio="none"
    ></svg>
  ) 
}
