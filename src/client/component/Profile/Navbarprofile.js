import { useState, useRef, useEffect } from "react";
import {FaUsers} from "react-icons/fa";
import {FaRegComments} from"react-icons/fa";
import {FaHome} from "react-icons/fa";
import {GoSignOut}  from "react-icons/go";
import { Link } from "react-router-dom";
import './navbar.css';
const Navbarprofile = (props) => {
  const searchBtn = useRef();
  const searchResults = useRef();
  const searchInput = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    let data = searchInput.current.value;
    //*
    fetch("127.0.0.1:3000/search", {
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

  return (
    <nav id='nav' className="navbar navbar-expand-lg navbar-light bg-light justefy-content-end">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">
        SEEN
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
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success"
            type="submit"
          >
            Rechercher
          </button>
        </form>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            
            <li style={{marginleft:"10px"}} className="nav-item">

            
              <FaHome style={{width:'25px', height:"25px",margin:"5px"}}/>
                
              
            </li>


            <li style={{marginleft:"10px"}} className="nav-item">
           
             
             <FaUsers style={{width:'25px', height:"25px",margin:"5px"}}/>
             
               
            </li>

            
            <li className="nav-item">
             
                <FaRegComments style={{width:'25px', height:"25px",margin:"5px"}}/>
              
              

            </li>

            <li  className="nav-item">
            
              <GoSignOut style={{width:'25px', height:"25px",margin:"5px"}}/>
             
              
            </li>
          </ul>
      </div>
    </div>
  </nav>
 
 
  );
};

export default Navbarprofile;


