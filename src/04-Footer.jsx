/******FOOTER******/

/***GENERAL***/
import { Tooltip } from "react-tooltip";

/***COMPONENT***/
export default function Footer() {
  /*DOM*/
  return (
    <footer
      id="footer"
      data-tooltip-id="serviceReview"
      data-tooltip-content="Permet de connaître à tout moment la disponibilité des services
                        numériques majeurs de l'université. Grâce aux pastilles de
                        couleur, vous pourrez connaître le nombre de service disponibles
                        (vert), partiellement perturbés (orange) ou encore complètement
                        indisponibles (rouge)."
      data-tooltip-place="top"
    >
      <p className="numStateTitle">État des services numériques</p>

      <a href="https://www-apps.unimes.fr/etat-des-services/">
        <img src="/img/ok.jpg" />
        <p>8</p>
        <img src="/img/incertain.jpg" /> <p>0</p>
        <img src="/img/down.jpg" /> <p>0</p>
      </a>
      <Tooltip id="serviceReview" classNameArrow="myArrow" />
    </footer>
  );
}
