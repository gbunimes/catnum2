/******APP******/

/***GENERAL***/
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import {
  RegexThis,
  CheckProfile,
  IsntEmpty,
  GetArticlesLinks,
} from "./00-Appendix.jsx";
import axios from "axios";
const { Octokit } = require("@octokit/rest");

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
import myTok from "./data/MyTok.json";

/***APP***/
export default function App() {
  //Get datas
  const [Loading, setLoading] = useState(true);
  const [githubData, setGithubData] = useState([]);

  let userName = "gbunimes";
  let repoName = "catnumData";
  let token = myTok.myTok;

  //Get all categories
  let myUrl =
    "https://raw.githubusercontent.com/" +
    userName +
    "/" +
    repoName +
    "/master/Catalogue.json";

  const fetchData = () => {
    //return fetch(`https://api.github.com/users/${userName}`)
    return fetch(myUrl)
      .then((response) => response.json())
      .then((data) => setGithubData(data))
      .then(setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(githubData);

  //Check if loading is complete before rendering
  if (Loading) {
    return <Loader />;
  }
  //If loading is complete, render DOM
  else {
    return (
      <Router>
        <div className="app">
          {/*ROUTES*/}
          <Switch>
            {/*DATA*/}
            {/*<Route exact path="/etat-service.php"></Route>*/}
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
              {/*<Catalogue data1={Data1} data2={Data3} />*/}
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

              <Faq data1={githubData} />
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
              {/*<Search data1={Data3} />*/}
              <Footer />
            </Route>
            {/*ARTICLES*/}
            {/*            {GetArticlesLinks(Data3).map((item) => (
              <Route key={"1-" + item} exact path={"/etudiants/" + item}>
                <Header data1={CheckProfile()} />
                <Article data1={Data3} data2={Data2} />
                <Footer />
              </Route>
            ))}
            {GetArticlesLinks(Data3).map((item) => (
              <Route key={"2-" + item} exact path={"/enseignants/" + item}>
                <Header data1={CheckProfile()} />
                <Article data1={Data3} data2={Data2} />
                <Footer />
              </Route>
            ))}
            {GetArticlesLinks(Data3).map((item) => (
              <Route key={"3-" + item} exact path={"/personnels/" + item}>
                <Header data1={CheckProfile()} />
                <Article data1={Data3} data2={Data2} />
                <Footer />
              </Route>
            ))}*/}
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
0 - store token in local uncommited jsonFile
0 - remove octokit
0 - voir article service snap + 0 etu et renommer en accompagnement pédagogique
0 - voir ticketink link demat
0 - faq filter in article : first profile filter bug !!!
0 - close collapse FAQ
0 - tri longueur cat sur page catalogue ?!

0 - voir fetch pour github
0 - etat des service implementation - Voir guillaume
0 - notice utilisation Json Article, cat et FAQs

0.9 - CHeck numérique unimes pour contenu
0 - simplify functions (FAQ ??)

X - add new textype à FAQ & article  (tableaux)
-----------------------------------------------------------------

V - voir pour template FAQ
V - check all vid link for distant storage
V - implement keywords for articles
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
