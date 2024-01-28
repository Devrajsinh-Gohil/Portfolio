"use client"
import React, { useEffect, useState } from 'react';
import styles from '../styles/nav.module.css';

const Nav = () => {
    const [isMobile, setIsMobile] = useState(false)

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
    
    if(isMobile){return}
    else{
        return (
            <nav className={styles.nav}>
                <span className={styles.name}><span className={styles.reslink}>Devrajsinh Gohil</span></span>
                <ul className={styles.menu}>
                    <li id='about'>About Me</li>
                    <li>Play</li>
                    <li>Projects</li>
                    <li>Contact</li>
                </ul>
            </nav>
        );
    }
};

export default Nav;
