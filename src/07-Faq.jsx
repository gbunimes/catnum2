/******FAQ******/

/***GENERAL***/
import {
  CheckProfile,
  IsEmpty,
  RegexThis,
  IsntEmpty,
  DisplayCollapse,
  DisplayArticleSubLink,
  CheckProfileFaq,
} from "./00-Appendix.jsx";
import ReactPlayer from "react-player";
import Helpcards from "./11-Helpcards.jsx";

/*PAGE*/
export default function Faq(data) {
  ///Check Page matching
  let myFaqProfile = CheckProfileFaq(data.data2);
  //console.log(data.data3);

  ///Check Page matching & collapses profile

  function checkOuterCollapses(props, i) {
    //If FAQ parents cat is there

    if (IsntEmpty(props.FaqParents)) {
      //If FAQ parents cat match current FAQ Cat
      if (props.FaqParents.includes(myFaqProfile.id)) {
        //Questions compatible with every profile & different from "0" (hidden Questions)
        if (props.profil != "0" && IsEmpty(props.profil)) {
          return (
            <div key={"Faq" + i}>
              {DisplayCollapse(props, i)}
              {/*DisplayArticleSubLink(props,data.data3, i)*/}
            </div>
          );
        } else if (
          props.profil != "0" &&
          props.profil.includes(CheckProfile())
        ) {
          //Questions compatible with this profile & different from "0" (hidden Questions)
          return (
            <div key={"Faq" + i}>
              {DisplayCollapse(props, i)}
              {/*DisplayArticleSubLink(props,data.data3, i)*/}
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
