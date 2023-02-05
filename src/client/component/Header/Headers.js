import React from "react";

function Headers() {
  return (
    <div>
      <main>
        <section class="py-0 text-center container">
          <div class="row py-lg-1">
            <img
              src="/media/img/img.jpg"
              class="img-fluid rounded-start"
              alt="..."
            />
            <div class="col-lg-6 col-md-8 mx-auto">
              <h1 class="fw-black">SEEN Comunity</h1>
              <p class="lead text-black">
                outil de visioconférences, offre des activités en lignes, permet
                d'organiser des réunions, créer des salles de conférences et
                débats, discuter par messages grâce a une messagerie
                instantanées
              </p>
            </div>
          </div>
        </section>

        <div class="album py-5 bg-gray">
          <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 g-3">
              <div class="col">
                <div class="card shadow-sm rounded-4">
                  <img
                    src="/media/img/cof.jpg"
                    className="img-fluid rounded-4"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 className="card-title">Réunions gérées</h5>
                    <p class="card-text">
                      Dans une réunion en tant qu’organisateur vous pouvez
                      également diriger la réunion en clarifiant les rôles, en
                      établissant des règles et en participant en tant que
                      membre. L’organisateur résume les principales décisions et
                      recommandations faites au cours de la réunion tout en
                      veillant à ce que les membres restent responsables.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col ">
                <div class="card shadow-sm rounded-4">
                  <img
                    src="/media/img/msg.jpg"
                    className="img-fluid rounded-4"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 className="card-title">seen chat </h5>
                    <p class="card-text">
                      Vous pouvez envoyer un message privé à un utilisateur seul
                      ou à un groupe entier. En tant qu'hôte, vous pouvez
                      choisir avec qui les participants peuvent discuter ou
                      encore désactiver complètement le chat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ height: "25px" }}></div>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              <div class="col">
                <div class="card shadow-sm rounded-4">
                  <img
                    src="/media/img/rom.jpg"
                    className="img-fluid rounded-4"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 className="card-title">seen room </h5>
                    <p class="card-text">
                      apportent la collaboration par la vidéo dans n’importe
                      quel espace – dans le bureau, dans la salle de classe ou à
                      la maison – et permet d’interagir en temps réel avec les
                      personnes et les participants distantsoffre une expérience
                      intégrée pour.
                    </p>
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="card shadow-sm rounded-4">
                  <img
                    src="/media/img/deb.jpg"
                    className="img-fluid rounded-4"
                    alt="..."
                  />

                  <div class="card-body">
                    <h5 className="card-title">Programmer des réunions </h5>
                    <p class="card-text">
                      vous pouvez programmer et animer une réunion ou conférence
                      n’importe quel moment et n’importe où.
                    </p>
                  </div>
                </div>
              </div>

              <div class="card shadow-sm rounded-4">
                <img
                  src="/media/img/romm.jpg"
                  className="img-fluid rounded-4"
                  alt="..."
                />
                <div class="card-body">
                  <h5 className="card-title">Débat et conférences</h5>
                  <p class="card-text">
                    {" "}
                    un formidable moyen d’exposer ou d’échanger et de développer
                    son sens critique, ou encore d’éveiller les consciences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Headers;
