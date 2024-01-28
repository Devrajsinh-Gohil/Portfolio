"use client"
import React, { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import styles from '../styles/landing/landing.module.css'
import mob_styles from '../styles/landing/mob_landing.module.css'
import { TbDevices2 } from "react-icons/tb";
import { IoShareSocialOutline } from "react-icons/io5";
import { HiOutlineQueueList } from "react-icons/hi2";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FaCircleCheck } from "react-icons/fa6";
import { FiPlusCircle } from "react-icons/fi";
import { PiCaretDown, PiShuffleBold, PiSkipBackFill, PiSkipForwardFill, PiPlayCircleFill, PiPauseCircleFill } from "react-icons/pi";
import { LuRepeat1 } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import ReactCardFlip from 'react-card-flip'
import Tilt from 'react-parallax-tilt'
import Marquee from 'react-fast-marquee'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, updateDoc, onSnapshot, increment } from 'firebase/firestore';
import Link from 'next/link';
import Loading from '@/app/loading'


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
    const audioRef = useRef(null);
    const [isMobile, setIsMobile] = useState(true)
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [flipped, setflipped] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [delayLoop, setDelayLoop] = useState(true)
    const [delayLoop2, setDelayLoop2] = useState(true)
    const [glare, setGlare] = useState(true)
    const [isSpinning, setIsSpinning] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

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
        setIsSpinning(true);
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
        setTimeout(() => {
            setIsSpinning(false);
        }, 200);
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
        if (audioRef.current) {
            audioRef.current.addEventListener('timeupdate', () => {
                setCurrentTime(audioRef.current.currentTime);
                setDuration(audioRef.current.duration);
            });
        }
    }, []);

    const handleTimeUpdate = (e) => {
        if (audioRef.current) {
            audioRef.current.currentTime = e.target.value;
            setCurrentTime(audioRef.current.currentTime);
        }
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

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
    const setDelayedLoop2 = () => {
        setDelayLoop2(false);
        setTimeout(() => {
            setDelayLoop2(true);
        }, 1000);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 2000ms delay

        return () => clearTimeout(timer); // Clean up on component unmount
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <section>
                <audio ref={audioRef} name="audio" id="audio" src="/song.mp3" controls autoPlay loop className={styles.audio} />
                <div className={mob_styles.mob_landing_container}>
                    <div className={mob_styles.mob_header_container}>
                        <PiCaretDown className={mob_styles.header_arrow} />
                        <div className={mob_styles.header_text}>
                            <span className={mob_styles.mob_header_container_1}>
                                PLAYING FROM
                            </span>
                            <span className={mob_styles.mob_header_container_2}>
                                India
                            </span>
                        </div>
                        <BsThreeDotsVertical className={mob_styles.header_menu} />
                    </div>
                    <div className={mob_styles.mob_dp_container}>
                        <Image src="/dp.jpg" alt="Landing Image" width={250} height={250} className={mob_styles.mob_dp} />
                    </div>
                    <div className={mob_styles.mob_player_container}>
                        <div className={mob_styles.player}>
                            <div className={mob_styles.song}>
                                <div className={mob_styles.song_name}>
                                    <div className={mob_styles.name}>
                                        <Marquee speed={20} delay={1} play={delayLoop} onCycleComplete={() => setDelayedLoop()}>
                                            Blue Bird but is it okay if it&apos;s lofi? &nbsp; &nbsp; &nbsp; &nbsp;
                                        </Marquee>
                                    </div>
                                    <div className={mob_styles.artist}>
                                        <Marquee speed={20} delay={1} play={delayLoop2} onCycleComplete={() => setDelayedLoop2()}>
                                            I&apos;m Devrajsinh, and I am not the composer of this song. But you can give a like to this portfolio by clicking the plus icon according to latest spotify update.... &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                                        </Marquee>
                                    </div>
                                </div>
                                <div className={mob_styles.song_likes}>
                                    <div className={mob_styles.like}>
                                        {isLiked ? (
                                            <FaCircleCheck className={`${styles.like_icon} ${isSpinning ? 'spin' : ''}`} onClick={handleLike} style={{ fontSize: '2rem' }} />
                                        ) : (
                                            <FiPlusCircle className={mob_styles.plus_icon} onClick={handleLike} style={{ fontSize: '2rem' }} />
                                        )}
                                    </div>
                                    <div className={`${isLiked ? mob_styles.like_count_g : mob_styles.like_count_w}`}>{likes}</div>
                                </div>
                            </div>
                            <input type="range" min={0} max={duration} value={currentTime} onChange={handleTimeUpdate} className={mob_styles.progbar} step={0.01} />
                            <div className={mob_styles.timer}><span>{formatTime(currentTime)}</span> <span>{formatTime(duration)}</span></div>
                            <div className={mob_styles.icon}>
                                <PiShuffleBold style={{ fontSize: '1.8rem' }} className={mob_styles.disabled} />
                                <div className={mob_styles.player_icon}>
                                    <button className={mob_styles.player_btn}>
                                        <PiSkipBackFill onClick={handleSkipPrevious} style={{ fontSize: '2rem' }} />
                                    </button>
                                    <button className={mob_styles.player_btn}>
                                        {isPlaying ? (
                                            <PiPauseCircleFill className={mob_styles.play} onClick={handlePlayPause} fontSize='large' style={{ fontSize: '4.5rem' }} />
                                        ) : (
                                            <PiPlayCircleFill className={mob_styles.play} onClick={handlePlayPause} fontSize='large' style={{ fontSize: '4.5rem' }} />
                                        )}
                                    </button>
                                    <button className={mob_styles.player_btn}>
                                        <PiSkipForwardFill fontSize="large" onClick={handleSkipNext} style={{ fontSize: '2rem' }} />
                                    </button>
                                </div>
                                <LuRepeat1 style={{ fontSize: '1.8rem' }} className={mob_styles.locked} />
                            </div>
                            <div className={mob_styles.icons_extra}>
                                <span>
                                    <TbDevices2 style={{ fontSize: '1.35rem' }} />
                                </span>
                                <span className={mob_styles.icons_extra_grp}>
                                    <IoShareSocialOutline style={{ fontSize: '1.35rem' }} />
                                    <HiOutlineQueueList style={{ fontSize: '1.35rem' }} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={mob_styles.mob_bio_section} id='lyrics'>
                <div className={mob_styles.mob_bio_container}>
                    <div className={mob_styles.mob_bio_header}>
                        <span>
                            <button className={mob_styles.lyrics_btn}><Link href="#lyrics" className={mob_styles.link}>Lyrics</Link></button>
                        </span>
                    </div>
                    <div className={mob_styles.mob_bio_body}>
                        <span>
                            Welcome to my portfolio, where I code the melody,
                            Devrajsinh Gohil, the maestro of technology.
                            In the symphony of bytes, a creator I be,
                            Crafting solutions with a passion, just wait and see.

                            Tech Symphony, where ideas come alive,
                            From web apps to mobile, in code, we'll thrive.
                            Explore my world, where creativity's unfurled,
                            Join me on this journey, let's create a wonderworld.

                            A love for tech, a knack for the code,
                            Innovation's my compass, on this path I rode.
                            Elegant solutions, efficiency in stride,
                            In the realm of development, I take my pride.

                            This website, a portal to my creation,
                            A showcase of dreams, a digital sensation.
                            Dive into the lines, where creativity flows,
                            A symphony of code, where the magic grows.

                            So, here's my invitation, let's create something divine,
                            In the realm of code and creativity, together we'll shine.
                            Welcome to my world, where innovation's the key,
                            Devrajsinh Gohil, the Code Maestro, in Tech Symphony.
                        </span>
                    </div>
                </div>
            </section>
            <section className={mob_styles.mob_artist_section} id='artist'>
                <div className={mob_styles.mob_artist_container}>
                    <div className={mob_styles.mob_artist_header}>
                        <span>
                            <button className={mob_styles.lyrics_btn}><Link href="#artist" className={mob_styles.link}>Artist of the Music</Link></button>
                        </span>
                    </div>
                    <div className={mob_styles.mob_artist_body}>
                        <div className={mob_styles.mob_artist}>
                            <span className={mob_styles.mob_artist_name}>Kijugo</span>
                            <span className={mob_styles.mob_artist_followers}>190K+ followers</span>
                        </div>
                        <div className={mob_styles.mob_artist_btn}>
                            <a href='https://open.spotify.com/artist/7HjVvgY9p57LOIrGyulrVU' target='_blank'>Follow</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};

export default Landing;


