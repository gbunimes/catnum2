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

//new collapses

//

/*PAGE*/
export default function Faq(data) {
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
          return <div key={"Faq" + i}>{DisplayCollapse(props, i)}</div>;
        } else if (
          props.profil != "0" &&
          props.profil.includes(CheckProfile())
        ) {
          //Questions compatible with this profile & different from "0" (hidden Questions)
          return <div key={"Faq" + i}>{DisplayCollapse(props, i)}</div>;
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
        <div className="collapseWrap">
          <details className="Collapsible">
            <summary className="Collapsible__trigger">
              How do you create an accordion A?
            </summary>
            <div className="Collapsible__contentOuter">
              <div className="Collapsible__contentInner">
                <details className="Collapsible">
                  <summary className="Collapsible__trigger">
                    How do you create an accordion 0?
                  </summary>
                  <div className="Collapsible__contentOuter">
                    <div className="Collapsible__contentInner">
                      <div className="faqTextBlock">
                        <p>
                          Easy! As long as you don't have to support IE11 or
                          older
                        </p>
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </details>

          <details className="Collapsible">
            <summary className="Collapsible__trigger">
              How do you create an accordion B?
            </summary>
            <div className="Collapsible__contentOuter">
              <div className="Collapsible__contentInner">
                <details className="Collapsible">
                  <summary className="Collapsible__trigger">
                    How do you create an accordion 1 ?
                  </summary>
                  <div className="Collapsible__contentOuter">
                    <div className="Collapsible__contentInner">
                      <div className="faqTextBlock">
                        <p>
                          Easy! As long as you don't have to support IE11 or
                          older
                        </p>
                      </div>
                    </div>
                  </div>
                </details>

                <details className="Collapsible">
                  <summary className="Collapsible__trigger">
                    How do you create an accordion 2?
                  </summary>
                  <div className="Collapsible__contentOuter">
                    <div className="Collapsible__contentInner">
                      <div className="faqTextBlock">
                        <p>
                          Easy! As long as you don't have to support IE11 or
                          older
                        </p>
                      </div>
                    </div>
                  </div>
                </details>

                <details className="Collapsible">
                  <summary className="Collapsible__trigger">
                    How do you create an accordion 3?
                  </summary>
                  <div className="Collapsible__contentOuter">
                    <div className="Collapsible__contentInner">
                      <div className="faqTextBlock">
                        <p>
                          Easy! As long as you don't have to support IE11 or
                          older
                        </p>
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </details>
        </div>
        <Helpcards data1={data.data4} />
      </div>
    </div>
  );
}
