import React from 'react';
import styles from'../styles/nav.module.css';

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <span className={styles.name}>Devrajsinh Gohil</span>
            <ul className={styles.menu}>
                <li>About Me</li>
                <li>Play</li>
                <li>Projects</li>
                <li>Contact</li>
            </ul>
        </nav>
    );
};

export default Nav;
