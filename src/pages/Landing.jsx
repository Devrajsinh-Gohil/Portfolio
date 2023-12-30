"use client"
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import styles from '../styles/landing/landing.module.css'
import mob_styles from '../styles/landing/mob_landing.module.css'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReactCardFlip from 'react-card-flip'
import Tilt from 'react-parallax-tilt'
import Marquee from 'react-fast-marquee'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, updateDoc, onSnapshot, increment } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDhOD1F3C_x5jmKB_djrH7NZ7WOUJPaVc4",
    authDomain: "portfolio-78f40.firebaseapp.com",
    projectId: "portfolio-78f40",
    storageBucket: "portfolio-78f40.appspot.com",
    messagingSenderId: "781020140490",
    appId: "1:781020140490:web:15fa4a02de57e8eb32b533",
    measurementId: "G-G648NS39X1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);




const Landing = () => {
    const [isMobile, setIsMobile] = useState(true)
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [flipped, setflipped] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [delayLoop, setDelayLoop] = useState(true)
    const [glare, setGlare] = useState(true)
    const flip = useCallback(() => {
        flipped ? setflipped(false) : setflipped(true);
        setGlare(false);
        setTimeout(() => {
            setGlare(true);
        }, 1000);
    }, [flipped]);

    useEffect(() => {
        const likesRef = doc(db, 'likes', 'likeCount');
        onSnapshot(likesRef, (doc) => {
            setLikes(doc.data().count);
        });
        // Check if the user has already liked
        const likedStatus = localStorage.getItem('hasLiked');
        if (likedStatus) {
            setHasLiked(true);
            setIsLiked(true);
        }
    }, []);

    const handleLike = () => {
        if (!hasLiked) {
            const likesRef = doc(db, 'likes', 'likeCount');
            updateDoc(likesRef, {
                count: increment(1),
            });
            setHasLiked(true);
            setIsLiked(!isLiked)

            // Store the like status in localStorage
            localStorage.setItem('hasLiked', 'true');
        } else {
            const likesRef = doc(db, 'likes', 'likeCount');
            updateDoc(likesRef, {
                count: increment(-1),
            });
            setHasLiked(false);
            setIsLiked(!isLiked)
            // Remove the like status from localStorage
            localStorage.removeItem('hasLiked');
        }
    };

    const handleResize = () => {
        if (window.innerWidth < 600) {
            setIsMobile(true)
            console.log('mobile')
        } else {
            setIsMobile(false)
            console.log('desktop')
        }
    }
    useEffect(() => {
        if (window.innerWidth < 600) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }, [setIsMobile])
    // create an event listener
    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })

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

    const setDelayedLoop = () => {
        setDelayLoop(false);
        setTimeout(() => {
            setDelayLoop(true);
        }, 1000);
    };

    if (!isMobile) {
        return (
            <>
                <div>
                    <div className={styles.cover}></div>
                    <audio name="audio" id="audio" src="/song.mp3" controls autoPlay loop className={styles.audio} />
                    <video autoPlay muted loop className={styles.vid}>
                        <source src="mov.mp4" type="video/mp4" />
                    </video>
                    <div className={styles.card}>

                        <ReactCardFlip flipDirection='horizontal' isFlipped={flipped}>
                            <Tilt
                                glareEnable={true}
                                glareMaxOpacity={0.45}
                                glarePosition="all"
                                glareBorderRadius="20px"
                                tiltMaxAngleX="5"
                                tiltMaxAngleY="5"
                            >
                                <div className={styles.front} onClick={flip}>
                                    <div className={styles.bio}>
                                        <Image src="/dp.jpg" alt="Landing Image" width={250} height={250} className={styles.dp} />
                                        <div className={styles.side}>
                                            <div className={styles.biodata}>
                                                <span>Artist: Devrajsinh Gohil ✌️</span>
                                                <span>Title: Code Maestro</span>
                                                <span>Genre: Tech Symphony</span>
                                                <span>Duration: On Repeat</span>
                                            </div>

                                            <div className={styles.player}>
                                                <input type="range" min={0} max={duration} value={currentTime} onChange={handleTimeUpdate} className={styles.progbar} />
                                                <div className={styles.icon}>
                                                    <SkipPreviousIcon fontSize="large" onClick={handleSkipPrevious} />
                                                    {isPlaying ? (
                                                        <PauseCircleIcon className={styles.play} onClick={handlePlayPause} fontSize='large' />
                                                    ) : (
                                                        <PlayCircleIcon className={styles.play} onClick={handlePlayPause} fontSize='large' />
                                                    )}
                                                    <SkipNextIcon fontSize="large" onClick={handleSkipNext} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tilt>
                            < Tilt
                                glareEnable={true}
                                glareMaxOpacity={0.45}
                                glarePosition="all"
                                glareBorderRadius="20px"
                                tiltMaxAngleX="5"
                                tiltMaxAngleY="5"
                            >
                                <div className={styles.back} onClick={flip}>
                                    <span>
                                        "Welcome to my portfolio website! I'm Devrajsinh Gohil, a passionate Code Maestro and creator of Tech Symphony. With a love for technology and a knack for coding, I strive to create innovative and impactful solutions. Through this website, I invite you to explore my work and get a glimpse into my world of software development. From web applications to mobile apps, I'm dedicated to crafting elegant and efficient solutions that bring ideas to life. Join me on this journey as we dive into the realm of code and creativity. Let's create something amazing together!"
                                    </span>
                                </div>
                            </Tilt>
                        </ReactCardFlip>
                    </div>
                </div>
            </>
        );
    }
    else {
        return (
            <>
                <audio name="audio" id="audio" src="/song.mp3" controls autoPlay loop className={styles.audio} />
                <div className={mob_styles.mob_landing_container}>
                    <div className={mob_styles.mob_header_container}>Header</div>
                    <div className={mob_styles.mob_dp_container}>
                        <Image src="/dp.jpg" alt="Landing Image" width={250} height={250} className={mob_styles.mob_dp} />
                    </div>
                    <div className={mob_styles.mob_player_container}>
                        <div className={mob_styles.player}>
                            <div className={mob_styles.song}>
                                <div className={mob_styles.song_name}>
                                    <div className={mob_styles.name}>
                                        <Marquee speed={30} delay={1} play={delayLoop} onCycleComplete={() => setDelayedLoop()}>
                                            Blue Bird but is it okay if it's lofi? &nbsp; &nbsp; &nbsp; &nbsp;
                                        </Marquee>
                                    </div>
                                    <div className={mob_styles.artist}>
                                        Artist: Kijugo
                                    </div>
                                </div>
                                <div className={mob_styles.song_likes}>
                                    <div className={mob_styles.like}>
                                        {isLiked ? (
                                            <FavoriteIcon className={styles.like_icon} onClick={handleLike} style={{ fontSize: '2rem' }} />
                                        ) : (
                                            <FavoriteBorderIcon className={styles.play_icon} onClick={handleLike} style={{ fontSize: '2rem' }} />
                                        )}
                                    </div>
                                    <div className={mob_styles.like_count}>{likes}</div>
                                </div>
                            </div>
                            <input type="range" min={0} max={duration} value={currentTime} onChange={handleTimeUpdate} className={styles.progbar} />
                            <div className={mob_styles.icon}>
                                <SkipPreviousIcon fontSize="large" onClick={handleSkipPrevious} style={{ fontSize: '3.5rem' }} />
                                {isPlaying ? (
                                    <PauseCircleIcon className={mob_styles.play} onClick={handlePlayPause} fontSize='large' style={{ fontSize: '4.5rem' }} />
                                ) : (
                                    <PlayCircleIcon className={mob_styles.play} onClick={handlePlayPause} fontSize='large' style={{ fontSize: '4.5rem' }} />
                                )}
                                <SkipNextIcon fontSize="large" onClick={handleSkipNext} style={{ fontSize: '3.5rem' }} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className={styles.mob_bio}>

                    <div className={styles.mob_side}>
                        <div className={styles.mob_biodata}>
                            <span>Artist: Devrajsinh Gohil ✌️</span>
                            <span>Title: Code Maestro</span>
                            <span>Genre: Tech Symphony</span>
                            <span>Duration: On Repeat</span>
                        </div>


                    </div>
                </div> */}
            </>
        )
    }
};

export default Landing;


