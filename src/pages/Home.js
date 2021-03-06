import React, { useEffect, useState } from 'react'
import pairLogoGif from '../img/pairLogo.gif';
import './Home.css';

export default function Home() {
    return (
        <div>
            <div className="d-flex justify-content-center">
                <img src={pairLogoGif} alt="Pair Logo gif" className="mt-5 logo-gif"/>
            </div>
            <div className="d-flex flex-column align-items-center">
                <h1>Welcome to Pair</h1>
                <p>The Chat App for Pair Programmers</p>
            </div>
        </div>
    )
}
