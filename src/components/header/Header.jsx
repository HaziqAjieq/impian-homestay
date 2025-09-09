import React, { useEffect, useState, useRef } from "react";

import video1 from "../../assets/video/5590539-hd_1920_1080_30fps.mp4";
import video2 from "../../assets/video/4684101-hd_1920_1080_25fps.mp4";
import video3 from "../../assets/video/4241638-hd_1920_1080_30fps.mp4";
import { useTranslation } from "react-i18next";

export default function Header() {
  // translation
   const { t } = useTranslation()

  const videos = [ { id: "v1", src: video1 }, { id: "v2", src: video2 }, { id: "v3", src: video3 }, ];

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef([]);

  // Play the active video when index changes
  useEffect(() => {
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.play();
    }
  }, [currentVideoIndex]);

  // Handle video end -> go to next
  useEffect(() => {
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo) {
      currentVideo.onended = () => {
        const nextIndex = (currentVideoIndex + 1) % videos.length;
        setCurrentVideoIndex(nextIndex);
      };
    }
  }, [currentVideoIndex]);

  return (
    <div className="header-container relative w-full h-[600px] md:h-[800px] overflow-hidden mt-[-130px] rounded-b-none md:rounded-b-4xl z-0  ">
      {videos.map((video, index) => (
        <video
          key={video.id}
          ref={(el) => (videoRefs.current[index] = el)}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 opacity-70${
            index === currentVideoIndex ? "opacity-100 z-10" : " opacity-0 z-0"
          }`}
          src={video.src}
          loop={false}
          playsInline
          muted
        />
      ))}

      {/* Example content on top of background */}
      <div className="absolute inset-0 flex items-center z-20 bg-black/50 ">
        <div className="mx-10 md:mx-15 lg:mx-25  grid grid-cols-12 gap-3 items-center justify-center   ">

        
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold col-span-12 md:col-span-8 mx-0 my-0">
           {t("quote")}
        </h1>
          <p className="text-white text-sm sm:text-lg md:text-xl  font-semibold row-start-2 col-span-12 md:col-span-8 opacity-70 ">
            {t("description-header")}
          </p>
        </div>
      
      </div>
    </div>
  );
}


// quote to use
// “The perfect stop before your next journey begins.”
// background will be a loop of video
//
