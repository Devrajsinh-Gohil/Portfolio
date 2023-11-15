"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import styles from '../styles/nav.module.css'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';



const Landing = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    
    useEffect(() => {
        const audio = document.getElementById('audio');
        audio.addEventListener('timeupdate', () => {
            setCurrentTime(audio.currentTime);
            setDuration(audio.duration);
        });
    }, []);
    
    const handleTimeUpdate = (e) => {
        const audio = document.getElementById('audio');
        audio.currentTime = e.target.value;
        setCurrentTime(audio.currentTime);
    };
    
    const handlePlayPause = () => {
        const audio = document.getElementById('audio');
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play();
            setIsPlaying(true);
        }
    };


    

        const handleSkipPrevious = () => {
            const audio = document.getElementById('audio');
            audio.currentTime = 0;
            setCurrentTime(audio.currentTime);
        };

        const handleSkipNext = () => {
            const audio = document.getElementById('audio');
            audio.currentTime = duration;
            setCurrentTime(audio.currentTime);
        };

        return (
            <>
                <div>
                    <div className={styles.cover}></div>
                    <video autoPlay muted loop className={styles.vid}>
                        <source src="mov.mp4" type="video/mp4"/>
                    </video>
                    <div className={styles.card}>
                        <div className={styles.bio}>
                            <Image src="/dp.jpg" alt="Landing Image" width={250} height={250} className={styles.dp} />
                            <div className={styles.side}>
                                <div className={styles.biodata}>
                                    <span>Artist: Devrajsinh Gohil</span>
                                    <span>Title: Code Maestro</span>
                                    <span>Genre: Tech Symphony</span>
                                    <span>Duration: On Repeat</span>
                                </div>
                            
                                <div className={styles.player}>
                                    <input type="range" min={0} max={duration} value={currentTime} onChange={handleTimeUpdate} className={styles.progbar} />
                                    <div className={styles.icon}>
                                        <SkipPreviousIcon fontSize="large" onClick={handleSkipPrevious} />
                                        {isPlaying ? (
                                            <PauseCircleIcon className={styles.play} onClick={handlePlayPause} fontSize='large'/>
                                        ) : (
                                            <PlayCircleIcon className={styles.play} onClick={handlePlayPause} fontSize='large'/>
                                        )}
                                        <SkipNextIcon fontSize="large" onClick={handleSkipNext} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <audio name="audio" id="audio" src="/song.mp3" controls autoPlay loop className={styles.audio} />
            </>
        );
    };

    export default Landing;


