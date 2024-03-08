/******FAQ******/

/***GENERAL***/
import {
  CheckProfile,
  IsEmpty,
  IsntEmpty,
  DisplayCollapse,
} from "./00-Appendix.jsx";
import ReactPlayer from "react-player";

/*PAGE*/
export default function Faq(data) {
 

  ///Check collapses profile
  function checkOuterCollapses(props, i) {
    //console.log(props);
    //Questions compatible with every profile & different from "0" (hidden Questions)
    if (props.profil != "0" && IsEmpty(props.profil)) {
      return DisplayCollapse(props, i);
    } else if (props.profil != "0" && props.profil.includes(CheckProfile())) {
      //Questions compatible with this profile & different from "0" (hidden Questions)
      return DisplayCollapse(props, i);
    }
  }

  /*DOM*/
  return (
    <div>
      <div className="faqPage myPage">
        <div className="faqIntro">
          {/*Dynamic Intro creation from Json file*/}
          <h1>Foire aux questions</h1>
          <p>
            Cet espace vous apporte les réponse aux questions les plus
            fréquemment posées, dans le cas où vous ne trouveriez pas la réponse
            à votre question, le service de demande d'assistance, disponible
            directement depuis le menu, est à votre disposition.
          </p>
        </div>
        {/*Dynamic Collapsible creation from Json file*/}
        {data.data1.map((R, i) => checkOuterCollapses(R, i))}
      </div>
    </div>
  );
}
