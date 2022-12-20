import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { FaSearch } from "react-icons/fa";


import './NewGroupe.css';

function valider() {
  alert('Vous avez créé une nouvelle organisation!');
}

function NewGroupe() {
  return (
    <div className='Formulaire'>
     <h1> Créer un nouveau  groupe de discussion </h1>
    <Form>
      <Form.Group className="mb-3" controlId="formBasictext">
        <Form.Label>Nom du groupe </Form.Label>
        <Form.Control type="text" placeholder="Entrez un nom" />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasictext">
        <Form.Label>Inviter des membres </Form.Label>
        
        <Form.Control type="text" placeholder="Chercher des personnes" /> 
        <FaSearch className='chrch'/>
        
       
      </Form.Group>


      
      
      
   
     <div className='Btns'> 
      <button onClick={valider} className="btn1">Valider</button>
      
      <button className="btn1">Annuler</button>
    </div>
      
      </Form>
    </div>
  

  
)
}

export default NewGroupe;