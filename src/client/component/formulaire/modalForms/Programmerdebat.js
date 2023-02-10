import { useRef } from "react";
import "./Programmerdebat.css";
const Programmerdebat = (props) => {
  const debatInfo = useRef({});
  const [titre, date, heure, dure, desc, participants, audienceAll, audience] =
    [
      useRef(),
      useRef(),
      useRef(),
      useRef(),
      useRef(),
      useRef(),
      useRef(),
      useRef(),
    ];

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
    <>
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
                        <div className="form-outline mb-2 ">
                          <label className="form-label" htmlFor="debat-heure">
                            Heure
                          </label>
                          <input
                            ref={heure}
                            type="time"
                            id="debat-heure"
                            className="form-control"
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form1Example2">
                            Durée
                          </label>
                          <input
                            ref={dure}
                            type="time"
                            id="debat-dure"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-floating">
                        <label
                          className="form-label"
                          htmlFor="debat-description"
                        >
                          Description
                        </label>
                        <textarea
                          ref={desc}
                          className="form-control"
                          placeholder="ajouter une description à votre Débat"
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
                          className="btn btn-primary btn-block"
                          onClick={handleSuivant1}
                        >
                          Suivant{" "}
                        </button>
                      </div>
                    </form>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="participant-debat-pane"
                    role="tabpanel"
                    aria-labelledby="participant-debat"
                    tabIndex="0"
                  >
                    <form>
                      <div className="d-flex">
                        <label
                          className="form-label"
                          htmlFor="debat-part-search"
                        >
                          Participants{" "}
                        </label>
                        <input
                          className="form-control me-2"
                          type="search"
                          id="debat-part-search"
                          placeholder="Search"
                          aria-label="Search"
                        />
                        <button className="btn btn-outline-info" type="submit">
                          Rechercher
                        </button>
                      </div>
                      <div className="ajout_">
                        <ul ref={participants}></ul>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-secondary btn-floating mx-1"
                          onClick={handlePrecedent1}
                        >
                          Précédent
                        </button>

                        <button
                          onClick={handleSuivant2}
                          className="btn btn-primary btn-block"
                        >
                          Suivant
                        </button>
                      </div>
                    </form>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="audience-debat-pane"
                    role="tabpanel"
                    aria-labelledby="participant-debat"
                    tabIndex="0"
                  >
                    <form>
                      <div className="d-flex">
                        <label
                          className="form-label"
                          htmlFor="debat-audience-search"
                        >
                          Audience
                        </label>

                        <input
                          className="form-control me-2"
                          type="search"
                          id="debat-audience-search"
                          placeholder="Search"
                          aria-label="Search"
                        />
                        <button className="btn btn-outline-info" type="submit">
                          Rechercher
                        </button>
                      </div>
                      <div className="chek">
                        <label
                          className="form-check-label"
                          htmlFor="debat-audience-all"
                        >
                          Tout Le Monde
                        </label>
                        <input
                          ref={audienceAll}
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="debat-audience-all"
                          required
                        />
                      </div>
                      <div>
                        <ul ref={audience}></ul>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-secondary btn-floating mx-1"
                          onClick={handlePrecedent2}
                        >
                          Précédent
                        </button>

                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                          onClick={handleSuivant3}
                        >
                          Suivant
                        </button>
                      </div>
                    </form>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="confirmation-debat-pane"
                    role="tabpanel"
                    aria-labelledby="confirmation-debat"
                    tabIndex="0"
                  >
                    <form>
                      <div className="spane_">
                        <div>
                          <p>
                            <span>Titre :</span>
                          </p>
                        </div>
                        <div>
                          <p>
                            <span>Date :</span>
                          </p>
                        </div>
                        <div>
                          <p>
                            <span>Description :</span>
                          </p>
                        </div>
                        <div>
                          <p>
                            <span>Durée :</span>
                          </p>
                        </div>
                        <div>
                          <p>
                            <span>Participants :</span>
                          </p>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-secondary btn-floating mx-1"
                          onClick={handlePrecedent3}
                        >
                          Précédent
                        </button>

                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                          onClick={confirmer}
                        >
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
      </div>
    </>
  );
};

export default Programmerdebat;
