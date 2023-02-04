import React from 'react';
import Navbar from './Navbar';
import Footer1 from '../footers/homefooter';
import Headers from '../headers/ProfileHeader';



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