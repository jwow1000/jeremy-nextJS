"use client";

import React from "react";

interface SoundEmbedProps {
  url: string;
  width?: string;
  height?: string;
}

const SoundEmbed: React.FC<SoundEmbedProps> = ({
  url,
  width = "100%",
  height = "180px",
}) => {
  const getEmbedUrl = (url: string) => {
    if (url.includes("mixcloud.com")) {
      const mixcloudPath = url.replace("https://www.mixcloud.com/", "");
      return `https://www.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2F${encodeURIComponent(
        mixcloudPath
      )}`;
    } else if (url.includes("soundcloud.com")) {
      return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl(url);

  if (!embedUrl) {
    return <p>Unsupported URL. Please provide a Mixcloud or SoundCloud link.</p>;
  }

  return (
    <div 
      key={url} 
      style={{ position: "relative", width, height }}
    >
      <iframe
        className="w-full"
        width="100%"
        height="100%"
        allow="autoplay"
        src={embedUrl}
      ></iframe>
    </div>
  );
};

export default SoundEmbed;
