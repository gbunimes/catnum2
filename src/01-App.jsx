/******APP******/

/***GENERAL***/
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import {
  RegexThis,
  CheckProfile,
  GetFAQLinks,
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
import Data01 from "../public/services/Catalogue.json";
//Get all FAQ Questions in folder
let Data02 = GetFaqQuestions();
//Get all Json pages in folder
let Data03 = GetJsonArticles();
//Get services availability
let Data04 = "https://www-apps.unimes.fr/etat-des-services/etat-service.php";
//Get all FAQ categories
import Data05 from "../public/services/FAQCatalogue.json";

/***APP***/
export default function App() {
  //Get datas
  const [Loading, setLoading] = useState(true);
  const [Data1, setData1] = useState({});
  const [Data2, setData2] = useState({});
  const [Data3, setData3] = useState({});
  const [Data4, setData4] = useState({});
  const [Data5, setData5] = useState({});

  //axios config
  const request4 = axios.get(Data04);

  //Get and store datas before rendering
  useEffect(() => {
    async function getDatas() {
      axios.all([request4]).then(
        axios.spread((...responses) => {
          const responseFour = responses[0];
          setData1(Data01);
          setData2(Data02);
          setData3(Data03);
          setData4(responseFour.data);
          setData5(Data05);
          setLoading(false);
        }),
      );
    }
    getDatas();
  }, []);

  //Check if loading is complete before rendering
  if (Loading) {
    return <Loader />;
  }
  //If loading is complete, render DOM
  else {
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
              <Homepage />;
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
              <Catalogue data1={Data1} data2={Data3} />
              <Footer data={Data4} />
            </Route>
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
              <Assistance data1={CheckProfile()} data2={Data5} data3={Data2} />
              <Footer data={Data4} />
            </Route>
            {/*FAQ*/}
            {GetFAQLinks(Data5).map((item) => (
              <Route
                key={"1-" + item}
                exact
                path={"/assistance-etudiants/" + item}
              >
                <Header data1={CheckProfile()} />
                <Faq
                  data1={Data2}
                  data2={Data05}
                  data3={Data3}
                  data4={CheckProfile()}
                />

                <Footer data={Data4} />
              </Route>
            ))}
            {GetFAQLinks(Data5).map((item) => (
              <Route
                key={"2-" + item}
                exact
                path={"/assistance-enseignants/" + item}
              >
                <Header data1={CheckProfile()} />
                <Faq
                  data1={Data2}
                  data2={Data05}
                  data3={Data3}
                  data4={CheckProfile()}
                />

                <Footer data={Data4} />
              </Route>
            ))}
            {GetFAQLinks(Data5).map((item) => (
              <Route
                key={"3-" + item}
                exact
                path={"/assistance-personnels/" + item}
              >
                <Header data1={CheckProfile()} />
                <Faq
                  data1={Data2}
                  data2={Data05}
                  data3={Data3}
                  data4={CheckProfile()}
                />
                <Footer data={Data4} />
              </Route>
            ))}
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
            {GetArticlesLinks(Data3).map((item) => (
              <Route key={"1-" + item} exact path={"/etudiants/" + item}>
                <Header data1={CheckProfile()} />
                <Article data1={Data3} data2={Data2} />
                <Footer data={Data4} />
              </Route>
            ))}
            {GetArticlesLinks(Data3).map((item) => (
              <Route key={"2-" + item} exact path={"/enseignants/" + item}>
                <Header data1={CheckProfile()} />
                <Article data1={Data3} data2={Data2} />
                <Footer data={Data4} />
              </Route>
            ))}
            {GetArticlesLinks(Data3).map((item) => (
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
