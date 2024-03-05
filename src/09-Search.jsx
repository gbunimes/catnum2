/******SEARCH******/

/***GENERAL***/
import {
  RegexThis,
  IsntEmpty,
  IsEmpty,
  CheckTag,
  CheckProfile,
} from "./00-Appendix.jsx";
import { useEffect } from "react";

/*SEARCH PAGE*/
export default function Search(data) {
  //Check search parameters & display article pages links accordingly
  function checkdataMatching(props, i) {
    //Target search data
    const urlParams = new URLSearchParams(window.location.search);
    const search0 = urlParams.get("votre-recherche");
    let delimiter = ",";
    let search1 = search0.split(delimiter);
    // For every search word, check if article title includes search data
    let searchOne = RegexThis(search1[0]);
    if (IsntEmpty(props.motCles)) {
      for (let i in props.motCles) {
        let thisKeyWord = RegexThis(props.motCles[i]);

        if (thisKeyWord.includes(searchOne) && IsntEmpty(thisKeyWord)) {
          if (
            (IsntEmpty(props.profil) &&
              props.profil.includes(CheckProfile())) ||
            IsEmpty(props.profil)
          ) {
            return (
              <a
                className="found"
                key={props.titre + i}
                href={CheckTag() + "/" + RegexThis(props.titre)}
              >
                <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
                {props.titre}
              </a>
            );
          }
        }

        if (IsntEmpty(search1[1])) {
          let searchTwo = RegexThis(search1[1]);

          if (thisKeyWord.includes(searchTwo) && IsntEmpty(thisKeyWord)) {
            if (
              (IsntEmpty(props.profil) &&
                props.profil.includes(CheckProfile())) ||
              IsEmpty(props.profil)
            ) {
              return (
                <a
                  className="found"
                  key={props.titre + i}
                  href={CheckTag() + "/" + RegexThis(props.titre)}
                >
                  <i
                    className="fa fa-arrow-circle-right"
                    aria-hidden="true"
                  ></i>
                  {props.titre}
                </a>
              );
            }
          }
        }
      }
    }

    if (RegexThis(props.titre).includes(searchOne)) {
      //Check if article got profile || if so, if profile match selected user profile
      if (
        (IsntEmpty(props.profil) && props.profil.includes(CheckProfile())) ||
        IsEmpty(props.profil)
      ) {
        // return article pages links
        return (
          <a
            className="found"
            key={props.titre + i}
            href={CheckTag() + "/" + RegexThis(props.titre)}
          >
            <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
            {props.titre}
          </a>
        );
      }
    }

    if (IsntEmpty(search1[1])) {
      let searchTwo = RegexThis(search1[1]);

      if (RegexThis(props.titre).includes(searchTwo)) {
        //Check if article got profile || if so, if profile match selected user profile
        if (
          (IsntEmpty(props.profil) && props.profil.includes(CheckProfile())) ||
          IsEmpty(props.profil)
        ) {
          // return article pages links
          return (
            <a
              className="found"
              key={props.titre + i}
              href={CheckTag() + "/" + RegexThis(props.titre)}
            >
              <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
              {props.titre}
            </a>
          );
        }
      }
    } else {
      //return alert message because nothing was found
      return (
        <h2 key={"unfound" + i} className="unfound">
          Désolé, nous n'avons trouvé aucun résultat correspondant à votre
          recherche.
        </h2>
      );
    }
  }

  // get all alert message and undisplay them except for one
  useEffect(() => {
    let found = document.querySelectorAll(".found");
    if (found.length > 0) {
      const lists = document.querySelectorAll(".unfound");
      for (const list of lists) {
        list.remove();
      }
    } else {
      const lists = Array.prototype.slice.call(
        document.querySelectorAll(".unfound"),
        0,
        -1,
      );
      for (const list of lists) {
        list.remove();
      }
    }
  });

  /*DOM*/
  return (
    <div>
      <div className="faqPage myPage">
        <div className="faqIntro">
          {/*Dynamic Intro creation from Json file*/}
          <h1>Vos résultats de recherche</h1>
        </div>

        <div className="linkBox">
          {/*Dynamic Collapsible creation from Json file*/}
          {data.data1.map((R, i) => checkdataMatching(R, i))}
        </div>
      </div>
    </div>
  );
}
