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
    <div>
    
     <h1> Créer une nouvelle organisation </h1>
     <form >

     <div class="mb-3">
         <label for="exampleFormControlInput1" class="form-label">Nom de l'organisation</label>
         <input type="text" class="form-control" id="exampleFormControlInput1"  placeholder='Entrez un nom'/>
      </div>

      <div class="mb-3">
         <label for="exampleFormControlInput1" class="form-label">Organisation parent</label>
         <input type="text" class="form-control" id="exampleFormControlInput1"  placeholder='Chercher une organisation'/>
      </div>

      <div class="mb-3">
         <label for="exampleFormControlInput1" class="form-label">Membres</label>
         <input type="text" class="form-control" id="exampleFormControlInput1"  placeholder='Ajouter des membres' />
      </div>

      <div class="mb-3">
         <label for="exampleFormControlInput1" class="form-label">Importer un Fichier</label>
         <input type="file" class="form-control" id="exampleFormControlInput1"   />
      </div>

     </form>
    
      
     
    
      <div className='Btns'> 
      <button className="btn1" onClick={valider} >Valider</button>
      
      <button className="btn1">Annuler</button>
    </div>  
    
    
      
      
    </div>
  

  
)
}

export default NewOrganization;