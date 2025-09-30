"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface Props {
  trig: boolean;
}

export default function RandomLine({ trig }: Props) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);
    const lineGenerator = d3.line();

    // Generate new random points
    const points: [number, number][] = Array.from({ length: 12 }, () => [
      Math.random() * 100,
      Math.random() * 100,
    ]);

    const path = svg.selectAll("path").data([points]);

    // Update existing path with transition
    path
      .transition()
      .duration(1000) // 1-second smooth transition
      .attr("d", lineGenerator(points) || "");

    // Append path if it doesn't exist yet
    path
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "pink")
      .attr("stroke-width", 1)
      .attr("d", lineGenerator(points) || "");

  }, [trig]); // Re-run when `trig` changes

  return (
    <svg
      ref={ref}
      className="w-full h-full"
      viewBox="0 0 100 100"
      // preserveAspectRatio="none"
    ></svg>
  ) 
}
