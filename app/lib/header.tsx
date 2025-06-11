'use client'

import Image from "next/image";
import Link from "next/link";
import NavLink from "./navLink";
import RandomLines from "./randomLinesD3";
import { useEffect, useState, useRef } from "react";
import styles from "@/app/ui/header.module.css";

interface WindowSize {
  width: number
  height: number
}

export default function Header() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [viewSize, setViewSize] = useState<WindowSize>({
    width: 800,
    height: 100
  }) 
  
  useEffect(() => {
    
    // Handler to call on window resize
    function handleResize() {
      if (typeof window !== "undefined") {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
    
        timeoutRef.current = setTimeout(() => {
          
          setViewSize({
            // width: window.innerWidth,
            // height: window.innerHeight,
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight

          })
        }, 300);
      }
    }
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Call handler right away so state gets updated with initial window size
    handleResize()
    
    // Remove event listener on cleanup
    if (typeof window !== "undefined") {
      return () => window.removeEventListener('resize', handleResize)
    }
  }, []);

  return (
    <header className={styles.wrapper}>
      <RandomLines  
        width={viewSize.width}
        height={200}
        wAmount={20}
        hAmount={5}
      />
      <Link href="/" className={styles.logoWrapper}>
        <Image
          className={styles.logo}
          src="/jwy_logo_24.svg"
          alt="handwritten style logo Jeremy Wiles-Young"
          width={150}
          height={150}
          priority
        />
      </Link>
      <ul className={styles.navWrapper}>
        <li>
          <NavLink href="/" className={styles.link} activeClassName={styles.activeLink}>home</NavLink>
        </li>
        <li>
          <NavLink href="/objects" className={styles.link} activeClassName={styles.activeLink}>objects</NavLink>
        </li>
        <li>
          <NavLink href="/sounds" className={styles.link} activeClassName={styles.activeLink}>sounds</NavLink>
        </li>
        <li>
          <NavLink href="/videos" className={styles.link} activeClassName={styles.activeLink}>videos</NavLink>
        </li>
        <li>
          <NavLink href="/webprojects" className={styles.link} activeClassName={styles.activeLink}>web projects</NavLink>
        </li>
        <li>
          <NavLink href="/cv" className={styles.link} activeClassName={styles.activeLink}>cv</NavLink>
        </li>
        
      </ul>
    
    </header>
  );
}