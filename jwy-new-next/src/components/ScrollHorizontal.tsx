'use client'

import { useEffect, useRef } from "react";
import { ReactNode } from "react";

interface ScrollHorizontalProps {
  children: ReactNode;
  className?: string;
  scrollSpeed?: number;
}

export default function ScrollHorizontal({children, className, scrollSpeed = 2}: ScrollHorizontalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      // Check if there's vertical scroll capability
      const hasVerticalScroll = scrollContainer.scrollHeight > scrollContainer.clientHeight;
      
      // If scrolling vertically and there's vertical content, allow normal scroll
      if (hasVerticalScroll && e.deltaY !== 0 && e.deltaX === 0) {
        return;
      }

      // Prevent default vertical scroll
      e.preventDefault();
      
      // Convert vertical scroll to horizontal scroll
      scrollContainer.scrollLeft += (e.deltaY + e.deltaX) * scrollSpeed;
    };

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);
  
  return (
    <div
      ref={scrollRef}
      className={`h-full flex flex-row no-wrap shrink-0 overflow-x-auto overflow-y-hidden whitespace-nowrap scroll-smooth
        [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden    
      ${className ? className : ""}`}
    >
      {children}
    </div>
  );
}
