import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBFile
}
from 'mdb-react-ui-kit';
import TimePicker from 'react-bootstrap-time-picker';
import DatePicker from "react-datepicker";

import { FaSearch } from "react-icons/fa";


import Form from 'react-bootstrap/Form';
import "react-datepicker/dist/react-datepicker.css";

import Searchbar from './Searchbar';
import './PrgmReunion.css';

const today = new Date();

function PrgmDebat() {
  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol lg='9' className='my-5'>

          <h1 class="text-info mb-4" color='info'>Programmer  un Débat</h1>

          <MDBCard>
            <MDBCardBody className='px-4'>

              <MDBRow className='align-items-center pt-4 pb-3'>

                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Sujet</h6>
                </MDBCol>
                
                <MDBCol md='9' className='pe-5'>
                  <MDBInput size='lg' id='form1' type='text'/>
                </MDBCol>

              </MDBRow>

              <hr className="mx-n3" />

              <MDBRow className='align-items-center pt-4 pb-3'>

                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Date</h6>
                </MDBCol>
                
                <MDBCol md='9' className='pe-5'>
                <DatePicker
                   
                 className="form-control"
                 minDate={today}
                 customInput={
                  <input
                type="text"
                id="validationCustom01"
                placeholder="First name"
                 />
                 }/>

                </MDBCol>

              </MDBRow>

              <hr className="mx-n3" />

              <MDBRow className='align-items-center pt-4 pb-3'>

                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Heure</h6>
                </MDBCol>

                <MDBCol md='9' className='pe-5'>
                <TimePicker start="00:00" end="23:59" step={30} />

                </MDBCol>

              </MDBRow>

              <hr className="mx-n3" />

              

              
              <MDBRow className='align-items-center pt-4 pb-3'>

                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Durée</h6>
                </MDBCol>

                <MDBCol md='9' className='pe-5'>
                <d2l-labs-input-duration 
                label="Duration"
                units="hours:minutes" label-hidden="true"> </d2l-labs-input-duration>              
                </MDBCol>

              </MDBRow>

              <hr className="mx-n3" />
             

              <MDBRow className='align-items-center pt-4 pb-3'>

              <MDBCol md='3' className='ps-5'>
  <h6 className="mb-0">Débattre avec </h6>
              </MDBCol>

                   <MDBCol md='9' className='pe-5'>
                     <Form.Group className="mb-3" controlId="formBasictext">
       
        
                        <Form.Control type="text" placeholder="Chercher une personne" /> 
                        <FaSearch />
        
       
                    </Form.Group>


                    </MDBCol>

                </MDBRow>
               

              <hr className="mx-n3" />

              

              
             

           
              
             

              

                    <MDBRow className='align-items-center pt-4 pb-3'>

                <MDBCol md='3' className='ps-5'>
                  <h6 className="mb-0">Audiance</h6>
                </MDBCol>

                <MDBCol md='9' className='pe-5'>
                  <Form.Select aria-label="Default select example">
                    <option>Tout le monde</option>
                    <option value="1">Choisir une organisation</option>
                    
                  </Form.Select>
              

                </MDBCol>

              </MDBRow>

                    

                
               

              <hr className="mx-n3" />



            

              

              <MDBBtn className='my-4'  color='info' size='lg'>Valider</MDBBtn>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default PrgmDebat;