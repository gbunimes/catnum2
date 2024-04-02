/******ARTICLE******/

/***GENERAL***/
import {
  RegexThis,
  checkInnerCollapses,
  IsEmpty,
  IsntEmpty,
  CheckProfile,
} from "./00-Appendix.jsx";
import Collapsible from "react-collapsible";
import ReactPlayer from "react-player";

/*PAGE*/
export default function Article(data) {
  ///Check Page matching
  function checkArticle(props, i) {
    let thisPage = window.location.href;
    if (thisPage.includes(RegexThis(props.titre))) {
      let thisArticle = props;
      //Create Page
      return (
        <div
          key={"article" + props.titre}
          id="articlePage"
          className="articlePage myPage"
        >
          <h1>{props.titre}</h1>
          {/*Check every Section*/}
          {thisArticle.sections.map((R, i) => displaySections1(R, i))}
          {/*Check every FAQ question*/}
          {checkFAQ(props.titre)}
        </div>
      );
    }
  }

  //Section display
  function displaySections1(props, i) {
    let sections = props;
    // create every section
    return (
      <div key={i} className="articleSection">
        {/*Check every section for profile*/}
        {sections.map((R, i) => displaySections2(R, i))}
      </div>
    );
  }

  //Display Section content
  function displaySections2(props, i) {
    let typeOfProp = Object.keys(props);
    let innerProp = Object.values(props);
    //Checks thath section isn't empty
    if (IsntEmpty(innerProp) || innerProp == "0") {
      //Checks if section match selected profile
      let outerProfil = CheckProfile();
      let innerProfil0 = String(innerProp);
      let delimiter = "-";
      let innerProfil1 = innerProfil0.split(delimiter);
      //If section profile doesn't match selected profile
      if (
        typeOfProp.includes("profil") &&
        !innerProfil1.includes(outerProfil)
      ) {
        return <h2 key={"undisplay" + outerProfil} className="unDisplay"></h2>;
      }
      //If section doesn't have a profile or if profile is matching selected profile
      else {
        //Check type of content and display accordingly
        //If content is a title
        if (typeOfProp == "titre") {
          return <h2 key={innerProp + " " + "Titre"}>{innerProp}</h2>;
        } else if (typeOfProp.includes("paragraphe")) {
          //If content is anparagraph
          return <p key={innerProp + i}>{innerProp}</p>;
        }

        //If content is an bold paragraph
        else if (typeOfProp.includes("gras")) {
          //If content is a paragraph
          return (
            <p className="fatP" key={innerProp + i}>
              {innerProp}
            </p>
          );
        }

        //If content is a quote/alert paragraph
        else if (typeOfProp.includes("quote")) {
          //If content is a paragraph
          return (
            <p className="quoteP" key={innerProp + i}>
              {innerProp}
            </p>
          );
        }

        //If content is an underlined paragraph
        else if (typeOfProp.includes("souligne")) {
          //If content is a paragraph
          return (
            <p className="underlinedP" key={innerProp + i}>
              {innerProp}
            </p>
          );
        }
        //If content is an italic paragraph
        else if (typeOfProp.includes("italique")) {
          //If content is a paragraph
          return (
            <p className="itaP" key={innerProp + i}>
              {innerProp}
            </p>
          );
        } else if (typeOfProp.includes("soustitre")) {
          //If content is a sub-title
          return (
            <p className="subTitle" key={innerProp}>
              <strong>{innerProp}</strong>
            </p>
          );
        } else if (typeOfProp.includes("image")) {
          //If content is an image
          return (
            <a
              key={innerProp + " " + "lien"}
              target="_blank"
              className="artLinkImg"
              href={"/img/articles/" + innerProp}
            >
              <img
                key={innerProp + "image"}
                src={"/img/articles/" + innerProp}
                alt={innerProp}
              />
            </a>
          );
        } else if (typeOfProp.includes("lien")) {
          //If content is a link
          if (IsntEmpty(innerProp[0].url) && !innerProp[0].url.includes("@")) {
            return (
              <a
                key={innerProp[0].url}
                className="CollLink"
                target="_blank"
                href={innerProp[0].url}
              >
                {innerProp[0].texte}
              </a>
            );
          }

          //If content is a mail adress
          if (IsntEmpty(innerProp[0].url) && innerProp[0].url.includes("@")) {
            return (
              <a
                key={innerProp[0].url}
                className="CollLink"
                target="_blank"
                href={"mailto:" + innerProp[0].url}
              >
                {innerProp[0].texte}
              </a>
            );
          }
        } else if (typeOfProp.includes("lienDoc")) {
          //If content is a local document
          if (IsntEmpty(innerProp[0].url)) {
            return (
              <a
                key={innerProp[0].url}
                className="CollLink"
                target="_blank"
                href={"/doc/" + innerProp[0].url}
              >
                {innerProp[0].texte}
              </a>
            );
          }
        } else if (
          //If content is a video
          typeOfProp.includes("video") ||
          typeOfProp.includes("vidéo")
        )
          if (innerProp[0].includes("mp4")) {
            //If content is a local video //
            return (
              <ReactPlayer
                key={innerProp}
                className="artVideo"
                url={"/doc/" + innerProp}
                controls={true}
              />
            );
          }
          //If content is a distant video //
          else {
            return (
              <ReactPlayer
                key={innerProp}
                className="artVideo"
                url={innerProp}
                controls={true}
              />
            );
          }
      }
    }
  }

  // check every first level question in FAQ
  function checkFAQ(props, i) {
    return data.data2.map((R, i) => checkFAQ2(R, props, i));
  }

  // display first level questions
  function checkFAQ2(R, props, i) {
    // Check if question in related to article title
    if (RegexThis(R.titre).includes(RegexThis(props))) {
      return (
        <div key="artCollapsibles" className="artCollapsibles">
          <Collapsible
            open="true"
            key={R.titre + i}
            id={R.titre + i}
            trigger={R.titre + " : " + "questions fréquentes"}
          >
            {/*check every second level question in FAQ*/}
            {R.sousArticle.map((R, i) => checkInnerCollapses(R, i))}
          </Collapsible>
        </div>
      );
    }
  }

  /*DOM*/
  return (
    <div className="outerArticle">
      {/*Dynamic Article Page creation from Json file*/}
      {data.data1.map((R, i) => checkArticle(R, i))}
    </div>
  );
}
