import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { FaSearch } from "react-icons/fa";


import './NewGroupe.css';

function valider() {
  alert('Vous avez créé un nouveau groupe!');
}

function NewGroupe() {
  return (
    <div >
      <h1>Créer un nouveau groupe de discussion</h1>
      <form action="">
      <div class="mb-3">
         <label for="exampleFormControlInput1" class="form-label">Nom du groupe</label>
         <input type="text" class="form-control" id="exampleFormControlInput1"  placeholder='Entrez un nom'/>
      </div>

      <div class="mb-3">
         <label for="exampleFormControlInput1" class="form-label">Membres</label>
         <input type="text" class="form-control" id="exampleFormControlInput1"  placeholder='Ajouter des membres'/>
      </div>
      </form>

      <div className='Btns'> 
      <button onClick={valider} className="btn1">Valider</button>
      
      <button className="btn1">Annuler</button>
    </div>
    
    </div>
  

  
)
}

export default NewGroupe;