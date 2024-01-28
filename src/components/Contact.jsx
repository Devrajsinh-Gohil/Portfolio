'use client'
import React, { useEffect } from "react";
const audio = new Audio("/song.mp3");

const Contact = () => {
  useEffect(() => {
    audio.play();
  }, []);

  return (
    <div>
      <h1>Contact Page</h1>
      <p>This is the contact page.</p>
    </div>
  );
};

export default Contact;
