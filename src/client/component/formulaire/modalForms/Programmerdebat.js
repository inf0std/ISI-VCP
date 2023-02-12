import { useRef, useState } from "react";
import { useParams, useNavigate, Form, Link } from "react-router-dom";

import alert from "../../../utils/alertUtils";
import { sendData } from "../../../utils/dataFetcherUtils";
import "./Programmerdebat.css";
const Programmerdebat = () => {
  const { id } = useParams();
  const titre = useRef();
  const desc = useRef();
  const date = useRef();
  const heure = useRef();
  const dure = useRef();
  const audience = useRef();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      reunion_Name: titre.current.value,
      desc: desc.current.value,
      date: date.current.value,
      //  heure: heure.current.value,
      // audience: audience.current.value,
      Duration: dure.current.value,
    };

    console.log(data);
    sendData(data)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          console.log(data.message);
          alert("data sent", "success");
          navigate(`/profile/${id}`);
        } else if (data.error) {
          alert(`echoue ${data.error}`, "danger");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/profile/1");
      });
  };

  const showTab1 = () => {
    document.getElementById("chrono-debat").click();
  };

  const showTab2 = () => {
    document.getElementById("participant-debat").click();
  };
  const showTab3 = () => {
    document.getElementById("audience-debat").click();
  };
  const showTab4 = () => {
    document.getElementById("confirmation-debat").click();
  };
  const handleSuivant1 = (e) => {
    e.preventDefault();
    showTab2();
  };

  const handlePrecedent1 = (e) => {
    e.preventDefault();
    showTab1();
  };
  const handleSuivant2 = (e) => {
    e.preventDefault();
    showTab3();
  };
  const handlePrecedent2 = (e) => {
    e.preventDefault();
    showTab2();
  };
  const handleSuivant3 = (e) => {
    e.preventDefault();
    showTab4();
  };

  const handlePrecedent3 = (e) => {
    e.preventDefault();
    showTab3();
  };

  const searchParticipants = (e) => {
    e.preventDefault();
  };

  const searchAudience = (e) => {
    e.preventDefault();
  };

  const confirmer = (e) => {
    e.preventDefault();
  };
  return (
    <div onSubmit={handleSubmit}>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        id="prg-deb-btn"
        data-bs-target="#programmer-debat"
        hidden
      ></button>
      <div className="modal fade" id="programmer-debat">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <ul className="nav nav-tabs" hidden id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="chrono-debat"
                    data-bs-toggle="tab"
                    data-bs-target="#chrono-debat-tab"
                    type="button"
                    role="tab"
                    aria-controls="chrono-debat-tab"
                    aria-selected="true"
                  >
                    Étape 01
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="participant-debat"
                    data-bs-toggle="tab"
                    data-bs-target="#participant-debat-pane"
                    type="button"
                    role="tab"
                    aria-controls="participant-debat-pane"
                    aria-selected="false"
                  >
                    Étape 02
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="audience-debat"
                    data-bs-toggle="tab"
                    data-bs-target="#audience-debat-pane"
                    type="button"
                    role="tab"
                    aria-controls="audience-debat-pane"
                    aria-selected="false"
                  >
                    Étape 03
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="confirmation-debat"
                    data-bs-toggle="tab"
                    data-bs-target="#confirmation-debat-pane"
                    type="button"
                    role="tab"
                    aria-controls="confirmation-debat-pane"
                    aria-selected="false"
                  >
                    Étape 04
                  </button>
                </li>
              </ul>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="modal-body mx-3">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="chrono-debat-tab"
                    role="tabpanel"
                    aria-labelledby="chrono-debat"
                    tabIndex="0"
                  >
                    <form>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="debat-titre">
                          Titre
                        </label>
                        <input
                          ref={titre}
                          type="Text"
                          id="debat-titre"
                          className="form-control"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="date-debat">
                          Date
                        </label>
                        <input
                          ref={date}
                          type="date"
                          id="debat-date"
                          className="form-control"
                        />
                      </div>
                      <div style={{ width: "auto" }}>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form1Example2">
                            Durée
                          </label>
                          <input
                            ref={dure}
                            type="number"
                            id="debat-dure"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-floating mb-4">
                        Description
                        <label
                          className="form-label"
                          htmlFor="debat-description"
                        ></label>
                        <textarea
                          style={{ height: "100px" }}
                          ref={desc}
                          type="text"
                          className="form-control"
                          placeholder="Ajouter une description à votre Débat"
                          id="debat-description"
                        ></textarea>
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
                          type="submit"
                          className="btn btn-primary btn-block"
                          //onClick={confirmer}
                        >
                          {" "}
                          {status && <p>{status}</p>}
                          Confirmer
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default Programmerdebat;
