'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
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
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous render

    const chunkWidth = Math.floor(width / wAmount);
    const chunkHeight = Math.floor(height / hAmount);

    // Generate random color
    const color = `rgb(${Math.floor(Math.random() * 135 + 120)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 135 + 120)})`;

    const lineData: { d: string }[] = [];

    for (let y = 0; y <= hAmount; y++) {
      for (let x = 0; x <= wAmount; x++) {
        const xPos = x * chunkWidth;
        const yPos = y * chunkHeight;
        const dir = Math.floor(Math.random() * 6);
        const controlX = xPos + chunkWidth / 2 + (Math.random() * 20 - 10);
        const controlY = yPos + chunkHeight / 2 + (Math.random() * 20 - 10);

        let path = '';
        if (dir === 0) {
          path = `M${xPos},${yPos} Q${controlX},${controlY} ${xPos + chunkWidth},${yPos}`;
        } else if (dir === 1) {
          path = `M${xPos + chunkWidth},${yPos} Q${controlX},${controlY} ${xPos + chunkWidth},${yPos + chunkHeight}`;
        } else if (dir === 2) {
          path = `M${xPos},${yPos + chunkHeight} Q${controlX},${controlY} ${xPos + chunkWidth},${yPos + chunkHeight}`;
        } else if (dir === 3) {
          path = `M${xPos},${yPos} Q${controlX},${controlY} ${xPos},${yPos + chunkHeight}`;
        } else if (dir === 4) {
          path = `M${xPos},${yPos} Q${controlX},${controlY} ${xPos + chunkWidth},${yPos + chunkHeight}`;
        } else if (dir === 5) {
          path = `M${xPos},${yPos + chunkHeight} Q${controlX},${controlY} ${xPos + chunkWidth},${yPos}`;
        }

        lineData.push({ d: path });
      }
    }

    // Bind and animate paths
    svg
      .attr('width', width)
      .attr('height', height)
      .style('opacity', 0) // initial invisible
      .transition()
      .duration(500)
      .style('opacity', 1); // fade in

    svg
      .selectAll('path')
      .data(lineData)
      .enter()
      .append('path')
      .attr('d', d => d.d)
      .attr('stroke', color)
      .attr('stroke-width', 1)
      .attr('fill', 'none')
      .attr('stroke-dasharray', function() {
        return this.getTotalLength();
      })
      .attr('stroke-dashoffset', function() {
        return this.getTotalLength();
      })
      .transition()
      .delay((_, i) => i * 4) // slight stagger
      .duration(800)
      .ease(d3.easeCubicOut)
      .attr('stroke-dashoffset', 0);

    setTimeout(() => setVisible(true), 100);

  }, [width, height, wAmount, hAmount]);

  return (
    <div
      id={styles.animationWrapper}
      className={`${styles.animationWrapper} ${visible ? styles.visible : ''}`}
      style={{ width, height }}
    >
      <svg ref={svgRef} />
    </div>
  );
};

export default RandomLines;
