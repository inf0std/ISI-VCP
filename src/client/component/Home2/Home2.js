import React from 'react';
import Navbar from './Navbar';
import Footer1 from './Footer/Footer1';
import Headers from './Header/Headers';
import "./Home2.css";



function Home2() {
    return (
        <div style={{backgroundColor:'#a0969665'}}>
            <Navbar />
            <Headers />
            <Footer1 />
        </div>
    );
}

export default Home2;