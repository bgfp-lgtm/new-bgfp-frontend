import React from "react";

type Props = {
  url: string;
  poster?: string; // Add optional poster
};

export default function VideoComponent({ url, poster }: Props) {
  return (
    <div className="object-cover w-full h-full">
      <video
        autoPlay
        loop
        muted={true}
        playsInline
        poster={poster}
        className="w-full h-full object-cover"
        preload="auto"
        aria-hidden="true"
      >
        <source src={url} />
      </video>
    </div>
  );
}
