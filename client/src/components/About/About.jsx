import styled from "styled-components";
import {
  SiPostgresql,
  SiSequelize,
  SiExpress,
  SiNodedotjs,
  SiReact,
  SiRedux,
  SiStyledcomponents,
  SiLinkedin,
} from "react-icons/si";
const API_URL = process.env.REACT_APP_API_URL;

const Section = styled.section`
  background-color: #bdc3c7;
  background-image: url(${API_URL}/images/front/blue_bg.jpg);

  .title {
    width: 100%;
    min-height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${API_URL}/images/front/blue_bg.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0 5px 10px #bdc3c7;
    color: #ecf0f1;
    font-size: 1.4em;
    text-shadow: 1px 1px 3px black, 1px 1px 3px black;

    h1 {
      margin: 5px;
    }
  }

  .main {
    background-color: #ecf0f1cc;
    backdrop-filter: grayscale(60%);
    display: flex;
    justify-content: center;
    align-items: center;

    .container {
      font-family: "Fredoka", sans-serif;
      width: 85%;
      min-width: 1100px;
      max-width: 1100px;
      display: grid;
      grid-template-columns: auto auto;
      justify-content: center;
      margin: 35px;

      .picture {
        background-image: url(${API_URL}/images/front/about.jpg);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        img {
          width: 100%;
          visibility: hidden;
        }
      }
      .data {
        color: #7f8c8d;
        background-color: #ecf0f1;
        padding: 0 25px;

        .linked {
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.3em;
          text-align: center;
          gap: 0.2em;
          color: #7f8c8d;
          padding: 7px;
          border: 2px solid #95a5a6;
          border-radius: 7px;
          :hover {
            color: #34495e;
            border: 2px solid #34495e;
          }
        }

        .stack {
          width: 100%;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
          font-size: 3em;
          margin-bottom: 20px;
        }
      }
    }
  }
`;

const About = (props) => {
  return (
    <Section>
      <div className="title">
        <h1>About this SPA Project</h1>
      </div>

      <div className="main">
        <div className="container">
          <div className="picture">
            <img
              src={`${API_URL}/images/front/about.jpg`}
              alt="It's me... thumbs up!"
            />
          </div>
          <div className="data">
            <p>
              Hi, my name is Oscar Cu, <strong>FullStack Web Developer</strong>.
            </p>
            <p>
              I made this page for my Personal Proyect Exam at soyhenry.com. The
              theme, as you can see, its about Pokemon Game, one of my
              favourite's games of all times.
            </p>
            <p>
              The proyect consign was to develop a{" "}
              <strong>Fullstack Single Page Web App</strong>
              from scratch that must cointain a search bar, 12 pokemons per page
              list at principal view, a Pokemon details page for all Pokemon in
              the list and a controlled web form to create new Pokemon.
            </p>
            <ul>
              <li>
                All the data about Pokemon was retrieve using de{" "}
                <strong>Pokeapi.co RESTful API.</strong>
              </li>
              <li>
                The database was build using <strong>Postgres SQL</strong> and{" "}
                <strong>Sequelize ORM.</strong>
              </li>
              <li>
                The Back-end API was created using <strong>Express</strong> web
                framework for <strong>NodeJS</strong>.
              </li>
              <li>
                The Front-end was made with <strong>React</strong> library,{" "}
                <strong>Redux</strong> state container for JS and{" "}
                <strong>Styled-Components</strong> for CSS styles.
              </li>
            </ul>
            <div className="stack">
              <SiPostgresql />
              <SiSequelize />
              <SiExpress />
              <SiNodedotjs />
              <SiReact />
              <SiRedux />
              <SiStyledcomponents />
            </div>
            <div>
              <button
                className="linked"
                onClick={() =>
                  window.location.replace(
                    "https://www.linkedin.com/in/oscaracu/"
                  )
                }
              >
                Find me at Linked
                <SiLinkedin />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
