"use client";

import { useState } from "react";
import Link from "next/link";
import RandomLine from "@/components/randomLine";

export default function Nav() {
  const [lineReDraw, setLineReDraw] = useState<boolean>(false);
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);

  function handleClick() {
    setLineReDraw((prev) => !prev);
    setDisplayMenu((prev) => !prev);
  }

  return (
    <nav className="
    fixed right-3 top-1 bg-none w-[100px] h-[100px] 
    md:right-5 md:top-5 md:w-[150px] md:h-[150px]
    flex items-center justify-center z-50">
      <button
        className="relative w-full h-full"
        onClick={handleClick}
      >
        <RandomLine trig={lineReDraw}/>
        <menu className="absolute bottom-0 right-0 text-pink text-xs">
          {
            displayMenu ?
              ''
              : 'menu'
          }
        </menu>
      </button>
      {
        displayMenu &&
         
          <menu 
            className="absolute top-0 r-[1rem] w-full h-full text-right text-small" 
            onClick={handleClick}
          >
            <ul className="relative flex flex-col justify-start items-end w-auto backdrop-invert-[60%] text-foreground z-50">
              <Link href={`/`} className="w-full text-left no-underline flex flex-col pointer-auto p-2 hover:bg-[var(--pink)] hover:text-black" >
                home
              </Link>
              <Link href={`/works`} className="w-full text-left no-underline flex flex-col pointer-auto p-2 hover:bg-[var(--pink)] hover:text-black" >
                works
              </Link>
              <Link href={`/web-design`} className="w-full text-left no-underline flex flex-col pointer-auto p-2 hover:bg-[var(--pink)] hover:text-black" >
                web design
              </Link>
              <Link href={`/cv`} className="w-full text-left no-underline flex flex-col pointer-auto p-2 hover:bg-[var(--pink)] hover:text-black" >
                cv
              </Link>
            </ul>
          </menu>
      }
      {
        displayMenu &&
        <div className="fixed top-0 left-0 w-full h-full" onClick={handleClick}>
            
        </div>
      }

    </nav>
  );
}
