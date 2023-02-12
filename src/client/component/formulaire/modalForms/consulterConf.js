
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

function ConsultConf() {
  const [user, setUser] = useState({});
  const [referencedUser, setReferencedUser] = useState({});
  const { id } = useParams();
  const [idFromButtonClick, setIdFromButtonClick] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/${id}`)
      .then((res) => {
        setUser(res.data);
        const conferenceId = res.data.conferences;
        console.log('here6',conferenceId)
        // Fetch the referenced user using the contact reference id
        axios
          .get(`http://localhost:8080/api/conference/${conferenceId}`)
          .then((res) => {
            setReferencedUser(res.data);
            console.log('here5',res.data)
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <section>
        <MDBContainer>
          <MDBRow>
            <MDBCol style={{ margin: "20px 0px 10px 150px" }}>
              <MDBCard
                className="mb-4"
                style={{ backgroundColor: "rgba(234, 238, 238, 0.651)" }}
              >
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Titre :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {referencedUser.topic}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Date :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {referencedUser.Date_begin}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Description :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {referencedUser.description}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Durée :</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {referencedUser.duration} 
                      </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted"></MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted"></MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
}
export default ConsultConf;
