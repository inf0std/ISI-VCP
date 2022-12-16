import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Contacts from './component/Contacts/Contacts';
import Home2 from './component/Home2/Home2';
import ConnexionetInscription from './component/formulaire/ConnexionetInscription';

function App() {
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
}

export default App;