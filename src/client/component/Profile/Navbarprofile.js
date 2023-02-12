import { useState, useRef, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { FaRegComments } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { MdAlternateEmail } from "react-icons/md";
import { ImSearch } from "react-icons/im";
import { Link } from "react-router-dom";


import { searchUsers } from "../../utils/dataFetcherUtils";

import logo from "../../logo.png";

import "./navbar.css";
const Navbarprofile = (props) => {
  const [searchRes, setSearchRes] = useState([]);
  const searchBtn = useRef();
  const searchInput = useRef();

  const handleSearch = (e) => {
    searchUsers(searchInput)
      .then((response) => response.json())
      .then((data) => {
        //display data in the search results
      })
      .catch((err) => {
        //handeling search Errors
      }); //*/
  };

  return (
    <nav
      id="nev"
      className="navbar navbar-expand-lg navbar-light bg-light justefy-content-end"
    >
      <div className="container-fluid">
        <a
          style={{ width: "120px", height: "45px", marginLeft: "40px" }}
          className="navbar-brand"
          href="#"
        >
          <img
            style={{ width: "100%", height: "80px", marginTop: "-26px" }}
            src={logo}
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
            <input
              className="form-control me-2 vw-25"
              type="search"
              placeholder="Rechercher"
              aria-label="Search"
            />

            <button className="btn btn-outline-success" type="submit">
              Rechercher
            </button>
          </form>
          <ul
            style={{ marginRight: "30px" }}
            className="navbar-nav ms-auto mb-2 mb-lg-0"
          >
            <li style={{ margin: "0px 30px 0px 30px" }} className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                <FaHome
                  id="it"
                  style={{ width: "25px", height: "25px", margin: "5px" }}
                />
              </a>
            </li>

            <li style={{ margin: "0px 30px 0px 3px" }} className="nav-item">
              <Link
                to="Contact"
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

            <li style={{ margin: "0px 30px 0px 30px" }} className="nav-item">
              <Link
                to="/Chat"
                className="nav-link"
                href="#"
                tabIndex="-1"
                aria-disabled="true"
              >
                <FaRegComments
                  id="it"
                  style={{ width: "25px", height: "25px", margin: "5px" }}
                />
              </Link>
            </li>

            <li style={{ margin: "0px 30px 0px 30px" }} className="nav-item">
              <Link
                to="/"
                className="nav-link"
                href="#"
                tabIndex="-1"
                aria-disabled="true"
              >
                <GoSignOut
                  id="it"
                  style={{ width: "25px", height: "25px", margin: "5px" }}
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbarprofile;
