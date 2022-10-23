import { useState } from "react";
import { Link } from "react-router-dom";
import { getPokemon } from "../../redux/actions";
import styled from "styled-components";
import Loading from "../Loading/Loading";

const Landing = (props) => {
  const { count, dispatch, useEffect, useSelector } = props;
  const [randomPokemon, setRandomPokemon] = useState({ id: 0, isSet: false });

  useEffect(() => {
    if (!randomPokemon.isSet && count) {
      const id = Math.floor(Math.random() * count);
      dispatch(getPokemon(id === 0 ? 1 : id));
      setTimeout(() => {
        setRandomPokemon({ id, isSet: true });
      }, 3000);
    }
  }, [count, dispatch, randomPokemon]);

  const { id, image } = useSelector((state) => state.pokemon);

  const Box = styled.div`
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    background-image: url("http://localhost:3001/images/front/blue_bg.jpg");
    background-repeat: repeat-x;
    background-size: 50% 50%;
    background-position: center center;

    .container {
      width: 85%;
      height: 100%;
      display: flex;
      flex-direction: row-reverse;

      .big-pokemon {
        width: 100%;
        background-image: url(${image});
        background-repeat: no-repeat;
        background-size: contain;
        background-position: left center;
      }

      > div {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        div {
          width: 90%;
          text-align: center;

          .btn {
            font-family: "Fredoka One", cursive;
            text-decoration: none;
            font-size: 2em;
            color: #ecf0f1;
            padding: 10px 20px;
            border-radius: 20px;
            background-color: #c0392b;
            box-shadow: 0px 5px 5px black;

            &:hover {
              background-color: #2c3e50;
              color: #ecf0f1;
            }
          }
        }

        img {
          width: 100%;
        }
      }
    }
  `;

  if (!randomPokemon.isSet) {
    return <Loading />;
  } else {
    return (
      <Box>
        <div className="container">
          <div className="big-pokemon">
            {/* <div>
            <img src={image} alt="Who is that Pokemon?" />
          </div> */}
          </div>
          <div>
            <div>
              <img
                src="http://localhost:3001/images/front/logo.png"
                alt="Pokemon"
              />
            </div>
            <div>
              <Link className="btn" to={"/pokemon"}>
                Entrar
              </Link>
            </div>
          </div>
        </div>
      </Box>
    );
  }
};

export default Landing;
