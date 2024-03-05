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

/*let Data02 = GetFaqQuestions();*/
//Get all Json pages in folder
/*let Data03 = GetJsonArticles();*/

/***APP***/
export default function App() {
  //Get datas
  const [Loading, setLoading] = useState(true);
  const [Data1, setData1] = useState({});
  const [Data2, setData2] = useState({});
  const [Data3, setData3] = useState({});
  const [Data4, setData4] = useState({});
  const [Data5, setData5] = useState({});
  const [AllFAQ, setAllFAQ] = useState([]);

  let userName = "gbunimes";
  let repoName = "catnumData";
  let token = "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";

  //Get all categories
  const requestOne = axios.get(
    "https://raw.githubusercontent.com/" +
      userName +
      "/" +
      repoName +
      "/master/Catalogue.json",
  );

  //Get and store datas before rendering
  useEffect(() => {
    async function fetchDatas() {
      //Github data fetch
      const octokit = new Octokit({
        auth: token,
      });

      //Get FAQ datas
      let myFAQdatas = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner: userName,
          repo: repoName,
          path: "Faq",
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        },
      );
      /*console.log(myFAQdatas.data);*/

      //Get ARTICLES datas
      let myArticlesdatas = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner: userName,
          repo: repoName,
          path: "Pages",
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        },
      );
      /*console.log(myArticlesdatas.data);*/

      //Get Images datas
      let myImagesDatas = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner: userName,
          repo: repoName,
          path: "Images",
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        },
      );
      /*console.log(myImagesDatas.data);*/

      //Get Doc datas
      let myDocDatas = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner: userName,
          repo: repoName,
          path: "Doc",
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        },
      );
      /*console.log(myDocDatas.data);*/

      ///Catalogue data fetch & data setting + loading removing
      axios.all([requestOne]).then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          setData1(responseOne.data);
          setData2(myFAQdatas.data);
          setData3(myArticlesdatas.data);
          setData4(myImagesDatas.data);
          setData5(myDocDatas.data);
          setLoading(false);
        }),
      );
    }
    fetchDatas();
  }, []);

  //Check if loading is complete before rendering
  if (Loading) {
    return <Loader />;
  }
  //If loading is complete, render DOM
  else {
    //Getting all FAQ jsons
    let thoseFAQArticleNames = [];
    let AllFAQDatas = [];

    for (let i in Data2) {
      //console.log(Data2[i].download_url)
      thoseFAQArticleNames.push(Data2[i].name);
    }
    //console.log(thoseFAQArticleNames);

    for (let i in thoseFAQArticleNames) {
      const requestThis = axios.get(
        "https://raw.githubusercontent.com/" +
          userName +
          "/" +
          repoName +
          "/main/Faq/" +
          thoseFAQArticleNames[i],
      );

      axios.all([requestThis]).then(
        axios.spread((...responses) => {
          const responseOnly = responses[0].data;
          AllFAQDatas.push(responseOnly);

        }),
      );
    }
    console.log(AllFAQDatas.length);
    console.log(AllFAQDatas);
    



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
