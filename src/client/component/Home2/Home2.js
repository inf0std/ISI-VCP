import React from 'react';
import DefaultNav from '../navBars/DefaultNav';
import Footer1 from './Footer/Footer1';
import Header from './Header/Header';
import "./Home2.css";



function Home2(props) {
    return (
        <div className='hom'>
            <DefaultNav />
            <Header />
            <Footer1 />
        </div>
    );
}

export default Home2;