import { SiSocketdotio, SiExpress, SiWebrtc } from "react-icons/si";
import "./footer.css";
const HomeFooter = () => {
  return (
    <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
      <div className="col mb-3">
        <a
          href="/"
          className="d-flex align-items-center mb-3 link-dark text-decoration-none"
        >
          <img src="%PUBLIC_URL%/logo192.png" />
        </a>
        <p className="text-muted">&copy; 2023</p>
      </div>

      <div className="col mb-3"></div>

      <div className="col mb-3">
        <h5>Realisé Par</h5>
        <ul>
          <li>
            <a href="#">
              <i className="bx bxl-linkedin-square"></i>{" "}
              <i className="bx bxl-github"></i> Ahcene Faical (chef d'équipe)
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxl-linkedin-square"></i>{" "}
              <i className="bx bxl-github"></i> Ait-Ikene Nadjib (cordinateur){" "}
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxl-linkedin-square"></i>{" "}
              <i className="bx bxl-github"></i> Hamnache Krim Belkacem (Base De
              Donnée){" "}
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxl-linkedin-square"></i>{" "}
              <i className="bx bxl-github"></i> Sellah Amira (Base De Donnée){" "}
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxl-linkedin-square"></i>{" "}
              <i className="bx bxl-github"></i> Ghiles Amrane (Base De Donnée){" "}
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxl-linkedin-square"></i>{" "}
              <i className="bx bxl-github"></i> Rahmani Ania (Interface
              Utilisateur){" "}
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxl-linkedin-square"></i>{" "}
              <i className="bx bxl-github"></i> Haidou Nacer (Interface
              Utilisateur){" "}
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxl-linkedin-square"></i>{" "}
              <i className="bx bxl-github"></i> Boukaouma Djouher(Appel vidéo){" "}
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxl-linkedin-square"></i>{" "}
              <i className="bx bxl-github"></i> Boucherk Salim (Appel vidéo)
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxl-linkedin-square"></i>{" "}
              <i className="bx bxl-github"></i> Hadj Hamou Zaina (Compte
              Utilisateur et Publicité)
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxl-linkedin-square"></i>{" "}
              <i className="bx bxl-github"></i> Berkan Sarah (Compte Utilisateur
              et Publicité)
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxl-linkedin-square"></i>{" "}
              <i className="bx bxl-github"></i> Hamadi Salim (Partage D'écran)
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxl-linkedin-square"></i>{" "}
              <i className="bx bxl-github"></i> Lakef Massyl (Partage D'écran)
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxl-linkedin-square"></i>{" "}
              <i className="bx bxl-github"></i> Khelf Ferhat (Partage D'écran)
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxl-linkedin-square"></i>{" "}
              <i className="bx bxl-github"></i> Bennabi Iman (Messagerie
              Instantané)
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxl-linkedin-square"></i>{" "}
              <i className="bx bxl-github"></i> Chaban Chaouche Murad
              (Messagerie Instantané)
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxl-linkedin-square"></i>{" "}
              <i className="bx bxl-github"></i> Belharet Mohand-Ali (Messagerie
              Instantané)
            </a>
          </li>
        </ul>
      </div>

      <div className="col mb-3">
        <h5>Section</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              Home
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              Features
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              Pricing
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              FAQs
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              About
            </a>
          </li>
        </ul>
      </div>

      <div className="col mb-3">
        <h5>Section</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              Home
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              Features
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              Pricing
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              FAQs
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-muted">
              About
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default HomeFooter;
