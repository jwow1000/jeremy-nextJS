import React from "react";

const CustomVideoPlayer = ({ src, autoplay = false, loop = false }: { src: string | undefined; autoplay?: boolean;  loop?: boolean;}) => {
  return (
    <div style={{ position: "relative", width: "100%"}}>
      <video
        src={src}
        autoPlay={autoplay}
        loop={loop}
        controls
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "none",
          display: "block",
        }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default CustomVideoPlayer;
