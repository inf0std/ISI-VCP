import SideBarProfile from "./SideBarprofile";
import Navbarprofile from "./Navbarprofile";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import "./Sidebar.css";
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

function Profile() {
  const [user, setUser] = useState({});
  const [referencedUser, setReferencedUser] = useState({});
  const { id } = useParams();
  const [idFromButtonClick, setIdFromButtonClick] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/${id}`)
      .then((res) => {
        setUser(res.data);
        // Fetch the referenced user using the contact reference id
        axios
          .get(`http://localhost:8080/api/user/${res.data.contacts}`)
          .then((res) => {
            setReferencedUser(res.data);
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
      <Navbarprofile />
      <SideBarProfile />
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
                      <MDBCardText>Nom Complet</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user.username}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {Object.values(user).map((item) => (
                          <li key={item.email}>{item.email}</li>
                        ))}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Téléphone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user.phone}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user.adresse}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Contacts</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {referencedUser.username && (
                          <div>
                            <p>Nom: {referencedUser.username}</p>
                            {Object.values(referencedUser.login).map((item) => (
                              <li key={item.email}>
                                <p>Email: {item.email}</p>
                              </li>
                            ))}
                            <p>Téléphone: {referencedUser.phone}</p>
                          </div>
                        )}
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
export default Profile;
