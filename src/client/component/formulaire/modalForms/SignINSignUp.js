import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  isAlphanumeric,
} from "../../../../server/apis/formUtils";
import alert from "../../../utils/alertUtils";
import {
  sendSigninData,
  sendSignupData,
} from "../../../utils/dataFetcherUtils";

import config from "../../../config.json";
const SignInSignUp = ({ changeUser }) => {
  const navigate = useNavigate();

  const signinEmail = useRef();
  const signinPassword = useRef();
  const signupUsername = useRef();
  const signupEmail = useRef();
  const signupPassword = useRef();
  const signupPassword2 = useRef();
  const signupPhone = useRef();

  const handleConnection = (e) => {
    e.preventDefault();
    let data = {
      email: signinEmail.current.value,
      password: signinPassword.current.value,
    };
    sendSigninData(data)
      .then((response) => response.json())
      .then((user) => {
        if (user._id) {
          console.log(user);
          console.log(user._id, user.name, user.token);
          changeUser(user._id, user.name, user.token);
          navigate("/");
        } else alert("EMAIL OU MOT DE PASSE FAUX", "danger");
      })
      .catch((err) => {
        console.log("connexion", err);
        navigate("/");
      }); //*/
  };

  const validateFormData = (email, username, pwd1, pwd2, phone) => {
    console.log("email", email, validateEmail(email));
    console.log("password", pwd1, pwd2, validatePassword(pwd1, pwd2));
    console.log("username", username, isAlphanumeric(username));
    console.log("phone", phone, validatePhoneNumber(phone));
    return (
      validateEmail(email) &&
      validatePassword(pwd1, pwd2) &&
      validatePhoneNumber(phone) &&
      isAlphanumeric(username)
    );
  };
  const handleSignup = (e) => {
    e.preventDefault();
    let data = {
      username: signupUsername.current.value,
      email: signupEmail.current.value,
      password: signupPassword.current.value,
      password2: signupPassword2.current.value,
      phone: signupPhone.current.value,
    };
    if (
      validateFormData(
        data.email,
        data.username,
        data.password,
        data.password2,
        data.phone
      )
    ) {
      console.log(data);
      sendSignupData(data)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.message) {
            console.log(data.message);
            alert(
              "SUCCES!! VEUILLEZ VERIFIER VOTRE BOITE EMAIL POUR VALIDER VOTRE COMPTE",
              "success"
            );
            document.getElementById("signup-signin").classList.remove("show");
          } else if (data.error) {
            alert(`inscription echoue ${data.error}`, "danger");
          }
        })
        .catch((err) => {
          console.log(err);
          navigate("/profile/1");
        }); //*/
    } else {
      alert(
        "MAUVAIS FORMAT pour L'EMAIL, LE MOT DE PASSE, LE TELEPHONE OU LE NOM D'UTILISATEUR",
        "danger"
      );
    }
  };

  return (
    <>
      <button
        type="button"
        id="loginModalBtn"
        className="btn btn-primary btn"
        data-bs-toggle="modal"
        data-bs-target="#signup-signin"
        hidden
      >
        Launch static backdrop modal
      </button>{" "}
      <div className="modal fade" id="signup-signin">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <ul className="nav nav-tabs nav-fill" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#connexion"
                    type="button"
                    role="tab"
                    aria-controls="connexion"
                    aria-selected="true"
                  >
                    Connexion
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#inscription"
                    type="button"
                    role="tab"
                    aria-controls="inscription"
                    aria-selected="false"
                  >
                    Inscription
                  </button>
                </li>
              </ul>
              {/*<button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>*/}
            </div>

            <div className="modal-body">
              <div className="modal-body mx-3">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="connexion"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                    tabIndex="0"
                  >
                    <form>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="signin-email">
                          Email
                        </label>
                        <input
                          type="email"
                          id="signin-email"
                          className="form-control"
                          placeholder="Votre adresse e-mail"
                          ref={signinEmail}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="signin-pwd">
                          Mot de passe
                        </label>
                        <input
                          ref={signinPassword}
                          type="password"
                          id="signin-pwd"
                          placeholder="Votre Mot de passe"
                          className="form-control"
                        />
                      </div>

                      <div className="row mb-4">
                        <div className="col d-flex justify-content-center">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="remember"
                              defaultChecked
                            />
                            <label
                              className="form-check-label"
                              htmlFor="remember"
                            >
                              {" "}
                              Se souvenir de moi{" "}
                            </label>
                          </div>
                        </div>

                        <div className="col">
                          <a href="#!">Mot de passe oublié ?</a>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-secondary btn-floating mx-1"
                          data-bs-dismiss="modal"
                        >
                          Annuler
                        </button>

                        <button
                          onClick={handleConnection}
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Connecter
                        </button>
                      </div>
                    </form>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="inscription"
                    role="tabpanel"
                    tabIndex="0"
                  >
                    <form>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form6Example5">
                          Nom d'utilisateur
                        </label>
                        <input
                          ref={signupUsername}
                          type="email"
                          id="form6Example5"
                          className="form-control"
                          placeholder="Smith_25"
                          required
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form6Example5">
                          Email
                        </label>
                        <input
                          ref={signupEmail}
                          type="email"
                          id="form6Example5"
                          className="form-control"
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form6Example6">
                          Téléphone
                        </label>
                        <input
                          ref={signupPhone}
                          type="number"
                          id="form6Example6"
                          placeholder="Votre numéro de téléphone"
                          className="form-control"
                        />
                      </div>

                      <div className="row mb-4">
                        <div className="col">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form6Example1"
                            >
                              Mot de passe
                            </label>
                            <input
                              ref={signupPassword}
                              type="password"
                              className="form-control"
                              placeholder="Smith12@"
                              required
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form6Example2"
                            >
                              Confirmer
                            </label>
                            <input
                              ref={signupPassword2}
                              type="password"
                              className="form-control"
                              placeholder="Smith12@"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-secondary btn-floating mx-1"
                          data-bs-dismiss="modal"
                        >
                          Annuler
                        </button>

                        <button
                          onClick={handleSignup}
                          type="submit"
                          className="btn  btn-primary btn-block"
                        >
                          S'inscrire
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInSignUp;
