import React from "react";
function ProfileHeaders() {
  return (
    <div style={{ backgroundColor: "rgba(234, 238, 238, 0.651)" }}>
      <main>
        <section className="py-0 text-center container">
          <div className="row py-lg-1">
            <img
              src="/media/img/img.jpg"
              className="img-fluid rounded-start"
              alt="..."
            />
            <div className="col-lg-6 col-md-8 mx-auto">
              <br /> <h1 className="fw-black">SEEN Community</h1>
              <br />
              <p
                className="lead text-black"
                style={{
                  marginBlock: "auto",
                  width: "900px",
                  marginLeft: "-190px",
                  WebkitTextStrokeWidth: "thin",
                }}
              >
                Notre outil de visioconférence offre une expérience de réunion
                en ligne complète et facile à utiliser. Il permet de mener des
                réunions en temps réel, de créer des salles de conférences
                virtuelles pour des débats en groupe, et d'échanger des messages
                instantanément grâce à une messagerie intégrée. Avec notre
                plateforme, vous pouvez organiser des réunions à distance de
                manière efficace et collaborative, sans avoir à vous déplacer.
                Rejoignez dès maintenant une nouvelle ère de la collaboration en
                ligne!
              </p>
            </div>
          </div>
        </section>

        <div className="album py-5 bg-gray">
          <div className="container">
            <div className="row">
              <div className="d-flex align-items-stretch">
                <div className="card col-md-6 shadow-sm rounded-4">
                  <img
                    src="/media/img/Col1.png"
                    className="img-fluid rounded-4"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">Réunions gérées</h5>
                    <p className="card-text">
                      Dans une réunion en tant qu’organisateur vous pouvez
                      également diriger la réunion en clarifiant les rôles, en
                      établissant des règles et en participant en tant que
                      membre. L’organisateur résume les principales décisions et
                      recommandations faites au cours de la réunion tout en
                      veillant à ce que les membres restent responsables.
                    </p>
                  </div>
                </div>
                <div className="card col-md-6 shadow-sm rounded-4">
                  <img
                    src="/media/img/chat.png"
                    className="img-fluid rounded-4"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">SEEN Chat </h5>
                    <p className="card-text">
                      Communiquez en toute confidentialité avec notre chat SEEN.
                      Avec notre fonctionnalité de messagerie privée, vous
                      pouvez envoyer des messages à un seul utilisateur ou à un
                      groupe entier. En tant qu'hôte, vous avez le pouvoir de
                      contrôler la conversation en choisissant avec qui les
                      participants peuvent discuter ou en désactivant
                      complètement le chat si nécessaire.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ height: "25px" }}></div>
            <div className="row ">
              <div className="d-flex align-items-stretch">
                <div className="card col-md-4 shadow-sm rounded-4">
                  <img
                    src="/media/img/col6.png
                    "
                    className="img-fluid rounded-4"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">SEEN Room </h5>
                    <p className="card-text">
                      Notre solution apporte la collaboration par la vidéo dans
                      n'importe quel environnement, que ce soit dans le bureau,
                      dans la salle de classe ou à la maison. Il permet
                      d'interagir en temps réel avec les personnes à distance,
                      offrant une expérience de collaboration intégrée et
                      fluide.
                    </p>
                  </div>
                </div>
                <div className="card col-md-4 shadow-sm rounded-4">
                  <img
                    src="/media/img/deb.jpg"
                    className="img-fluid rounded-4"
                    alt="..."
                  />

                  <div className="card-body">
                    <h5 className="card-title">Programmer des réunions </h5>
                    <p className="card-text">
                      Avec notre outil, vous pouvez planifier et animer une
                      réunion ou une conférence en tout temps et en tout lieu.
                      Il vous permet de rester connecté et productif, peu
                      importe où vous êtes.
                    </p>
                  </div>
                </div>

                <div className="card col-md-4shadow-sm rounded-4">
                  <img
                    src="/media/img/romm.jpg"
                    className="img-fluid rounded-4"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">Débat et conférences</h5>
                    <p className="card-text">
                      {" "}
                      un formidable moyen d’exposer ou d’échanger et de
                      développer son sens critique, ou encore d’éveiller les
                      consciences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfileHeaders;
