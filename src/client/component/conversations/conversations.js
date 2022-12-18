import { useState, useRef } from "react";
import ConvElement from "./convElement";
import logo from '../../logo.png'
const COnversations = (props) => {
  const searchInput = useRef();
  return (
    <div className="col-md-3 ">
      {
        //formulaire de recherche dans les conversations
      }
      <div style={{display:''}}>
      <img src={logo} alt="logo" style={{width:'60px', marginRight:'10px'}} />
      <h3 class="font-weight-bold mb-3 text-center text-lg-start">Conversations</h3>  
      </div>
      <form>
        <input className="form-control" ref={searchInput} type="text"></input>
      </form>
      <div>
        {
          //affichage de la liste des conversation
        }
        {props.convs.map((conv, index) => {
          return (
            <ConvElement
              index={index}
              conv={conv}
              activate={props.activate}
              msg={conv.msgs[conv.msgs.length - 1]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default COnversations;
