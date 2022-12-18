import React from 'react';
import { Tab, Tabs } from "react-bootstrap";
// import {Fragment}  from "react";
import Inscription from "./Inscription/Inscription";
import Connexion from "./Connexion/Connexion";
import './ConnexionetInscription.css'
function ConnexionetInscription(props) {
    return (
        <div className='téte'>
            <body >
                <div style={{
                    display: 'block', width: 400, padding: 30, backgroundColor: '(0,0,0,0.5)'
                }} className="conteneur">

                    <Tabs defaultActiveKey="connexion">
                        <Tab eventKey="connexion" title="CONNEXION">
                            <Connexion />
                        </Tab>
                        <Tab eventKey="inscription" title="INSCRIPTION">
                            <Inscription />
                        </Tab>
                    </Tabs>
                </div>
            </body >
        </div>
    );
}

export default ConnexionetInscription;