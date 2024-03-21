/******APPENDIX******/
import Collapsible from "react-collapsible";
import ReactPlayer from "react-player";

//Rewrite entirely props
export function RegexThis(props) {
  let toModify1 = props.toLowerCase();
  let toModify2 = toModify1.replace(new RegExp(/[-]/g), "-");
  let toModify3 = toModify2.replace(new RegExp(/["âà"]/g), "a");
  let toModify4 = toModify3.replace(new RegExp(/[" "]/g), "-");
  let toModify5 = toModify4.replace(new RegExp(/["'"]/g), "-");
  let toModify6 = toModify5.replace(new RegExp(/[--]/g), "-");
  let toModify7 = toModify6.replace(new RegExp(/["èéêë"]/g), "e");
  let toModify8 = toModify7.replace(new RegExp(/["/"]/g), "");
  let toModify9 = toModify8.replace(new RegExp(/["("]/g), "");
  let toModify10 = toModify9.replace(new RegExp(/[")"]/g), "");
  let toModify11 = toModify10.replace(new RegExp(/["ç"]/g), "c");
  let toModify12 = toModify11.replace(new RegExp(/["î"]/g), "i");
  return toModify12;
}

//Rewrite props to lowercase & removing "-"
export function RegexThis2(props) {
  let toModify1 = props.toLowerCase();
  let toModify2 = toModify1.replace(new RegExp(/[-]/g), "");
  return toModify2;
}
//Check selected user profile
export function CheckProfile() {
  // etudiants
  if (window.location.href.includes("etudiants")) {
    let currentProfil = "1";
    return currentProfil;
  } else if (window.location.href.includes("enseignants")) {
    // enseignants
    let currentProfil = "2";
    return currentProfil;
  } else if (window.location.href.includes("personnels")) {
    // personnels
    let currentProfil = "3";
    return currentProfil;
  }
}

//Check selected user profile
export function CheckProfileFaq(props) {
  /*console.log(window.location.href)
  console.log(props)*/
  for (let i in props) {
    if (window.location.href.includes(RegexThis(props[i].texte))) {
      /*console.log("match")*/
      return props[i];
    }
  }
}

//create Tag from selected user profile
export function CheckTag() {
  // etudiants
  if (window.location.href.includes("etudiants")) {
    var currentTag = "etudiants";
    return currentTag;
  } else if (window.location.href.includes("enseignants")) {
    // enseignants
    var currentTag = "enseignants";
    return currentTag;
  } else if (window.location.href.includes("personnels")) {
    // personnels
    var currentTag = "personnels";
    return currentTag;
  }
}

//Get all Json pages from folder into Json array

export function GetJsonArticles() {
  const allPages = require.context("../public/services/articles", true);

  const allPagesList = allPages.keys().map((page) => allPages(page));
  let data = allPagesList.filter((element, index) => {
    return allPagesList.indexOf(element) === index;
  });

  //Alphabetical sort
  data = data.sort(function (a, b) {
    if (a.titre < b.titre) {
      return -1;
    }
    if (a.titre > b.titre) {
      return 1;
    }
    return 0;
  });
  return data;
}

//Get all FAQ questions from folder into Json array
export function GetFaqQuestions() {
  const allFAQ = require.context("../public/services/faq", true);
  const allFaqList = allFAQ.keys().map((page) => allFAQ(page));
  let data = allFaqList.filter((element, index) => {
    return allFaqList.indexOf(element) === index;
  });
  return data;
}

//Setting Articles Links; according to Json pages in data/articles
export function GetArticlesLinks(props) {
  let myArray = [];
  for (let i in props) {
    myArray.push(RegexThis(props[i].titre));
  }
  return myArray;
}

//Setting FAQ Links according to Json faq categories
export function GetFAQLinks(props) {
  /*console.log(props);*/
  let myArray = [];
  for (let i in props) {
    myArray.push(RegexThis(props[i].texte));
  }
  return myArray;
}

//verify prop is empty
export function IsEmpty(props) {
  if (props == null || props == undefined || props == "" || props == " ") {
    return true;
  } else {
    return false;
  }
}

//Verify prop isn't empty
export function IsntEmpty(props) {
  if (
    props != null &&
    props != undefined &&
    props != 0 &&
    props != "" &&
    props != " "
  ) {
    return true;
  } else {
    return false;
  }
}

//faq display
//Displays Collapses since compatible with user profile
export function DisplayCollapse(props, i) {
  return (
    <Collapsible open="true" key={props.titre + i} trigger={props.titre}>
      {props.sousArticle.map((R, i) => checkInnerCollapses(R, i))}
    </Collapsible>
  );
}

//Displays correlated article link
export function DisplayArticleSubLink(props, props2, i) {
  /*
  let theseOnes = [];
  for (let i in props2) {
    if (props2[i].titre.includes(props.titre)) {
      return (
        <div className="SubLinkinFAQ">
        <i className="fa-solid fa-caret-right"></i>
          <a target="_blank" href="">
            {"Visiter la page" + " " + props2[i].titre}
          </a>
        </div>
      );
    }
  }
  */
}

