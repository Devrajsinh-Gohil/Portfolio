"use client"
import React, {useEffect,useState} from 'react'
import MobLanding from '@/components/Landing/MobLanding'



const Landing = () => {
    const [isMobile, setIsMobile] = useState(true)
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
    return (
         <MobLanding />
    )
};

export default Landing;