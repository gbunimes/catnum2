/*****HELPCARDS******/

import { RegexThis, CheckProfile, IsEmpty, CheckTag } from "./00-Appendix.jsx";

/***COMPONENT***/

export default function HelpCards(data) {
  //console.log(data);
  let currentProfil = data.data1;
  //DOM

  function checkProfil() {
    if (currentProfil == 1) {
      return (
        <p>
          Consulter la
          <a
            href="https://services-numeriques.unimes.fr/files/2022/07/charte-pedago-etudiant.pdf"
            target="_blank"
          >
            charte d'utilisation
          </a>
          .
        </p>
      );
    } else if (
      (currentProfil != 1 && currentProfil == 2) ||
      currentProfil == 3
    ) {
      return (
        <p>
          Consulter la
          <a
            href="https://services-numeriques.unimes.fr/files/2022/07/charte-personnel-applicable.pdf"
            target="_blank"
          >
            charte d'utilisation
          </a>
          .
        </p>
      );
    }
  }

  return (
    <div className="helpCardsWrapper">
      <div className="helpCards helpCards1">
        <h4>
          Besoin d'assitance ? <br />
          Vous avez d'autres questions concernant les services numériques ?
        </h4>

        {checkProfil()}

        <p>
          Parcourir la
          <a href="https://wiki.unimes.fr/doku.php" target="_blank">
            documentation
          </a>
          .
        </p>
        <p>
          Faire une
          <a
            href="https://glpi.unimes.fr/front/helpdesk.public.php?create_ticket=1"
            target="_blank"
          >
            demande d'assistance
          </a>
          .
        </p>

        <p>Téléphone: 0466364590.</p>
        <p>Horaires: 7h45-18h00 les jours ouvrés.</p>
      </div>
      <div className="helpCards  helpCards2">
        <h4>
          Des questions concernant la plateforme de cours en ligne e-campus ? Un
          besoin d'accompagnement ? <br />
        </h4>

        <p>
          Contactez le
          <a href="https://demat.unimes.fr/snap" target="_blank">
            Service Numérique & d'Accompagnement Pédagogique
          </a>          .
        </p>
        <p>Téléphone: 0466364628.</p>
        <p>Horaires: 8h00-17h30 les jours ouvrés.</p>
      </div>
    </div>
  );
}
