import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Home2/Navbar";
import config from "../config.json";
const Contact = ({ user, changeUser }) => {
  console.log("contact page");
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.id) {
      /* getData()
        .then((response) => response.json())
        .then((data) => {
          changeUser(data._id, data.username);
        })
        .catch((err) => {
          navigate("/");
        }); */
    }
  }, []);
  return (
    <div class="" style={{ backgroundColor: "#a0969665", height: "100vh" }}>
      <Navbar user={user} changeUser={changeUser} />
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
