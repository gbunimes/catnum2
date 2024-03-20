/*****ASSISTANCE******/

import { RegexThis, CheckProfile, IsEmpty, CheckTag } from "./00-Appendix.jsx";

/***COMPONENT***/

export default function Assistance(data) {
  let currentProfil = data.data1;

  ///Check problematic profile
  function checkOuterProblems(props, i) {
    //Questions compatible with every profile & different from "0" (hidden Questions)
    if (
      (props.profil != "0" && IsEmpty(props.profil)) ||
      (props.profil != "0" && props.profil.includes(CheckProfile()))
    ) {
      return (
        <a
          className="problemCard"
          key={props.texte + i}
          href={CheckTag() + "/" + RegexThis(props.texte)}
        >
          <i className="fa-solid fa-circle-question"></i>
          <div key={i}>
            <p key={i + props.texte}>{props.texte} </p>
          </div>
          <i className="fa-solid fa-circle-question"></i>
        </a>
      );
    }
  }

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

  //DOM
  return (
    <div className=" catalogue assistPage">
      <div className="catalogueTitleWrap">
        {(() => {
          let thisProfile = CheckProfile();
          let thisTitre;
          if (thisProfile == "1") {
            let thisTitre = "étudiants";
            return (
              <h1 className="catalogueTitle">
                {"Assistance" + " " + thisTitre}
              </h1>
            );
          }
          if (thisProfile == "2") {
            let thisTitre = "Enseignants";
            return (
              <h1 className="catalogueTitle">
                {"Assistance" + " " + thisTitre}
              </h1>
            );
          }
          if (thisProfile == "3") {
            let thisTitre = "Personnels";
            return (
              <h1 className="catalogueTitle">
                {"Assistance" + " " + thisTitre}
              </h1>
            );
          }
        })()}
      </div>
      <div className="faqIntro">
        <p>
          Cet espace vous apporte les réponses aux problématiques les plus
          fréquemment rencontrées.
          <br />
          Dans le cas où vous ne trouveriez pas la réponse à votre question, le
          service de demande d'assistance, disponible en bas de page, est à
          votre disposition.
        </p>
      </div>
      <div className="problematicsWrapper">
        {/*Dynamic Collapsible creation from Json file*/}
        {data.data2.map((R, i) => checkOuterProblems(R, i))}
      </div>

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
            Des questions concernant la plateforme de cours en ligne e-campus ?
            Un besoin d'accompagnement ? <br />
          </h4>

          <p>
            Contactez le
            <a href="https://demat.unimes.fr/snap" target="_blank">
              Service Numérique & d'Accompagnement Pédagogique (SNAP)
            </a>
            .
          </p>
          <p>Téléphone: 0466364628.</p>
          <p>Horaires: 8h00-17h30 les jours ouvrés.</p>
        </div>
      </div>
    </div>
  );
}
