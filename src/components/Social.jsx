
import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailIcon from '@mui/icons-material/Mail';

import styles from '../styles/nav.module.css'

const Social = () => {
    return (
        <div className={styles.soc}>
        <a href="mailto:devrajsinhgohil03@gmail.com" rel="noopener noreferrer">
            <MailIcon/>
        </a>
        <a href="https://www.linkedin.com/in/devrajsinh/" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
        </a>
        <a href="https://github.com/Devrajsinh-Gohil" target="_blank" rel="noopener noreferrer">
            <GitHubIcon />
        </a>
        <a href="https://twitter.com/DevrajsinhGohi5" target="_blank" rel="noopener noreferrer">
            <TwitterIcon />
        </a>
        <a href="https://www.instagram.com/_devrajsinh_gohil/" target="_blank" rel="noopener noreferrer">
            <InstagramIcon/>
        </a>
        </div>
    );
};

export default Social;
