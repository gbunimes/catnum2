/******APP******/

/***GENERAL***/
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import {
  RegexThis,
  CheckProfile,
  GetJsonArticles,
  GetArticlesLinks,
  GetFaqQuestions,
} from "./00-Appendix.jsx";
import axios from "axios";

/***PAGES & COMPONENTS***/
import Loader from "./02-Loader.jsx";
import Header from "./03-Header.jsx";
import Footer from "./04-Footer.jsx";
import Homepage from "./05-Homepage.jsx";
import Catalogue from "./06-Catalogue.jsx";
import Faq from "./07-Faq.jsx";
import Article from "./08-Article.jsx";
import Search from "./09-Search.jsx";
import Assistance from "./10-Assistance.jsx";

/***DATAS***/
//Get all categories
let Data01 =
  "https://raw.githubusercontent.com/webunimes/services/master/Catalogue.json";
//Get all FAQ Questions in folder
let Data02 = GetFaqQuestions();
//Get all Json pages in folder
let Data03 = GetJsonArticles();
//Get services availability
let Data04 = "https://www-apps.unimes.fr/etat-des-services/etat-service.php";
//Get all FAQ categories
let Data05 =
  "https://raw.githubusercontent.com/webunimes/services/master/FAQCatalogue.json";
let Data06 = "https://api.github.com/repos/webunimes/services/contents/faq";
let Data07 =
  "https://api.github.com/repos/webunimes/services/contents/articles";

/***APP***/
export default function App() {
  //Get datas
  const [Loading, setLoading] = useState(true);
  const [Loading2, setLoading2] = useState(true);
  const [dom, setDom] = useState(false);
  const [Data1, setData1] = useState({});
  const [Data2, setData2] = useState({});
  const [Data3, setData3] = useState({});
  const [Data4, setData4] = useState({});
  const [Data5, setData5] = useState({});
  const [Data6, setData6] = useState({});
  const [Data7, setData7] = useState({});

  let allFaq = [];
  let allArticle = [];
  const [array, setArray] = useState([]);

  //axios config
  const request1 = axios.get(Data01);
  const request2 = axios.get(Data04);
  const request3 = axios.get(Data05);
  const request4 = axios.get(Data06);
  const request5 = axios.get(Data07);
  //Get and store datas before rendering

  useEffect(() => {
    async function getDatas() {
      axios.all([request1, request2, request3, request4, request5]).then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responseThree = responses[2];
          const responseFour = responses[3];
          const responseFive = responses[4];
          setData1(responseOne.data);
          setData2(Data02);
          setData3(Data03);
          setData4(responseTwo.data);
          setData5(responseThree.data);
          setData6(responseFour.data);
          setData7(responseFive.data);
          console.log("done");
          setLoading(false);
        }),
      );
    }

    getDatas();
  }, []);

  useEffect(() => {
    async function getDatas2() {
      console.log("coucou");
      let allDownloadurls1 = [];

      for (let i in Data7) {
        let thisData = Data7[i].download_url;
        allDownloadurls1.push(thisData);
      }
      let allArticleDatas = [];

      for (let i in allDownloadurls1) {
        let thisData = allDownloadurls1[i];
        const DataFetch = await axios.get(thisData);
        setArray((oldArray) => [...oldArray, DataFetch.data]);
      }
    }

    getDatas2();
  }, [Loading]);

  console.log(array);
  console.log(array.length);
  if (array.length >= 70) {
    console.log("ok");
    setLoading2(false);
    setDom(true);
  }
  /*
  console.log(Data1);
  console.log(Data2);
  console.log(Data3);
  console.log(Data4);
  console.log(Data5);
  console.log(Data6);
    console.log(Data7);
    */

  //Check if loading is complete before rendering
  if (Loading2) {
    return <Loader />;
  }
  //If loading is complete, render DOM
  else {
    if (dom) {
      /*
  getDatas2();
getDatas3();

async function getDatas2() {
  for (let i in Data6) {
    let thisData = Data6[i].download_url;
    const DataFetch = await axios.get(thisData);
    const DataFetch2 = DataFetch.data;
    allFaq.push(DataFetch2);
  }
}

async function getDatas3() {
  for (let i in Data7) {
    let thisData = Data7[i].download_url;
    //console.log(thisData)
    const DataFetch = await axios.get(thisData);
    const DataFetch2 = DataFetch.data;
    allArticle.push(DataFetch2);
  }
}

//console.log(allFaq);
console.log(allArticle);
console.log(allArticle[5]);

  */
      //DOM
      return (
        <Router>
          <div className="app">
            {/*ROUTES*/}
            <Switch>
              {/*DATA*/}
              <Route exact path="/etat-service.php"></Route>
              {/*ACCUEIL*/}
              <Route exact path="/accueil">
                <Homepage />
              </Route>
              {/*CATALOGUE*/}
              <Route
                exact
                path={[
                  "/catalogue-etudiants",
                  "/catalogue-enseignants-chercheurs",
                  "/catalogue-personnels",
                ]}
              >
                <Header data1={CheckProfile()} />
                <Catalogue data1={Data1} data2={allArticle} />
                <Footer data={Data4} />
              </Route>

              {/*FAQ*/}
              {/*           <Route
              exact
              path={[
                "/foire-aux-questions-etudiants",
                "/foire-aux-questions-enseignants",
                "/foire-aux-questions-personnels",
              ]}
            >
              <Header data1={CheckProfile()} />
              <Faq data1={Data2} />
              <Footer data={Data4} />
            </Route>
*/}

              {/*ASSISTANCE*/}
              <Route
                exact
                path={[
                  "/assistance-etudiants",
                  "/assistance-enseignants-chercheurs",
                  "/assistance-personnels",
                ]}
              >
                <Header data1={CheckProfile()} />
                <Assistance data1={CheckProfile()} data2={Data5} />
                <Footer data={Data4} />
              </Route>

              {/*SEARCH*/}
              <Route
                exact
                path={[
                  "/recherche-etudiants",
                  "/recherche-enseignants",
                  "/recherche-personnels",
                ]}
              >
                <Header data1={CheckProfile()} />
                <Search data1={Data3} />
                <Footer data={Data4} />
              </Route>
              {/*ARTICLES*/}
              {GetArticlesLinks(Data03).map((item) => (
                <Route key={"1-" + item} exact path={"/etudiants/" + item}>
                  <Header data1={CheckProfile()} />
                  <Article data1={Data3} data2={Data2} />
                  <Footer data={Data4} />
                </Route>
              ))}
              {GetArticlesLinks(Data03).map((item) => (
                <Route key={"2-" + item} exact path={"/enseignants/" + item}>
                  <Header data1={CheckProfile()} />
                  <Article data1={Data3} data2={Data2} />
                  <Footer data={Data4} />
                </Route>
              ))}
              {GetArticlesLinks(Data03).map((item) => (
                <Route key={"3-" + item} exact path={"/personnels/" + item}>
                  <Header data1={CheckProfile()} />
                  <Article data1={Data3} data2={Data2} />
                  <Footer data={Data4} />
                </Route>
              ))}
              {/*REDIRECT*/}
              <Route>
                <Redirect to="/accueil" />
              </Route>
            </Switch>
            <p className="downCop">Université de Nîmes - DSIUN</p>
          </div>
        </Router>
      );
    }
  }
}
