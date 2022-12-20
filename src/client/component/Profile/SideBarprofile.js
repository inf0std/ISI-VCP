import React from 'react'
import './Sidebar.css';

export default function SideBarProfil() {
  return (
  
    <nav  className="">
      <div className="side-menu">
        <center>
          <img src="kaka.jpg"/>
          <h2>kaka</h2>
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
                  <a className="dropdown-item" href="#">
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
                Conférence 
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
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
                  <a className="dropdown-item" href="#">
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

            <li><a>Enregistrement</a></li>
            
          </ul>
        </div>
    </nav>
  )
}
