'use client'

import { useContext } from "react";
import { HomeContext } from "./context/HomeContext";

const Home = () => {
  const {
    videoURL,
    isPlaying,
    videoRef,
    canvasRef,
    configVideoURL,
    playPause,
    
  } = useContext(HomeContext);

  return (
    <main className="m-auto bg-[tomato] w-[80%] h-8">
        <h1 className="text-white font-bold text-lg text-center">Video {videoURL}</h1>

        <video ref={videoRef} controls src={videoURL} className="hidden"></video>

        <canvas ref={canvasRef} className="w-[464px] h-[256px] bg-[tomato]">

        </canvas>

        <button onClick={playPause}>play/pause</button>
    </main>
  );
}

export default Home;
