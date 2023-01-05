import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { FaSearch } from "react-icons/fa";


import './NewOrganization.css';

function valider() {
  alert('Vous avez créé une nouvelle organisation!');
}

import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { FaSearch } from "react-icons/fa";


import './NewOrganization.css';

function valider() {
  alert('Vous avez créé une nouvelle organisation!');
}

function NewOrganization() {
  return (
    <div className='Formulaire'>
     <h1> Créer une nouvelle organisation </h1>
    <Form>
      <Form.Group className="mb-3" controlId="formBasictext">
        <Form.Label>Nom de l'organisation</Form.Label>
        <Form.Control type="text" placeholder="Entrez un nom" />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasictext">
        <Form.Label>Organisation parent  </Form.Label>
        <div class=" d-flex justify-content-between">
        <div class="p-2 bg"><Form.Control type="text" placeholder="Chercher une organisation" /> </div>
    
        <div class="p-2 bg "><FaSearch /> </div>
        </div>
       
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasictext">
        <Form.Label>Ajouter un membre  </Form.Label>
        
        <Form.Control type="text" placeholder="Chercher une personne" /> 
        <FaSearch />
        
       
      </Form.Group>


      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Importer un fichier</Form.Label>
        <Form.Control type="file" />
      </Form.Group>

      
      
    
      <div className='Btns'> 
      <button className="btn1" onClick={valider} >Valider</button>
      
      <button className="btn1">Annuler</button>
    </div>  
    
    
      
      </Form>
    </div>
  

  
)
}

export default NewOrganization;