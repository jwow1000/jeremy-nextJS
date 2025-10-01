export {};

declare global {
  // YouTube API Types
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }

  namespace YT {
    interface PlayerEvent {
      target: Player;
    }

    interface Player {
      playVideo: () => void;
    }

    interface Player {
      playVideo(): void;
      pauseVideo(): void;
      stopVideo(): void;
      mute(): void; 
      unMute(): void;
      destroy(): void;
    }
  }
}

// Ensure TypeScript recognizes `three` module
declare module "three";
