import React from "react";
import { WithContext as ReactTags } from "react-tag-input";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBFile,
} from "mdb-react-ui-kit";
import TimePicker from "react-bootstrap-time-picker";
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";

import "react-datepicker/dist/react-datepicker.css";

import "./PrgmReunion.css";

const today = new Date();

function PrgmConference() {
  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol lg="9" className="my-5">
          <h1 class="text-info mb-4" color="info">
            Programmer une conférence
          </h1>

          <MDBCard>
            <MDBCardBody className="px-4">
              <MDBRow className="align-items-center pt-4 pb-3">
                <MDBCol md="3" className="ps-5">
                  <h6 className="mb-0">Sujet</h6>
                </MDBCol>

                <MDBCol md="9" className="pe-5">
                  <MDBInput size="lg" id="form1" type="text" />
                </MDBCol>
              </MDBRow>

              <hr className="mx-n3" />

              <MDBRow className="align-items-center pt-4 pb-3">
                <MDBCol md="3" className="ps-5">
                  <h6 className="mb-0">Date</h6>
                </MDBCol>

                <MDBCol md="9" className="pe-5">
                  <DatePicker
                    className="form-control"
                    minDate={today}
                    customInput={
                      <input
                        type="text"
                        id="validationCustom01"
                        placeholder="First name"
                      />
                    }
                  />
                </MDBCol>
              </MDBRow>

              <hr className="mx-n3" />

              <MDBRow className="align-items-center pt-4 pb-3">
                <MDBCol md="3" className="ps-5">
                  <h6 className="mb-0">Heure</h6>
                </MDBCol>

                <MDBCol md="9" className="pe-5">
                  <TimePicker start="10:00" end="21:00" step={30} />
                </MDBCol>
              </MDBRow>

              <hr className="mx-n3" />

              <MDBRow className="align-items-center pt-4 pb-3">
                <MDBCol md="3" className="ps-5">
                  <h6 className="mb-0">Durée</h6>
                </MDBCol>

                <MDBCol md="9" className="pe-5">
                  <d2l-labs-input-duration
                    label="Duration"
                    units="hours:minutes"
                    label-hidden="true"
                  >
                    {" "}
                  </d2l-labs-input-duration>
                </MDBCol>
              </MDBRow>

              <hr className="mx-n3" />

              <MDBRow className="align-items-center pt-4 pb-3">
                <MDBCol md="3" className="ps-5">
                  <h6 className="mb-0">Mots clés</h6>
                </MDBCol>

                <MDBCol md="9" className="pe-5">
                  <ReactTags />
                </MDBCol>
              </MDBRow>

              <hr className="mx-n3" />

              <MDBBtn className="my-4" color="info" size="lg">
                Valider
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default PrgmConference;
