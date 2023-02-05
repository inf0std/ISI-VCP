import { useState, useRef } from "react";

const SignInSignUp = (props) => {
  const signinEmail = useRef();
  const signinPassword = useRef();

  const signupUsername = useRef();
  const signupEmail = useRef();
  const signupPassword = useRef();
  const signupPassword2 = useRef();

  const sendSignInData = async (data) => {
    return fetch("http://127.0.0.1:8080/api/router/login", {
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
    });
  };

  const handleConnection = (e) => {
    e.preventDefault();
    let data = {
      email: signinEmail.current.value,
      password: signinPassword.current.value,
    };
    console.log("signing in", data);
    sendSignInData(data)
      .then((response) => response.json())
      .then((data) => {
        props.generalHandler.changeUser(data._id, data.username);
      })
      .catch((err) => {
        //handeling search Errors
      }); //*/
  };

  const sendSignupData = async (data) => {
    console.log("signing up", data);
    return fetch("http://127.0.0.1:8080/api/router/signup", {
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
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    let data = {
      username: signupUsername.current.value,
      email: signupEmail.current.value,
      password: signupPassword.current.value,
      password2: signupPassword2.current.value,
    };
    console.log(data);
    sendSignupData(data)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //display data in the search results
      })
      .catch((err) => {
        console.log(err);
        //handeling search Errors
      }); //*/
  };

  return (
    <>
      <button
        type="button"
        id="loginModalBtn"
        className="btn btn-primary"
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
                          ref={signinEmail}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="signin-pwd">
                          mot de passe
                        </label>
                        <input
                          ref={signinPassword}
                          type="password"
                          id="signin-pwd"
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
                              Remember me{" "}
                            </label>
                          </div>
                        </div>

                        <div className="col">
                          <a href="#!">Forgot password?</a>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-secondary btn-floating mx-1"
                          data-bs-dismiss="modal"
                        >
                          annuler
                        </button>

                        <button
                          onClick={handleConnection}
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          connexion
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
                          username
                        </label>
                        <input
                          ref={signupUsername}
                          type="email"
                          id="form6Example5"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form6Example5">
                          email
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
                          Phone
                        </label>
                        <input
                          type="number"
                          id="form6Example6"
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
                              mot de passe
                            </label>
                            <input
                              ref={signupPassword}
                              type="password"
                              className="form-control"
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
                              Confirmation
                            </label>
                            <input
                              ref={signupPassword2}
                              type="password"
                              className="form-control"
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
                          annuler
                        </button>

                        <button
                          onClick={handleSignup}
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          inscription
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
