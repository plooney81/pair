import React from 'react'
import pairLogoGif from '../img/pairLogo.gif';

export default function Home() {
    return (
        <div>
            <div className="d-flex justify-content-center">
                <img src={pairLogoGif} alt="Pair Logo gif"/>
            </div>
            <div className="d-flex flex-column align-items-center">
                <h1>Welcome to Pair</h1>
                <p>The Chat App for Pair Programmers</p>
            </div>
        </div>
    )
}
