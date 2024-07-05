/******FOOTER******/

/***GENERAL***/
import { Tooltip } from "react-tooltip";
import { IsntEmpty, IsEmpty } from "./00-Appendix.jsx";

/***COMPONENT***/
export default function Footer(props) {
  //Check Services statuses
  function checkStatuses(props, i) {
    return (
      <div
        className="innerOuter"
        data-tooltip-id="serviceReview"
        data-tooltip-content="Permet de connaître à tout moment la disponibilité des services
                        numériques de Unîmes. Grâce aux pastilles de
                        couleur, vous pourrez connaître le nombre de service disponibles
                        (vert), partiellement perturbés (orange) ou encore complètement
                        indisponibles (rouge)."
        /*data-tooltip-place="top"*/
        data-tooltip-place="left-end"
      >
        <p className="numStateTitle">État des services</p>

        {(() => {
          //If nothing is wrong
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
          }
          //If a service is down or troubled
          else {
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
      /*data-tooltip-id="serviceReview"
      data-tooltip-content="Permet de connaître à tout moment la disponibilité des services
                        numériques de Unîmes. Grâce aux pastilles de
                        couleur, vous pourrez connaître le nombre de service disponibles
                        (vert), partiellement perturbés (orange) ou encore complètement
                        indisponibles (rouge)."
      data-tooltip-place="top"*/
    >
      {/*Check Statuses*/}
    <div className="iWrapper">
    
        <p className="numStateTitle">ChatBot</p>

      <iframe
        src="https://wiki-test.unimes.fr/catnum/"
        width=""
        height=""
      ></iframe>
    </div>

      {checkStatuses(props.data)}
      <Tooltip id="serviceReview" classNameArrow="myArrow" />
    </footer>
  );
}
