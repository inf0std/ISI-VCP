import { useRef } from "react";
import { Link } from "react-router-dom";
import "./ProgramerLareunion.css";
const ProgrammerReunion = (props) => {
  const [titre, desc, date, heure, dure, audience] = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];
  const handleSuivant1 = (e) => {
    e.preventDefault();
    document.getElementById("step2");
  };

  const handlePrecedent1 = (e) => {
    e.preventDefault();
    document.getElementById("chrono-reunion").click();
  };
  const handleSuivant2 = (e) => {
    e.preventDefault();
  };
  const handlePrecedent2 = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#program-reunion"
        id="prg-reun-btn"
      ></button>

      <div className="modal fade" id="program-reunion">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active"
                    id="chrono-reunion"
                    data-bs-toggle="tab"
                    data-bs-target="#chrono-reunion-pane"
                    type="button"
                    role="tab"
                    aria-controls="chrono-reunion-pane"
                    aria-selected="true"
                  >
                    étape01
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="audience-reunion"
                    data-bs-toggle="tab"
                    data-bs-target="#audience-reunion-pane"
                    type="button"
                    role="tab"
                    aria-controls="audience-reunion-pane"
                    aria-selected="false"
                  >
                    étape02
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="confirme-reunion"
                    data-bs-toggle="tab"
                    data-bs-target="#confirme-reunion-pane"
                    type="button"
                    role="tab"
                    aria-controls="confirme-reunion-pane"
                    aria-selected="false"
                  >
                    étape03
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
              <div class="modal-body mx-3">
                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="chrono-reunion-pane"
                    role="tabpanel"
                    aria-labelledby="chrono-reunion"
                    tabindex="0"
                  >
                    <form>
                      <div class="form-outline mb-4" className="titre">
                        <label class="form-label" for="form1Example1">
                          Titre
                        </label>
                        <input
                          ref={titre}
                          type="Text"
                          id="form1Example1"
                          class="form-control"
                        />
                      </div>

                      <div class="form-outline mb-4" className="date">
                        <label class="form-label" for="form1Example2">
                          Date
                        </label>
                        <input
                          ref={date}
                          type="date"
                          id="form1Example2"
                          class="form-control"
                        />
                      </div>
                      <div className="Heur">
                        <div class="form-outline mb-2 " className="heure">
                          <label class="form-label" for="form1Example2">
                            heure
                          </label>
                          <input
                            ref={heure}
                            type="time"
                            id="form1Example2"
                            class="form-control"
                          />
                        </div>
                        <div class="form-outline mb-4" className="Durée">
                          <label class="form-label" for="form1Example2">
                            Durée
                          </label>
                          <input
                            ref={dure}
                            type="time"
                            value="00:45"
                            id="form1Example2"
                            class="form-control"
                          />
                        </div>
                      </div>
                      <div class="form-floating" className="description">
                        <label for="floatingTextarea2">Description</label>
                        <textarea
                          ref={desc}
                          class="form-control"
                          placeholder="ajouter une description à votre réunion"
                          id="floatingTextarea2"
                        ></textarea>
                      </div>

                      <div
                        class="d-flex justify-content-center"
                        className="bouton"
                      >
                        <button
                          type="button"
                          className="btn btn-secondary btn-floating mx-1"
                          data-bs-dismiss="modal"
                        >
                          Annuler
                        </button>

                        <Link to="/audience-reunion">
                          <button
                            type="submit"
                            class="btn btn-primary btn-block"
                          >
                            Suivant{" "}
                          </button>{" "}
                        </Link>
                      </div>
                    </form>
                  </div>

                  <div
                    class="tab-pane fade"
                    id="audience-reunion-pane"
                    role="tabpanel"
                    aria-labelledby="audience-reunion"
                    tabindex="0"
                  >
                    <form>
                      <div class="d-flex" className="participant">
                        <label class="form-label" for="form6Example5">
                          audience
                        </label>
                        <input
                          class="form-control me-2"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                        />
                        <button class="btn btn-outline-info" type="submit">
                          Search
                        </button>
                      </div>
                      <div className="ajout1"></div>

                      <div
                        class="d-flex justify-content-center"
                        className="butn"
                      >
                        <button
                          type="button"
                          className="btn btn-secondary btn-floating mx-1"
                          data-bs-dismiss="modal"
                        >
                          Précedent
                        </button>

                        <button type="submit" class="btn btn-primary btn-block">
                          Suivant
                        </button>
                      </div>
                    </form>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="confirme-reunion-pane"
                    role="tabpanel"
                    aria-labelledby="audience-reunion"
                    tabindex="0"
                  >
                    <form>
                      <div className="spane">
                        <div>
                          <span>Titre :</span>
                        </div>
                        <div>
                          <span>Date :</span>
                        </div>
                        <div>
                          <span>Description :</span>
                        </div>
                        <div>
                          <span>Durée :</span>
                        </div>
                        <div>
                          <span>audience :</span>
                        </div>
                      </div>

                      <div className="ajout1"></div>

                      <div
                        class="d-flex justify-content-center"
                        className="butn"
                      >
                        <button
                          type="button"
                          className="btn btn-secondary btn-floating mx-1"
                          data-bs-dismiss="modal"
                        >
                          Précedent
                        </button>

                        <button type="submit" class="btn btn-primary btn-block">
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

export default ProgrammerReunion;
