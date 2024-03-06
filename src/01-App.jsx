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

/***DATAS***/
//Get all categories
import Data01 from "./data/Catalogue.json";
//Get all FAQ Questions in folder
let Data02 = GetFaqQuestions();
//Get all Json pages in folder
let Data03 = GetJsonArticles();

/***APP***/
export default function App() {
  //Get datas
  const [Loading, setLoading] = useState(true);
  const [Data1, setData1] = useState({});
  const [Data2, setData2] = useState({});
  const [Data3, setData3] = useState({});

  /*********************************For posterior import with Axios - START*****************************************
  const [Data4, setData4] = useState({});
  const [Data5, setData5] = useState({});
  //Json file urls
  let Json1 = "https://catnum.comu.unimes.fr/etat-service.php";
  let Json2 = "https://catnum.comu.unimes.fr/etat-service.php";
  //axios config
  const requestOne = axios.get(Json1);
  const requestTwo = axios.get(Json2);
  //Data fetch  
  useEffect(() => {
    async function getDatas() {
      axios.all([requestOne, requestTwo]).then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          setData1(Data01);
          setData2(Data02);
          setData3(Data03);
          setData4(responseOne.data);
          setData5(responseTwo.data);
          setLoading(false);
        }),
      );
    }
    getDatas();
  }, []);  
  *********************************For posterior import with Axios - END******************************************/

  //Get and store datas before rendering
  useEffect(() => {
    async function getDatas() {
      setData1(Data01);
      setData2(Data02);
      setData3(Data03);
      setLoading(false);
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
              <Catalogue data1={Data1} data2={Data3} />
              <Footer />
            </Route>
            {/*FAQ*/}
            <Route
              exact
              path={[
                "/foire-aux-questions-etudiants",
                "/foire-aux-questions-enseignants",
                "/foire-aux-questions-personnels",
              ]}
            >
              <Header data1={CheckProfile()} />
              <Faq data1={Data2} />
              <Footer />
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
              <Footer />
            </Route>
            {/*ARTICLES*/}
            {GetArticlesLinks(Data03).map((item) => (
              <Route key={"1-" + item} exact path={"/etudiants/" + item}>
                <Header data1={CheckProfile()} />
                <Article data1={Data3} data2={Data2} />
                <Footer />
              </Route>
            ))}
            {GetArticlesLinks(Data03).map((item) => (
              <Route key={"2-" + item} exact path={"/enseignants/" + item}>
                <Header data1={CheckProfile()} />
                <Article data1={Data3} data2={Data2} />
                <Footer />
              </Route>
            ))}
            {GetArticlesLinks(Data03).map((item) => (
              <Route key={"3-" + item} exact path={"/personnels/" + item}>
                <Header data1={CheckProfile()} />
                <Article data1={Data3} data2={Data2} />
                <Footer />
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

/*TODO*/

/*

0 - add new textype à FAQ & article  (tableaux)
0 - voir pour template FAQ
0 - voir pour fetch dossier partagé
0 - implement keywords for articles
0 - etat des service implementation
0 - notice utilisation Json Article, cat et FAQs
0.9 - CHeck numérique unimes pour contenu
0 - distant storage json
0 - check all vid link for distant storage
-----------------------------------------------------------------
0 - simplify functions (FAQ ??)
-----------------------------------------------------------------
V - checkcaps for parentcategory
V - regroup display for article and faq ?
V- add new textype à FAQ (gras, etc...)
V - Search function
V- JSon file for every faq question
V - NO tel , No snap pour l'instant
V - Link collapse to page
V - condition section in pages
V - fond ou texte différent selon profil (espace : "étudiant")
V - category cards ==> icons + texte & only icons in mobile
*/