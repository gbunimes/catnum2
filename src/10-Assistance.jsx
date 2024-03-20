/*****ASSISTANCE******/

import {
  RegexThis,
  CheckProfile,
  IsEmpty,
  CheckTag,
  /*GetJsonArticles,
  GetArticlesLinks,
  GetFaqQuestions,*/
} from "./00-Appendix.jsx";

/***COMPONENT***/

export default function Assistance(data) {
  console.log(data);
  //user profile
  let currentProfil = data.data1;
  //console.log(currentProfil);
  //console.log(data.data2);

  ///Check problematic profile
  function checkOuterProblems(props, i) {
    //console.log(props);
    //Questions compatible with every profile & different from "0" (hidden Questions)
    if (props.profil != "0" && IsEmpty(props.profil)) {
      //      console.log(props + " " + "ok for every profile");

      return (
        //Displays problematic links
        <a
        className="problemCard"
          key={props.texte + i}
          href={CheckTag() + "/" + RegexThis(props.texte)}
        >
          <div key={i}>
            <p key={i + props.texte}>{props.texte} </p>
          </div>
        </a>
      );
    } else if (props.profil != "0" && props.profil.includes(CheckProfile())) {
      //    console.log(props + " " + "ok for this profile");

      //Questions compatible with this profile & different from "0" (hidden Questions)
      return (
        <a
        className="problemCard"
        
          key={props.texte + i}
          href={CheckTag() + "/" + RegexThis(props.texte)}
        >
        <div key={i}>
          <p key={i + props.texte}>{props.texte} </p>
        </div>
        </a>
      );
    }
  }

  //Check user profile and set sublist links accordingly
  /*
  function checkProfil() {
    if (currentProfil == 1) {
      return (
        <a
          href="https://services-numeriques.unimes.fr/files/2022/07/charte-pedago-etudiant.pdf"
          target="_blank"
        >
          Charte d'utilisation
        </a>
      );
    } else if (
      (currentProfil != 1 && currentProfil == 2) ||
      currentProfil == 3
    ) {
      return (
        <a
          href="https://services-numeriques.unimes.fr/files/2022/07/charte-personnel-applicable.pdf"
          target="_blank"
        >
          Charte d'utilisation
        </a>
      );
    }
  }
*/

  /*
  //Check user profile and set "FAQ" nav link accordingly
  function checkFaqLink() {
    if (currentProfil == 1) {
      return "/foire-aux-questions-etudiants";
    } else if (currentProfil == 2) {
      return "/foire-aux-questions-enseignants";
    } else if (currentProfil == 3) {
      return "/foire-aux-questions-personnels";
    } else {
      return "/accueil";
    }
  }
  */

  //DOM
  return (
    <div className="faqPage catalogue assistPage">
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
          Cet espace vous apporte les réponse aux problèmatiques les plus
          fréquemment rencontrées.<br/>
          Dans le cas où vous ne trouveriez pas la
          réponse à votre question, le service de demande d'assistance,
          disponible en bas de page, est à votre disposition.
        </p>
      </div>
      <div className="problematicsWrapper">
        {/*Dynamic Collapsible creation from Json file*/}
        {data.data2.map((R, i) => checkOuterProblems(R, i))}
      </div>

      <div className="helpCardsWrapper">
        <div className="helpCards1"></div>
        <div className="helpCards2"></div>
      </div>
    </div>
  );
}
