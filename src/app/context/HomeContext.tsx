"use client"

import { ReactNode, RefObject, createContext, useEffect, useRef, useState } from "react";

type HomeContextData = {
    videoURL: string;
    isPlaying: boolean;
    videoRef: RefObject<HTMLVideoElement>;
    canvasRef: RefObject<HTMLCanvasElement>;
    configVideoURL: (url: string) => void;
    playPause: () => void;
}

export const HomeContext = createContext({} as HomeContextData);

type ProviderProps = {
    children: ReactNode;
}

const HomeContextProvider = ({children}: ProviderProps) => {
    const [videoURL, setVideoURL] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        console.log("video carregado");
        setVideoURL("video/video.mp4");
    }, []);

    const playPause = () => {
        const video = videoRef.current;
        if (isPlaying) {
            video?.pause();
        }
        else {
            video?.play();
            draw();
        }
        setIsPlaying(!isPlaying);
    }

    const draw = () => {
        const video = videoRef.current;
        if (video?.paused || video?.ended) {
            return;
        } 
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (video && canvas) {
            context?.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
        requestAnimationFrame(draw);
    }

    const configVideoURL = (url:string) => {
        setVideoURL(url);
    }

    return (
        <HomeContext.Provider value={
            {
                videoURL,
                isPlaying,
                videoRef,
                canvasRef,
                configVideoURL,
                playPause
        }}>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;