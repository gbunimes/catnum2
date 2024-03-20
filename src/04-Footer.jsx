/******FOOTER******/

/***GENERAL***/
import { Tooltip } from "react-tooltip";
import { IsntEmpty, IsEmpty } from "./00-Appendix.jsx";

/***COMPONENT***/
export default function Footer(props) {
  //  console.log(props.data);

  //Check cards profile
  function checkStatuses(props, i) {
    return (
      <div className="innerOuter">
        {/*<p className="numStateTitle">État des services numériques</p>*/}
        <p className="numStateTitle">État des services</p>

        {(() => {
          if (IsEmpty(props.instable) && IsEmpty(props.ko)) {
            return (
              <div>
                <a
                  href="https://www-apps.unimes.fr/etat-des-services/"
                  target="_blank"
                >
                  <i className="fa-regular fa-circle-check "></i>
                  <p className="onlyFa">{props.ok}</p>

                </a>
              </div>
            );
          } else {
            return (
              <div>
                <a
                  href="https://www-apps.unimes.fr/etat-des-services/"
                  target="_blank"
                >
                  <i className="fa-regular fa-circle-check"></i>

                  <p>{props.ok}</p>

                  <i className="fa-regular fa-circle-question"></i>

                  <p>{props.instable}</p>
                  <i className="fa-regular fa-circle-xmark"></i>
                  <p>{props.ko}</p>
                </a>
              </div>
            );
          }
        })()}
      </div>
    );
  }

  /*DOM*/
  return (
    <footer
      id="footer"
      data-tooltip-id="serviceReview"
      data-tooltip-content="Permet de connaître à tout moment la disponibilité des services
                        numériques de Unîmes. Grâce aux pastilles de
                        couleur, vous pourrez connaître le nombre de service disponibles
                        (vert), partiellement perturbés (orange) ou encore complètement
                        indisponibles (rouge)."
      data-tooltip-place="top"
    >
      {checkStatuses(props.data)}
      <Tooltip id="serviceReview" classNameArrow="myArrow" />
    </footer>
  );
}
