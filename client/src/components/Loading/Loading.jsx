import styled from "styled-components";

const baseUrl = "https://pi-pokemon-production-cccc.up.railway.app";
// const baseUrl = "http://localhost:3001";

const LoadDiv = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-color: #ecf0f1;
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner-container {
    font-family: "Fredoka One", cursive;
    margin: 0px auto;
    text-align: center;
    .spinner {
      font-size: 2em;
      &__leter {
        /* font-weight: light; */
        position: relative;
        color: rgba(188, 188, 188, 0.25);
        /* text-transform: uppercase; */
        &:before {
          content: attr(letter);
          position: absolute;
          top: 0;
          left: 0;
          color: #333;
          animation: load-animation 2.8s infinite;
          animation-fill-mode: backwards;
          /* text-transform: uppercase; */
        }
        &:nth-child(2):before {
          animation-delay: 0.4s;
        }
        &:nth-child(3):before {
          animation-delay: 0.8s;
        }
        &:nth-child(4):before {
          animation-delay: 1.2s;
        }
        &:nth-child(5):before {
          animation-delay: 1.6s;
        }
        &:nth-child(6):before {
          animation-delay: 2s;
        }
        &:nth-child(7):before {
          animation-delay: 2.4s;
        }
        &:nth-child(8):before {
          animation-delay: 2.8s;
        }
        &:nth-child(9):before {
          animation-delay: 3.2s;
        }
        &:nth-child(10):before {
          animation-delay: 3.6s;
        }
        &:nth-child(11):before {
          animation-delay: 4s;
        }
        &:nth-child(12):before {
          animation-delay: 4.4s;
        }
        &:nth-child(13):before {
          animation-delay: 4.8s;
        }
      }
    }
  }

  @keyframes load-animation {
    0%,
    80%,
    to {
      transform: rotateY(-90deg);
      opacity: 0;
    }
    5% {
      opacity: 0.5;
    }
    20%,
    50% {
      transform: rotateY(0);
      opacity: 1;
    }
  }
`;

const Loading = (props) => {
  return (
    <LoadDiv>
      <div className="container">
        <img
          src={baseUrl + "/images/front/loading.gif"}
          alt="Loading Pokeball"
        />
        <section className="spinner-container">
          <div className="spinner">
            <span className="spinner__leter" letter="L">
              L
            </span>
            <span className="spinner__leter" letter="o">
              o
            </span>
            <span className="spinner__leter" letter="a">
              a
            </span>
            <span className="spinner__leter" letter="d">
              d
            </span>
            <span className="spinner__leter" letter="i">
              i
            </span>
            <span className="spinner__leter" letter="n">
              n
            </span>
            <span className="spinner__leter" letter="g">
              g
            </span>
            <span className="spinner__leter" letter=".">
              .
            </span>
            <span className="spinner__leter" letter=".">
              .
            </span>
            <span className="spinner__leter" letter=".">
              .
            </span>
          </div>
        </section>
      </div>
    </LoadDiv>
  );
};

export default Loading;
