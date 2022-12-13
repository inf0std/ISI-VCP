import React from "react"
import './Header.css'
import Headeroption from "./Headeroption"
export default function Head(){
    return(
        <div className="header">
            <h1 className="text">SEEN </h1>
            <div className="head_left">
                <img src="" alt=""/>
                <div className="head_search">
                    <i class="bi bi-search"></i>
                    <input   type='text' />
                </div>



            </div>
            <div className="head_right">
                <Headeroption />
                
            </div> 
        
        </div>
    )
      
       
     
}