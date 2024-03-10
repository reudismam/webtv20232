'use client'

import { ChangeEvent, useContext } from "react";
import { HomeContext } from "./context/HomeContext";
import { FaPlay } from "react-icons/fa";

const Home = () => {
  const {
    videoURL,
    isPlaying,
    videoRef,
    canvasRef,
    currentTime,
    totalTime,
    configVideo,
    playPause,
    configCurrentTime,
  } = useContext(HomeContext);

  return (
    <main className="m-auto bg-[tomato] w-[80%] h-8">
      <div className="w-[640px]">
        <video ref={videoRef} controls src={videoURL} className="hidden"></video>

        <canvas ref={canvasRef} className="h-[360px] w-full bg-[tomato]">
        </canvas>
        <div className="bg-[black] w-full h-14">
          <input className="w-full"
            type="range"
            min="0"
            max={totalTime}
            value={currentTime}
            onChange={(e:ChangeEvent<HTMLInputElement>) => configCurrentTime(Number(e.target.value))}
          />
          <button className="text-white" onClick={playPause}><FaPlay /></button>
        </div>
      </div>
    </main>
  );
}

export default Home;
