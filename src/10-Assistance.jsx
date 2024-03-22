/*****ASSISTANCE******/

import { RegexThis, CheckProfile, IsEmpty, CheckTag } from "./00-Appendix.jsx";
import Helpcards from "./11-Helpcards.jsx";

/***COMPONENT***/
export default function Assistance(data) {
  let currentProfil = data.data1;

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
          href={"assistance-" + CheckTag() + "/" + RegexThis(props.texte)}
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
      <Helpcards data1={data.data1} />
    </div>
  );
}
