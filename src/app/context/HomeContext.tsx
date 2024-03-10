"use client"

import { ReactNode, RefObject, createContext, useEffect, useRef, useState } from "react";

import videos from "../data/videos";

type HomeContextData = {
    videoURL: string;
    isPlaying: boolean;
    videoRef: RefObject<HTMLVideoElement>;
    canvasRef: RefObject<HTMLCanvasElement>;
    currentTime: number;
    totalTime: number;
    configVideo: (videoIndex: number) => void;
    playPause: () => void;
    configCurrentTime: (time: number) => void;
}

export const HomeContext = createContext({} as HomeContextData);

type ProviderProps = {
    children: ReactNode;
}

const HomeContextProvider = ({children}: ProviderProps) => {
    const [videoURL, setVideoURL] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [videoIndex, setVideoIndex] = useState(1);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        configVideo(videoIndex);
    }, []);

    useEffect(()=> {
        const video = videoRef.current;
        if (video && videoURL && videoURL.length > 0) {
        video.onloadedmetadata = () => {
            setCurrentTime(0);
            setTotalTime(video.duration);

            if (isPlaying) {
                video.play();
                draw();
            }
        }

        video.ontimeupdate = () => {
            setCurrentTime(video.currentTime);

            
        }

        video.onended = () => {
            configVideo(videoIndex + 1);
        }

       }
    }, [videoURL, currentTime, videoIndex]);

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

    const configCurrentTime = (time:number) => {
        const video = videoRef.current;
        if (video) {
            video.currentTime = time;
        }
        setCurrentTime(time);
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

    const configVideo = (videoIndex: number) => {
        const nextIndex = videoIndex % videos.length;
        const nextVideoURL = videos[nextIndex].videoURL;
        setVideoIndex(nextIndex);
        setVideoURL(nextVideoURL);
    }

    return (
        <HomeContext.Provider value={
            {
                videoURL,
                isPlaying,
                videoRef,
                canvasRef,
                currentTime,
                totalTime,
                configVideo,
                playPause,
                configCurrentTime
        }}>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;