
const ProgrammerReunio = (props) => {
    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#signup-signin"
            >
                Launch static backdrop modal
            </button>

            <div className="modal fade" id="signup-signin">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Connexion</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Inscription</button>
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

                                            <div class="form-outline mb-4">
                                                <label class="form-label" for="form1Example1">Email</label>
                                                <input type="email" id="form1Example1" class="form-control" />

                                            </div>


                                            <div class="form-outline mb-4">
                                                <label class="form-label" for="form1Example2">mot de passe</label>
                                                <input type="password" id="form1Example2" class="form-control" />

                                            </div>


                                            <div class="row mb-4">
                                                <div class="col d-flex justify-content-center">

                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value="" id="form1Example3" checked />
                                                        <label class="form-check-label" for="form1Example3"> Remember me </label>
                                                    </div>
                                                </div>

                                                <div class="col">

                                                    <a href="#!">Forgot password?</a>
                                                </div>
                                            </div>

                                            <div class="d-flex justify-content-center">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary btn-floating mx-1"
                                                    data-bs-dismiss="modal"
                                                >
                                                    annuler
                                                </button>

                                                <button type="submit" class="btn btn-primary btn-block">connexion</button>
                                            </div>

                                        </form>
                                    </div>

                                    <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                                        <form>


                                            <div class="form-outline mb-4">
                                                <label class="form-label" for="form6Example5">username</label>
                                                <input type="email" id="form6Example5" class="form-control" />

                                            </div>
                                            <div class="form-outline mb-4">
                                                <label class="form-label" for="form6Example5">email</label>
                                                <input type="email" id="form6Example5" class="form-control" />

                                            </div>



                                            <div class="form-outline mb-4">
                                                <label class="form-label" for="form6Example6">Phone</label>
                                                <input type="number" id="form6Example6" class="form-control" />

                                            </div>

                                            <div class="row mb-4">
                                                <div class="col">
                                                    <div class="form-outline">
                                                        <label class="form-label" for="form6Example1">mot de passe</label>
                                                        <input type="text" id="form6Example1" class="form-control" />

                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="form-outline">
                                                        <label class="form-label" for="form6Example2">Confirmation</label>
                                                        <input type="text" id="form6Example2" class="form-control" />

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex justify-content-center">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary btn-floating mx-1"
                                                    data-bs-dismiss="modal"
                                                >
                                                    annuler
                                                </button>

                                                <button type="submit" class="btn btn-primary btn-block">inscription</button>
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

export default ProgrammerReunio;