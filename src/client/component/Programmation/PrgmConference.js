import React from 'react';
import'./Prgm.css';

function PrgmConference() {
  return (
    <>
    <h1>Programmer une Conférence</h1>
    <form>
      <div class="mb-3">
         <label for="exampleFormControlInput1" class="form-label">Sujet</label>
         <input type="text" class="form-control" id="exampleFormControlInput1"  placeholder='Entrez le sujet de la Conférence'/>
      </div>
      <div class="mb-3">
         <label for="exampleFormControlInput1" class="form-label">Date</label>
         <input type="date" class="form-control" id="exampleFormControlInput1" />
      </div>

      <div class="mb-3">
         <label for="exampleFormControlInput1" class="form-label">Heure</label>
         <input type="time" class="form-control" id="exampleFormControlInput1" />
      </div>

      <div class="mb-3">
         <label for="exampleFormControlInput1" class="form-label">Durée</label>
         <input type="time" class="form-control" id="exampleFormControlInput1" />
      </div>

      <div class="mb-3">
         <label for="exampleFormControlInput1" class="form-label">Audiance</label>
         <div class="form-check">
           <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate"/>
           <label class="form-check-label" for="flexCheckIndeterminate">
                       Tout le monde
            </label>
           <input type="text" class="form-control" id="exampleFormControlInput1" placeholder='Choisir une organisation'/>
         </div>

         
  

         <i class="fa-light fa-magnifying-glass-plus"></i>
      </div>
      
      
    </form>
   
    <div className='btnsprgm'>
    <button  classname='butonprgm'type="button" class="btn btn-outline-info">Valider</button>
    <button  classname='butonprgm'type="button" class="btn btn-outline-info">Annuler</button>
    </div>
  
    </>
  );
}

export default PrgmConference;