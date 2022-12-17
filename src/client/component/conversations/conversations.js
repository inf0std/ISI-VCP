import { useState, useRef } from "react";
import ConvElement from "./convElement";
const COnversations = (props) => {
  const searchInput = useRef();
  return (
    <div className="col-md-3 ">
      {
        //formulaire de recherche dans les conversations
      }
      <h5 class="font-weight-bold mb-3 text-center text-lg-start">Conversations</h5>
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
