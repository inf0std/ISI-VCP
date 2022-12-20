import "./Programmerdébat.css"
const Programmerdébat = (props) => {
    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#signup-signin"
            >
                Programmer Le Débat
            </button>

            <div className="modal fade" id="signup-signin">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">étape01</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">étape02</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="reunio-tab" data-bs-toggle="tab" data-bs-target="#reunio-tab-pane" type="button" role="tab" aria-controls="reunio-tab-pane" aria-selected="false">étape03</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="débat-tab" data-bs-toggle="tab" data-bs-target="#débat-tab-pane" type="button" role="tab" aria-controls="débat-tab-pane" aria-selected="false">étape04</button>
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
                                    <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                                        <form>

                                            <div class="form-outline mb-4" className="titre_">
                                                <label class="form-label" for="form1Example1">Titre</label>
                                                <input type="Text" id="form1Example1" class="form-control" />

                                            </div>


                                            <div class="form-outline mb-4" className="date_">
                                                <label class="form-label" for="form1Example2">Date</label>
                                                <input type="date" id="form1Example2" class="form-control" />

                                            </div>
                                            <div className="Heur_">
                                                <div class="form-outline mb-2 " className="heure_">
                                                    <label class="form-label" for="form1Example2">heure</label>
                                                    <input type="time" id="form1Example2" class="form-control" />

                                                </div>
                                                <div class="form-outline mb-4" className="Durée_" >
                                                    <label class="form-label" for="form1Example2">Durée</label>
                                                    <input type="time" id="form1Example2" class="form-control" />

                                                </div>
                                            </div>
                                            <div class="form-floating" className="description_"  >
                                                <label for="floatingTextarea2">Description</label>
                                                <textarea class="form-control" placeholder="ajouter une description à votre réunion" id="floatingTextarea2" ></textarea>
                                            </div>


                                            <div class="d-flex justify-content-center" className="bouton_">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary btn-floating mx-1"
                                                    data-bs-dismiss="modal"
                                                >
                                                    Annuler
                                                </button>

                                                <button type="submit" class="btn btn-primary btn-block">Suivant  </button>
                                            </div>

                                        </form>
                                    </div>

                                    <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                                        <form>


                                            <div class="d-flex" className="participant_" >
                                                <label class="form-label" for="form6Example5">Participant</label>
                                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                                <button class="btn btn-outline-info" type="submit">Search</button>
                                            </div>
                                            <div className="ajout_">

                                            </div>


                                            <div class="d-flex justify-content-center" className="butn_">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary btn-floating mx-1"
                                                    data-bs-dismiss="modal"
                                                >
                                                    Précedent
                                                </button>

                                                <button type="submit" class="btn btn-primary btn-block">Suivant</button>
                                            </div>

                                        </form>
                                    </div>
                                    <div class="tab-pane fade" id="reunio-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                                        <form>


                                            <div class="d-flex" className="participant_" >
                                                <label class="form-label" for="form6Example5">Audiance</label>

                                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                                <button class="btn btn-outline-info" type="submit">Search</button>

                                            </div>
                                            <div className="ajout_">

                                            </div>


                                            <div class="d-flex justify-content-center" className="butn_">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary btn-floating mx-1"
                                                    data-bs-dismiss="modal"
                                                >
                                                    Précedent
                                                </button>

                                                <button type="submit" class="btn btn-primary btn-block">Confirmer</button>
                                            </div>

                                        </form>
                                    </div>
                                    <div class="tab-pane fade" id="débat-tab-pane" role="tabpanel" aria-labelledby="débat-tab" tabindex="0">
                                        <form>


                                            <div class="d-flex" className="participant_" >
                                                <label class="form-label" for="form6Example5">Participant</label>
                                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                                <button class="btn btn-outline-info" type="submit">Search</button>
                                            </div>
                                            <div className="spane_">
                                                <div><span>Titre :</span></div>
                                                <div><span>Date :</span></div>
                                                <div><span>Description :</span></div>
                                                <div><span>Durée :</span></div>

                                            </div>

                                            <div class="d-flex justify-content-center" className="butn_">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary btn-floating mx-1"
                                                    data-bs-dismiss="modal"
                                                >
                                                    Précedent
                                                </button>

                                                <button type="submit" class="btn btn-primary btn-block">Confirmer</button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </div >
        </>
    );
};

export default Programmerdébat;