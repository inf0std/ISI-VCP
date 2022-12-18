import "./Nav.css"
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import logo from "./logo.png";
import { Link } from 'react-router-dom';
function Nav() {
    const [contact, setcontact] = useState(false)
    const [home, sethome] = useState(false)
    const Contact = () => {
        if (contact === false) {
            setcontact(true)
            sethome(false)
        } else {
            setcontact(false)
            sethome(true)
        }

    }
    const Home = (e) => {
        e.preventdefault()
        if (home === false) {

            setcontact(false)
            sethome(true)
        } else {
            setcontact(true)
            sethome(false)
        }
    }
    return (
        <nav className="nav" >
            <header className="hdr">SEEN</header>
            <ul className="liste">
                <li ><a href="Home2" className={home ? "activ" : "nav_item1"} onClick={Home}>Home</a></li>
                <li ><a href="Contacts" className={contact ? "activ" : "nav_item2"} onClick={Contact}>Contacts</a></li>
            </ul>
            <Link to='/ConnexionetInscription'><Button variant="outline-info" className="button">Se Connecter</Button>{' '}</Link>
            <img src={logo} alt="logo" />
        </nav>



    );
}

export default Nav;