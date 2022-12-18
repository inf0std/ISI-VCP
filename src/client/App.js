
import React from 'react';

/*import PrgmConference from'./component/Programmation/PrgmConference'
import PrgmDebat from'./component/Programmation/PrgmDebat'
import NewOrganization from './component/Create/NewOrganization';
import NewGroupe from './component/Create/NewGroupe';
import PrgmReunion from './component/Programmation/PrgmReunion';




const App = () => {
  return (
    <div>
      <PrgmReunion />
      <PrgmConference />
       <PrgmDebat />
      <NewOrganization />
  <NewGroupe />
    

      
    </div>*/

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Contact from "./views/Contact";
import Chat from "./views/Chat";
import SignInSignUp from "./component/formulaire/modalForms/SignINSignUp";
const App = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/login" element={<SignInSignUp />} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;

/*import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Contacts from './component/Contacts/Contacts';
import Home2 from './component/Home2/Home2';
import ConnexionetInscription from './component/formulaire/ConnexionetInscription';

/*function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home2 />} />
                <Route path="/Contacts" element={<Contacts />} />
                <Route path="/Home2" element={<Home2 />} />
                <Route path="/ConnexionetInscription" element={<ConnexionetInscription />} />
            </Routes>
        </BrowserRouter>
    );

  )}
export default App;*/
  
