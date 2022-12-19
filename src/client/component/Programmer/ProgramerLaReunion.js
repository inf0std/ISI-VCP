const SignInSignUp = (props) => {
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
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">
                                        Se connecter
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        Souscrire
                                    </a>
                                </li>
                            </ul>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">...</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">
                                Understood
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignInSignUp;
