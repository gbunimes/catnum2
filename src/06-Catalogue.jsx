/******CATALOGUE******/

/***GENERAL***/
import { RegexThis, CheckProfile, CheckTag, IsEmpty } from "./00-Appendix.jsx";

/*PAGE*/
export default function Catalogue(data) {
  //console.log(data)
  //Check cards profile
  function checkProfilForCard(props, i) {
    //Card compatible with every profile & different from "0" (hidden card)
    if (props.profil != "0" && IsEmpty(props.profil)) {
      return DisplayCard(props, i);
    } else if (props.profil != "0" && props.profil.includes(CheckProfile())) {
      //Card compatible with this profile & different from "0" (hidden card)
      return DisplayCard(props, i);
    }
  }

  //Displays Card since compatible with user profile
  function DisplayCard(props, i) {
    ////console.log(props)
    let cardName = props.texte;
    //images link rewriting
    return (
      <div className="card" key={"card" + i}>
        <div className="upperCard">
          <i className={props.icon}></i>
          <h2 className="cardTitle">
            {props.texte ? props.texte : "chargement..."}
          </h2>
        </div>
        <div className="downerCard">
          {data.data2.map((R, i) => checkProfilForCat(cardName, R, i))}
        </div>
      </div>
    );
  }

  function checkProfilForCat(cardName, props, i) {
    //console.log(props);
    //props has 2 or 3 parent categories
    if (props.categorieParent.length <= 3) {
      // check every parent category inside array
      for (let i in props.categorieParent) {
        let thisParent = props.categorieParent[i];
        // regex string for better matching
        let parentCat = RegexThis(thisParent);
        let cardName2 = RegexThis(cardName);
        //Category compatible with every profile & different from "0" (hidden cat) & is matching parent category
        if (
          parentCat.includes(cardName2) &&
          props.profil != "0" &&
          IsEmpty(props.profil)
        ) {
          return DisplayCat(props, i);
        }
        //Category compatible with this profile & different from "0" (hidden cat) & is matching parent category
        else if (
          parentCat.includes(cardName2) &&
          props.profil != "0" &&
          props.profil.includes(CheckProfile())
        ) {
          return DisplayCat(props, i);
        }
      }
    }

    //props only posesses one parent category
    else {
      // regex string for better matching
      let parentCat = RegexThis(props.categorieParent);
      let cardName2 = RegexThis(cardName);
      //Category compatible with every profile & different from "0" (hidden cat) & is matching parent category
      if (
        parentCat.includes(cardName2) &&
        props.profil != "0" &&
        IsEmpty(props.profil)
      ) {
        return DisplayCat(props, i);
      }
      //Category compatible with this profile & different from "0" (hidden cat) & is matching parent category
      else if (
        parentCat.includes(cardName2) &&
        props.profil != "0" &&
        props.profil.includes(CheckProfile())
      ) {
        return DisplayCat(props, i);
      }
    }
  }

  //Displays Category since compatible with user profile
  function DisplayCat(props, i) {
    //Category link rewriting
    return (
      <a key={props.titre + i} href={CheckTag() + "/" + RegexThis(props.titre)}>
        {props.titre ? props.titre : "chargement..."}
      </a>
    );
  }
  /*DOM*/
  return (
    <div>
      <div className="catalogue">
        <div className="catalogueTitleWrap">
          {(() => {
            let thisProfile = CheckProfile();
            let thisTitre;
            if (thisProfile == "1") {
              let thisTitre = "étudiants";
              return (
                <h1 className="catalogueTitle">{"Espace" + " " + thisTitre}</h1>
              );
            }
            if (thisProfile == "2") {
              let thisTitre = "Enseignants";
              return (
                <h1 className="catalogueTitle">{"Espace" + " " + thisTitre}</h1>
              );
            }
            if (thisProfile == "3") {
              let thisTitre = "Personnels";
              return (
                <h1 className="catalogueTitle">{"Espace" + " " + thisTitre}</h1>
              );
            }
          })()}
        </div>
        {/*Dynamic card creation from Json file*/}
        <div className="catalogueWrap">
          {data.data1.map((R, i) => checkProfilForCard(R, i))}
        </div>
      </div>
      ;
    </div>
  );
}
