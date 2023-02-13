import React, {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import Navbar from "../component/Home2/Navbar";
import "./Contacts.css"
const Contact = (props) => {
 

  return (
    <div class="" style={{ backgroundColor: "#a0969665", height: "100vh" }}>
      
      <div>
        <div class="contact-form-wrapper d-flex justify-content-center">
          <form action="/api/user/contact" class="contact-form">
            <h5 class="title">Contacter Nous</h5>
            <p class="description">
              N'hésitez pas à nous contacter si vous avez besoin d'aide, d'aide
              ou d'une autre question.
            </p>
            <div>
              <div>
                <input
                  type="email"
                  class="form-control rounded border-white mb-3 form-input"
                  id="floatingInput"
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <div>
              <textarea
                id="exampleFormControlTextarea1"
                class="form-control rounded border-white mb-3 form-text-area"
                rows="5"
                cols="30"
                placeholder="Message"
                required
              ></textarea>
            </div>
            <div class="submit-button-wrapper">
              <input type="submit" value="Envoyer" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
