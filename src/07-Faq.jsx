/******FAQ******/

/***GENERAL***/
import { useState, useEffect } from "react";
import {
  CheckProfile,
  IsEmpty,
  RegexThis,
  IsntEmpty,
  DisplayCollapse,
  DisplayCollapse3,
  DisplayArticleSubLink,
  CheckProfileFaq,
} from "./00-Appendix.jsx";
import ReactPlayer from "react-player";
import Helpcards from "./11-Helpcards.jsx";

/*PAGE*/
export default function Faq(data) {
/*
  useEffect(() => {
    function checkCollapses1() {
      //Outer Collapses
      const All_Details = document.querySelectorAll("details");
      //console.log(All_Details);

      All_Details.forEach((deet) => {
        if (deet.className.includes("CollapsibleOne")) {
          deet.addEventListener("toggle", toggleOpenOneOnly);
        }
      });

      function toggleOpenOneOnly(e) {
        if (this.open) {
          All_Details.forEach((deet) => {
            if (deet.className.includes("CollapsibleOne")) {
              if (deet != this && deet.open) deet.open = false;
            }
          });
        }
      }
    }

    function checkCollapses2() {
      //Inner Collapses

      const All_Details = document.querySelectorAll("details");
      //      console.log(All_Details);

      All_Details.forEach((deet) => {
        if (deet.className.includes("CollapsibleTwo")) {
          deet.addEventListener("toggle", toggleOpenOneOnly);
        }
      });

      function toggleOpenOneOnly(e) {
        if (this.open) {
          All_Details.forEach((deet) => {
            if (deet.className.includes("CollapsibleTwo")) {
              if (deet != this && deet.open) deet.open = false;
            }
          });
        }
      }
    }

    //
    checkCollapses1();
    checkCollapses2();
  }, []);
*/
  ///Check Page matching
  let myFaqProfile = CheckProfileFaq(data.data2);

  ///Check Page matching & collapses profile
  function checkOuterCollapses(props, i) {
    //If FAQ parents cat is there
    if (IsntEmpty(props.FaqParents)) {
      //If FAQ parents cat match current FAQ Cat
      if (props.FaqParents.includes(myFaqProfile.id)) {
        //Questions compatible with every profile & different from "0" (hidden Questions)
        if (props.profil != "0" && IsEmpty(props.profil)) {
          return (
            <div className="collapseWrap" key={"Faq" + i}>
              {DisplayCollapse3(props,myFaqProfile, i)}
            </div>
          );
        } else if (
          props.profil != "0" &&
          props.profil.includes(CheckProfile())
        ) {
          //Questions compatible with this profile & different from "0" (hidden Questions)
          return (
            <div className="collapseWrap" key={"Faq" + i}>
              {DisplayCollapse3(props,myFaqProfile, i)}
            </div>
          );
        }
      }
    }
  }

  /*DOM*/
  return (
    <div>
      <div className="faqPage myPage">
        <div className="faqIntro">
          {/*Dynamic Intro creation from Json file*/}
          <h1>{myFaqProfile.texte}</h1>
        </div>
        {/*Dynamic Collapsible creation from Json file*/}
        {data.data1.map((R, i) => checkOuterCollapses(R, i))}

        <Helpcards data1={data.data4} />
      </div>
    </div>
  );
}
