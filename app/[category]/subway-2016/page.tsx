"use client"; // client component
import { useEffect, useState } from "react";
import Link from 'next/link';
import styles from "@/app/ui/subway.module.css";


const returnStr = "<---";
const links = [
  "spRQR7xBG3g",
  "-4kpwJKwZ8Q",
  "US-81APdmFM",
  "hawErPK95Ak",
  "bRrMaBHg8Ug",
  "1vIiw26kOrI",
  "PDeznrE5mVk",
  "4ZmNfeSgIpg",
  "xGTYk31Py3g",
];

function Subway() {
  const [players, setPlayers] = useState<YT.Player[]>([]);

  
  // Load YouTube API dynamically
  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.YT && window.YT.Player) {
          initializePlayers();
        } else {
          window.onYouTubeIframeAPIReady = initializePlayers;
        }
      };
    }
  }, []);
  
  const initializePlayers = () => {
    const newPlayers = links.map((videoId, index) => {
      return new window.YT.Player(`video-${index}`, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          rel: 0,
          controls: 0,
        },
        events: {
          onReady: (event: YT.PlayerEvent) => event.target.playVideo(),
        },
      });
    });

    setPlayers(newPlayers);
  };
  const muteAllVideos = () => {
    players.forEach((player) => player?.mute());
  };

  const unmuteAllVideos = () => {
    players.forEach((player) => player?.unMute());
  };
  const playAllVideos = () => {
    players.forEach((player) => player?.playVideo());
  };

  const pauseAllVideos = () => {
    players.forEach((player) => player?.pauseVideo());
  };

  return (

    <div className={styles.mainContainer}>
      <div id={styles.buttonWrapper}>
        <button id={styles.button} onClick={muteAllVideos}>
          Mute All
        </button>
        <button id={styles.button} onClick={unmuteAllVideos}>
          Unmute All
        </button>
        <button id={styles.button} onClick={playAllVideos}>
          Play All
        </button>
        <button id={styles.button} onClick={pauseAllVideos}>
          Pause All
        </button>
      </div>
      <Link href="/webprojects">
        <div id={styles.returnLink}>
          {returnStr} <br />
          back <br />
          to <br />
          web <br />
          projects <br />
        </div>
      </Link>
      {
        links.map((_, idx) => (
          <div key={idx} id={`video-${idx}`} className={styles.videos}></div>
        ))
      }
    </div>
  );
}

export default Subway;
