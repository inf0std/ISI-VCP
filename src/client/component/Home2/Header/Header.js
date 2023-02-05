import React from 'react';
import './Header.css'
import Card from 'react-bootstrap/Card'
import img1 from "./rom.jpg"
import img2 from "./msg.jpg"
import img3 from "./deb.jpg"
import img4 from "./romm.jpg"
import img5 from "./roms.jpg"
import img6 from "./cof.jpg"

function Header() {
    return (
        <div className='headertop'>
            <div className='head0'>
                <div className='col-md-7 offset-3'>
                    <div class=" card mb-3">
                        <img src={img5} className="img-fluid rounded-start" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">SEEN</h5>
                            <p class="card-text"><li>Seen : outil  de visioconférences, offre des activités en lignes, permet de  organiser des réunions, créer  des salles conférences et débats, discuter par messages grâce a une messagerie instantanées</li></p>
                            <p class="card-text"><small class="text-muted"><li>Les services offerts par seen :</li></small></p>
                        </div>

                    </div>
                </div>
            </div>
            <div className='head1'>
                <div className='col-md-6 offset-1'>
                    <div className="card mb-8" >
                        <div className="row g-0">

                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">seen room </h5>
                                    <p className="card-text"> 	<li>apportent la collaboration par la vidéo dans n’importe quel espace – dans le bureau, dans la salle de classe ou à la maison – et permet d’interagir en temps réel avec les personnes et les participants distants</li>
                                        offre une expérience intégrée pour.</p>

                                    <li>  les audioconférences </li>
                                    <li>le partage d’écran sans fil</li>
                                    <li>la vidéoconférence</li>

                                    <p className="card-text"><small class="text-muted"></small></p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <img src={img1} className="img-fluid rounded-start" alt="..." />
                                <img src={img5} className="img-fluid rounded-start" alt="..." />
                            </div>

                        </div>
                    </div>

                </div>
                <div>
                </div>
                <div className='head2'>
                    <div className="col-md-3 offset-8">
                        <div className="col">
                            <div className="card">
                                <img src={img2} className="img-fluid rounded-start" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">seen chat</h5>
                                    <p className="card-text"><li> Vous pouvez envoyer un message privé à un utilisateur seul ou à un groupe entier. En tant qu'hôte, vous pouvez choisir avec qui les participants peuvent discuter ou encore désactiver complètement le chat.</li></p>
                                    <li>	discussion secrète : vous pouvez échanger des messages secret au cours de la réunion avec une personne spécifique en ouvrant la fenêtre de chat </li>
                                    <li>	discussion instantané : possibilité d’échanger des messages au cours de votre réunion </li>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='head3'>

                <div className='col-md-6 offset-1'>
                    <div className="card mb-8" >
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={img3} className="img-fluid rounded-start" alt="..." />
                                <img src={img4} className="img-fluid rounded-start" alt="..." />
                                <img src={img6} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Programmer tout type de réunio avec seen</h5>
                                    <p className="card-text"><li>Programmer des réunions : vous pouvez programmer et animer une réunion ou conférence n’importe quel moment et n’importe où </li></p>
                                    <li>Débat et conférences : un formidable moyen d’exposer ou d’échanger et de développer son sens critique, ou encore d’éveiller les consciences.</li>
                                    <li>Réunions gérées :

                                        Dans une réunion en tant qu’organisateur vous pouvez également diriger la réunion en           clarifiant les rôles, en établissant des règles et en participant en tant que membre. L’organisateur résume les principales décisions et recommandations faites au cours de la réunion tout en veillant à ce que les membres restent responsables. Le président clôt la séance à l'heure.
                                    </li>
                                    <li>gérer les rôles</li>
                                    <li>autorisations de chaque membre        </li>
                                    <p className="card-text"><small class="text-muted">un formidable moyen pour réaliser un travail collaboratif, en regroupant la visioconférence, diaporama et la messagerie instantanée</small></p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Header;