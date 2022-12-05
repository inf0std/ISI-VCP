import React from 'react';
import { useState } from "react";
import './Video.css'
import img1 from './img1.jpg'
import img2 from './img2.jpg'
import img3 from './img3.jpg'
import img4 from './img4.jpg'
import img5 from './img5.jpg'
const Video = () => {
    const [microphone, setMicrophone] = useState(true);
    const [phone, setPhone] = useState(true);
    const [screen, setScreen] = useState(false)

    const call = () => { }
    const hangup = () => { }
    const handlePhoneClick = () => {
        if (phone) {
            call()
            setPhone(false)
        }
        else {
            hangup()
            setPhone(true)
        }
    }

    const toggleAudio = () => {
        setMicrophone(!microphone)
    }
    const handleShareScreenClick = () => {
        if (!screen) {
            setScreen(!screen)
        }
        else {
            setScreen(!screen)
        }
    }
    return (

        <section >
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
            <div className='container'>
                <div className='top-icons'>
                    <a href='#'><i className='bx bx-search'></i></a>

                </div>
                <div>
                    <img src={img1} alt="img1" className='bear-picture' />
                    <div className='iconss'>
                        <a href='#'><i className='bx bx-chat'></i></a>
                        <a href='#' onClick={() => toggleAudio()}>{microphone ? <i className='bx bx-microphone'></i> : <i className='bx bx-microphone-off'></i>}</a>
                        <a href='#' onClick={() => handlePhoneClick()}>   {phone ? <i className='bx bx-phone'></i> : <i className='bx bx-phone-off'></i>}</a>
                        <a href='#' onClick={() => handleShareScreenClick()}>   <i className='bx bx-cast'></i></a>
                    </div>
                </div>

                <div className='people'>
                    <img src={img2} alt='img2' />
                    <img src={img3} alt='img3' />
                    <img src={img4} alt='img4' />
                    <img src={img5} alt='img5' />

                </div>
            </div>
            <div className='header'>
                <nav>
                    <div className='icons'  >

                        <li><a href='#'><i className='bx bxs-user-voice' ></i> </a></li>
                        <li><a href='#'><i className='bx bxs-camera-movie'></i></a></li>
                        <li><a href='#'><i className='bx bxs-chat'></i> </a></li>
                        <li><a href='#'><i className='bx bxs-bell'></i></a></li>
                        <li><a href='#'><i className='bx bx-group'></i></a></li>
                        <li><a href='#'><i className='bx bxs-cog'></i></a></li>

                    </div>
                </nav>
            </div>

        </section>
    );
};

export default Video;