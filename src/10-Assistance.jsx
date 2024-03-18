/*****HEADER******/

import {
  /*RegexThis,*/
  CheckProfile,
  IsEmpty,
  /*GetJsonArticles,
  GetArticlesLinks,
  GetFaqQuestions,*/
} from "./00-Appendix.jsx";

/***COMPONENT***/

export default function Assistance(data) {
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

      return <div key={ i} ><p key={i + props.texte}>{props.texte} </p></div>
    } else if (props.profil != "0" && props.profil.includes(CheckProfile())) {
  //    console.log(props + " " + "ok for this profile");

      //Questions compatible with this profile & different from "0" (hidden Questions)
      return <div key={ i} ><p key={i + props.texte}>{props.texte} </p></div>


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
    <div className="faqPage myPage">
      <div className="faqIntro">
        {/*Dynamic Intro creation from Json file*/}
        <h1>HelpCard title</h1>
        <p>
          Cet espace vous apporte les réponse aux problèmatiques les plus
          fréquemment rencontrées, dans le cas où vous ne trouveriez pas la
          réponse à votre question, le service de demande d'assistance,
          disponible en bas de page, est à votre disposition.
        </p>
      </div>
      <div className="problematicsWrapper">
        {/*Dynamic Collapsible creation from Json file*/}
        {data.data2.map((R, i) => checkOuterProblems(R, i))}
      </div>
    </div>
  );
}