//Check inner collapses profile
export function checkInnerCollapses(props, i) {
  //Questions compatible with every profile & different from "0" (hidden Questions)
  if (props.profil != "0" && IsEmpty(props.profil)) {
    return DisplayCollapse2(props, i);
  } else if (props.profil != "0" && props.profil.includes(CheckProfile())) {
    //Questions compatible with this profile & different from "0" (hidden Questions)
    return DisplayCollapse2(props, i);
  }
}

//Displays inner collapses since compatible with user profile
function DisplayCollapse2(props, i) {
  return (
    <Collapsible key={props.titre + i} trigger={props.titre}>
      {props.contenu.map((R, i) => checkContent(R, i))}
    </Collapsible>
  );
}

//Check content profile
function checkContent(props, i) {
  //Questions compatible with every profile & different from "0" (hidden Questions)
  if (props.profil != "0" && IsEmpty(props.profil)) {
    return DisplayContent(props, i);
  } else if (props.profil != "0" && props.profil.includes(CheckProfile())) {
    //Questions compatible with this profile & different from "0" (hidden Questions)
    return DisplayContent(props, i);
  }
}

//Displays content since compatible with user profile
function DisplayContent(props, i) {
  return (
    <div key={props.titre + i} className="faqTextBlock">
      {(() => {
        //Check and display title if needed
        if (IsntEmpty(props.titre)) {
          return <h2>{props.titre}</h2>;
        }
      })()}

      {(() => {
        //Check and display paragraph if needed
        if (IsntEmpty(props.paragraphe)) {
          return <p>{props.paragraphe}</p>;
        }
      })()}

      {(() => {
        //Check and display bold  paragraph if needed
        if (IsntEmpty(props.gras)) {
          return <p className="fatP">{props.gras}</p>;
        }
      })()}

      {(() => {
        //Check and display italic paragraph if needed
        if (IsntEmpty(props.italique)) {
          return <p className="itaP">{props.italique}</p>;
        }
      })()}

      {(() => {
        //Check and display underlined paragraph if needed
        if (IsntEmpty(props.souligne)) {
          return <p className="underlinedP">{props.souligne}</p>;
        }
      })()}

      {(() => {
        //Check and display quote/alert paragraph if needed
        if (IsntEmpty(props.quote)) {
          return <p className="quoteP">{props.quote}</p>;
        }
      })()}

      {(() => {
        //Check and display image if needed
        if (IsntEmpty(props.image)) {
          return (
            <a
              className="linkImg"
              key={props.image + " " + "lien"}
              target="_blank"
              href={"/img/" + props.image}
            >
              <img src={"/img/" + props.image} alt={props.image} />
            </a>
          );
        }
      })()}

      {(() => {
        //Check and display vidéo if needed
        if (IsntEmpty(props.video)) {
          //If content is a local video //
          if (props.video.includes("mp4")) {
            return (
              <ReactPlayer
                key={props.video}
                className="artVideo"
                url={"/doc/" + props.video}
                controls={true}
              />
            );
          }
          //If content is a distant video //
          else {
            return (
              <ReactPlayer
                key={props.video}
                className="artVideo"
                url={props.video}
                controls={true}
              />
            );
          }
        }

        if (IsntEmpty(props.vidéo)) {
          //If content is a local video //
          console.log(props.vidéo);
          if (props.vidéo.includes("mp4")) {
            return (
              <ReactPlayer
                key={props.vidéo}
                className="artVideo"
                url={"/doc/" + props.vidéo}
                controls={true}
              />
            );
          }
          //If content is a distant video //
          else {
            return (
              <ReactPlayer
                key={props.vidéo}
                className="artVideo"
                url={props.vidéo}
                controls={true}
              />
            );
          }
        }
      })()}

      {(() => {
        //Check and display link if needed
        if (IsntEmpty(props.lien)) {
          if (IsntEmpty(props.lien.url)) {
            if (!props.lien.url.includes("@")) {
              return (
                <a
                  className="CollLink"
                  target="_blank"
                  key={props.lien.texte}
                  href={props.lien.url}
                >
                  {props.lien.texte ? props.lien.texte : "chargement..."}
                </a>
              );
            }
            //Check and display email adress
            else {
              return (
                <a
                  className="CollLink"
                  target="_blank"
                  key={props.lien.texte}
                  href={"mailto:" + props.lien.url}
                >
                  {props.lien.texte ? props.lien.texte : "chargement..."}
                </a>
              );
            }
          }
        }
      })()}

      {(() => {
        //Check and display local document if needed
        if (IsntEmpty(props.lienDoc)) {
          if (IsntEmpty(props.lienDoc.url)) {
            return (
              <a
                className="CollLink"
                target="_blank"
                key={props.lienDoc.texte}
                href={"/doc/" + props.lienDoc.url}
              >
                {props.lienDoc.texte ? props.lienDoc.texte : "chargement..."}
              </a>
            );
          }
        }
      })()}
    </div>
  );
}
