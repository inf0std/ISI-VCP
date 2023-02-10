import { useRef } from "react";
import { FaUsers } from "react-icons/fa";
import { FaRegComments } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { Link } from "react-router-dom";
import { logout } from "../../utils/dataFetcherUtils";
import SignInSignUp from "../formulaire/modalForms/SignINSignUp";

import config from "../../config.json";

const Navbar = ({ user, changeUser }) => {
  const searchBtn = useRef();
  const searchResults = useRef();
  const searchInput = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    let data = searchInput.current.value;
    //*
    fetch(`${config.app_url}:${config.app_port}/api/user/${user.id}/search`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then((response) => response.json())
      .then((data) => {
        //display data in the search results
      })
      .catch((err) => {
        //handeling search Errors
      }); //*/
  };

  const showLoginModal = () => {
    document.getElementById("loginModalBtn").click();
  };

  return (
    <nav
      id="nev"
      className="navbar navbar-expand-lg navbar-light bg-light justefy-content-end"
    >
      <SignInSignUp user={user} changeUser={changeUser} />
      <div className="container-fluid">
        <a
          style={{ width: "120px", height: "45px", marginLeft: "40px" }}
          className="navbar-brand"
          href="#"
        >
          <img
            style={{
              width: "70%",
              height: "80px",
              marginTop: "-26px",
              boxShadow: "inherit",
            }}
            src="logo.png"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex ms-auto">
            {
              <FiSearch
                id="it"
                style={{
                  width: "16px",
                  height: "16px",
                  marginLeft: "8px",
                  marginTop: "13px",
                  position: "absolute",
                }}
              />
            }
            <input
              className="form-control me-2 vw-25"
              type="search"
              placeholder="   Rechercher"
              aria-label="Search"
            />

            <button className="btn btn-outline-success" type="submit">
              Rechercher
            </button>
          </form>
          <ul
            style={{ marginRight: "3px" }}
            className="navbar-nav ms-auto mb-2 mb-lg-0"
          >
            <li style={{ margin: "0px 0px 0px 0px" }} className="nav-item">
              <Link
                to="/"
                className="nav-link"
                href="#"
                tabIndex="-1"
                aria-disabled="true"
              >
                <FaHome
                  id="it"
                  style={{ width: "25px", height: "25px", margin: "5px" }}
                />
              </Link>
            </li>

            <li style={{ margin: "0px 30px 0px 3px" }} className="nav-item">
              <Link
                to="/Contact"
                className="nav-link"
                href="#"
                tabIndex="-1"
                aria-disabled="true"
              >
                <MdAlternateEmail
                  id="it"
                  style={{ width: "25px", height: "25px", margin: "5px" }}
                />
              </Link>
            </li>

            <li className="nav-item">
              {/*<Link
                to="/"
                className="nav-link"
                href="#"
                tabIndex="-1"
                aria-disabled="true"
              >*/}
              {!user.id && (
                <button
                  style={{ marginTop: "5px" }}
                  className="btn btn-outline-success"
                  onClick={showLoginModal}
                  id="login-btn"
                >
                  Se connecter
                </button>
              )}
              {user.id && (
                <>
                  <button
                    className="btn btn-outline-success"
                    onClick={() => {
                      console.log("logging out");
                      changeUser(null, null);
                      logout();
                    }}
                    id="logout-btn"
                  >
                    Se déconecter
                  </button>
                  <img
                    src={`http://127.0.0.1:8080/profile/${user.id}/img`}
                  ></img>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
