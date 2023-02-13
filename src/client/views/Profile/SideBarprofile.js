import React, { useState, useEffect } from "react";
import axios from "axios";
import Programmerdebat from "../../component/formulaire/modalForms/Programmerdebat";

import "./Sidebar.css";
import { useParams, useNavigate } from "react-router-dom";
import logo from "./avatar.png";

function SideBarProfile() {
  const [user, setUser] = useState({});
  const [referencedUser, setReferencedUser] = useState({});
  const { id } = useParams();
  const [idFromButtonClick, setIdFromButtonClick] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:80/api/user/${id}`)
      .then((res) => {
        setUser(res.data);
        // Fetch the referenced user using the contact reference id
        axios
          .get(`http://localhost:80/api/user/${res.data.contacts}`)
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

  const handleProgDebat = (e) => {
    e.preventDefault();
    document.getElementById("prg-deb-btn").click();
  };
  const handleProgReun = (d) => {
    d.preventDefault();
    document.getElementById("prg-deb-btn").click();
  };
  const handleProgConf = (c) => {
    c.preventDefault();
    document.getElementById("prg-deb-btn").click();
  };
  const navigate = useNavigate();
  const handleClick = () => navigate(`Consulter`);
  return (
    <>
      <Programmerdebat />
      <nav className="fixed-left">
        <div className="side-menu">
          <center>
            <img src={logo} alt="Logo" />
            <h2>{user.username}</h2>
          </center>

          <ul className="">
            <li className="">
              <a
                className=" nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Réunion
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={handleProgReun}
                  >
                    Programmer
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="" onClick={handleClick}>
                    Consulter
                  </a>
                </li>
              </ul>
            </li>

            <li className="">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Conférence
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={handleProgConf}
                  >
                    Programmer
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Consulter
                  </a>
                </li>
              </ul>
            </li>

            <li className="">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Débat
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={handleProgDebat}
                  >
                    Programmer
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Consulter
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
export default SideBarProfile;
