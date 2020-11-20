import React, { useEffect, useState } from 'react'
import pairLogoGif from '../img/pairLogo.gif';

export default function Home() {
    //? Responsiveness addition
    const [windowWidth, setWindowWidth] = useState(null)
    const mediaQuery = {
        desktop: 1200,
        tablet: 768,
        phone: 576
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(document.body.clientWidth)
        })
    }, [])

    const responsivePic = {
        width: windowWidth < mediaQuery.phone ? '100%' : 'auto',
        borderRadius: '.25rem'
    }
    
    return (
        <div>
            <div className="d-flex justify-content-center">
                <img src={pairLogoGif} alt="Pair Logo gif" style={responsivePic} className="mt-5 logo-gif"/>
            </div>
            <div className="d-flex flex-column align-items-center">
                <h1>Welcome to Pair</h1>
                <p>The Chat App for Pair Programmers</p>
            </div>
        </div>
    )
}
