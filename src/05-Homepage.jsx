/******HOMEPAGE******/
/*PAGE*/
export default function Homepage() {
  /*DOM*/
  return (
    <div className="socketWrap homepage myPage ">
      {/*Welcome message*/}
      <img
        src="img/Logo.webp"
        className="logoLoader logoLoader2"
        alt="Logo Unîmes"
      />{" "}
      <h1>
        Bienvenue sur le catalogue des services numériques de l'université de
        Nîmes
      </h1>
      {/*User profile selector*/}
      <div className="idCardWrapper">
        <a className="etu idCard" href="/catalogue-etudiants">
          <p>étudiants</p>
        </a>

        <a className=" idCard ens" href="/catalogue-enseignants-chercheurs">
          <p>enseignants/chercheurs</p>
        </a>

        <a className="pers idCard" href="/catalogue-personnels">
          <p>Personnels</p>
        </a>
      </div>
    </div>
  );
}
