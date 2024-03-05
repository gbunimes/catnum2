/*****HEADER******/
import {
  RegexThis,
  CheckProfile,
  IsntEmpty,
  GetJsonArticles,
  GetArticlesLinks,
  GetFaqQuestions,
} from "./00-Appendix.jsx";

/***COMPONENT***/
export default function Header(data) {
  //user profile
  let currentProfil = data.data1;
  //Check user profile and set sublist links accordingly

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
  //Check user profile and set "catalogue" nav link accordingly
  function checkCatLink() {
    if (currentProfil == 1) {
      return "/catalogue-etudiants";
    } else if (currentProfil == 2) {
      return "/catalogue-enseignants-chercheurs";
    } else if (currentProfil == 3) {
      return "/catalogue-personnels";
    } else {
      return "/accueil";
    }
  }

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

  //Search on click function parameters
  function search(e) {
    // prevent automated url jump
    e.preventDefault();
    // get search details
    var text0 = document.getElementById("search").value;
    let delimiter = " ";
    // if search isn't empty
    if (IsntEmpty(text0)) {
      // Setting search page url according to selected profile & adding search details as url parameters before jumping to new url
      if (currentProfil == 1) {
        let myProfile = "/recherche-etudiants";
        let text = text0.split(delimiter);

        window.location.href = myProfile + "?" + "votre-recherche=" + text;
      } else if (currentProfil == 2) {
        let myProfile = "/recherche-enseignants";
        let text = text0.split(delimiter);
        window.location.href = myProfile + "?" + "votre-recherche=" + text;
      } else if (currentProfil == 3) {
        let myProfile = "/recherche-personnels";
        let text = text0.split(delimiter);
        window.location.href = myProfile + "?" + "votre-recherche=" + text;
      }
    }
  }

  //DOM
  return (
    <header id="header">
      <nav role="navigation">
        <div>
          {/*Site Logo*/}
          <a target="_blank" href="https://www.unimes.fr/fr/index.html">
            <img
              fetchpriority="high"
              src="/img/Logo.webp"
              className="logo"
              alt="Logo de l'université de Nîmes"
            />
          </a>
        </div>
        {/*Menu*/}
        <div className="rightNav">
          {/*alternative Logo for responsive*/}
          <div className="secondLogoWrap">
            <a target="_blank" href="https://www.unimes.fr/fr/index.html">
              <img
                fetchpriority="high"
                src="/img/LogoSmall.webp"
                className="logoSmall"
                alt="Logo de l'université de Nîmes"
              />
            </a>
            <p className="numTitle">Services Numériques Unîmes</p>
          </div>
          {/*MENU*/}
          <ul className="menu">
            {/*1 - Accueil*/}
            <li className="list">
              <a href="/accueil">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                </svg>
              </a>
            </li>
            {/*2 - Catalogue*/}
            <li className="list list1">
              <a href={checkCatLink()}>Catalogue</a>
            </li>
            {/*3 - FAQ */}
            <li>
              <a href={checkFaqLink()}>FAQ</a>
            </li>
            {/*4 - Assistance */}
            <li className="list list2 list3">
              Assistance {/*Dynamic sublist creation from Json file*/}
              <ul className="subList subList2">
                <li>
                  <a href="https://wiki.unimes.fr/doku.php" target="_blank">
                    documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://demat.unimes.fr/"
                    target="_blank"
                  >
                    Demande d'assistance
                  </a>
                </li>
                <li>{checkProfil()}</li>
              </ul>
            </li>
          </ul>
        </div>
        {/*5 - Search */}
        <div className="linkFa">
          <i className=" outerSearch fa-solid fa-search"></i>
          <form>
            <input
              type="text"
              className="form-control"
              id="search"
              placeholder="|"
            />
            <button
              type="submit"
              className="btn btn-default"
              id="WFF"
              onClick={search}
            >
              <i className="fa-solid fa-search"></i>
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
}
