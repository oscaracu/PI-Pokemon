import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { clearPokemon, getPokemon } from "../../redux/actions";
import Loading from "../Loading/Loading";
import styled from "styled-components";
import NotFound from "../NotFound/NotFound";

const baseUrl = "https://pi-pokemon-production-cccc.up.railway.app";

const PokemonSection = styled.section`
  color: #2c3e50;
  font-family: "Fredoka", sans-serif;
  background-image: url(${baseUrl}/images/front/blue_bg.jpg);

  .container {
    background-color: #ecf0f1cc;
    backdrop-filter: grayscale(60%);
    font-family: "Signika", sans-serif;
    display: flex;
    align-items: center;
    flex-direction: column;

    .summary {
      padding: 25px;
      background-color: #ecf0f1;
      max-width: 1000px;
      width: 75%;
      margin: 3em;
      display: flex;
      flex-direction: row;
      gap: 20px;

      h2 {
        margin: 0;
        margin-bottom: 8px;
        font-family: "Fredoka", sans-serif;
        font-size: 4em;
        color: #2980b9;

        .badge {
          font-family: "Signika", sans-serif;
          background-color: #7f8c8d;
          color: #ecf0f1;
          padding: 0px 10px;
          text-align: center;
          border-radius: 5px;
        }
      }

      .character-image {
        width: 50%;
        img {
          width: 100%;
          height: auto;
        }
      }

      .info {
        width: 50%;
        display: flex;
        align-items: center;

        .container {
          width: 100%;
          align-items: unset;

          .measures {
            font-family: "Fredoka One", cursive;
            color: #7f8c8d;
            font-size: 2em;
            margin-top: 5px;
            display: flex;
            flex-direction: row;
            gap: 25px;

            img {
              height: 50px;
              margin-right: 10px;
            }

            .weight,
            .height {
              display: flex;
              align-items: center;
            }
          }

          .stats {
            width: 100%;
            font-family: "Secular One", sans-serif;
            font-size: 1em;
            margin-bottom: 0.25em;

            :first-of-type {
              margin-top: 1em;
            }

            .skill {
              width: 100%;
              background-color: #bdc3c7;
            }

            .base-stat {
              height: 25px;
              color: #ecf0f1;
            }

            .hp {
              background-color: #16a085;
            }

            .attack {
              background-color: #c0392b;
            }

            .defense {
              background-color: #2980b9;
            }

            .speed {
              background-color: #f1c40f;
            }
          }

          .types {
            list-style-type: none;
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: left;
            align-items: center;
            gap: 5px;

            .normal {
              font-family: "Secular One", sans-serif;
              font-size: 0.8em;
              color: #ecf0f1;
              background: url(${baseUrl}/images/front/types/normal.svg)
                no-repeat 6px center;
              background-size: 16px;
              padding: 4px 8px 1px;
              padding-left: 24px;
              background-color: #7f8c8d;
              border-radius: 10px;
            }

            .fighting {
              font-family: "Secular One", sans-serif;
              font-size: 0.8em;
              color: #ecf0f1;
              background: url(${baseUrl}/images/front/types/fighting.svg)
                no-repeat 6px center;
              background-size: 16px;
              padding: 4px 8px 1px;
              padding-left: 24px;
              background-color: #f39c12;
              border-radius: 10px;
            }

            .bug {
              font-family: "Secular One", sans-serif;
              font-size: 0.8em;
              color: #ecf0f1;
              background: url(${baseUrl}/images/front/types/bug.svg) no-repeat
                6px center;
              background-size: 16px;
              padding: 4px 8px 1px;
              padding-left: 24px;
              background-color: #27ae60;
              border-radius: 10px;
            }

            .dark {
              font-family: "Secular One", sans-serif;
              font-size: 0.8em;
              color: #ecf0f1;
              background: url(${baseUrl}/images/front/types/dark.svg) no-repeat
                6px center;
              background-size: 16px;
              padding: 4px 8px 1px;
              padding-left: 24px;
              background-color: #2c3e50;
              border-radius: 10px;
            }

            .dragon {
              font-family: "Secular One", sans-serif;
              font-size: 0.8em;
              color: #ecf0f1;
              background: url(${baseUrl}/images/front/types/dragon.svg)
                no-repeat 6px center;
              background-size: 16px;
              padding: 4px 8px 1px;
              padding-left: 24px;
              background-color: #341f97;
              border-radius: 10px;
            }

            .electric {
              font-family: "Secular One", sans-serif;
              font-size: 0.8em;
              color: #ecf0f1;
              background: url(${baseUrl}/images/front/types/electric.svg)
                no-repeat 6px center;
              background-size: 16px;
              padding: 4px 8px 1px;
              padding-left: 24px;
              background-color: #f1c40f;
              border-radius: 10px;
            }

            .fairy {
              font-family: "Secular One", sans-serif;
              font-size: 0.8em;
              color: #ecf0f1;
              background: url(${baseUrl}/images/front/types/fairy.svg) no-repeat
                6px center;
              background-size: 16px;
              padding: 4px 8px 1px;
              padding-left: 24px;
              background-color: #ff9ff3;
              border-radius: 10px;
            }

            .fire {
              font-family: "Secular One", sans-serif;
              font-size: 0.8em;
              color: #ecf0f1;
              background: url(${baseUrl}/images/front/types/fire.svg) no-repeat
                6px center;
              background-size: 16px;
              padding: 4px 8px 1px;
              padding-left: 24px;
              background-color: #d35400;
              border-radius: 10px;
            }

            .flying {
              font-family: "Secular One", sans-serif;
              font-size: 0.8em;
              color: #ecf0f1;
              background: url(${baseUrl}/images/front/types/flying.svg)
                no-repeat 6px center;
              background-size: 16px;
              padding: 4px 8px 1px;
              padding-left: 24px;
              background-color: #3498db;
              border-radius: 10px;
            }

            .ghost {
              font-family: "Secular One", sans-serif;
              font-size: 0.8em;
              color: #ecf0f1;
              background: url(${baseUrl}/images/front/types/ghost.svg) no-repeat
                6px center;
              background-size: 16px;
              padding: 4px 8px 1px;
              padding-left: 24px;
              background-color: #8e44ad;
              border-radius: 10px;
            }

            .grass {
              font-family: "Secular One", sans-serif;
              font-size: 0.8em;
              color: #ecf0f1;
              background: url(${baseUrl}/images/front/types/grass.svg) no-repeat
                6px center;
              background-size: 16px;
              padding: 4px 8px 1px;
              padding-left: 24px;
              background-color: #16a085;
              border-radius: 10px;
            }

            .ground {
              font-family: "Secular One", sans-serif;
              font-size: 0.8em;
              color: #ecf0f1;
              background: url(${baseUrl}/images/front/types/ground.svg)
                no-repeat 6px center;
              background-size: 16px;
              padding: 4px 8px 1px;
              padding-left: 24px;
              background-color: #cc8e35;
              border-radius: 10px;
            }

            .ice {
              font-family: "Secular One", sans-serif;
              font-size: 0.8em;
              color: #ecf0f1;
              background: url(${baseUrl}/images/front/types/ice.svg) no-repeat
                6px center;
              background-size: 16px;
              padding: 4px 8px 1px;
              padding-left: 24px;
              background-color: #54a0ff;
              border-radius: 10px;
            }

            .poison {
              font-family: "Secular One", sans-serif;
              font-size: 0.8em;
              color: #ecf0f1;
              background: url(${baseUrl}/images/front/types/poison.svg)
                no-repeat 6px center;
              background-size: 16px;
              padding: 4px 8px 1px;
              padding-left: 24px;
              background-color: #9b59b6;
              border-radius: 10px;
            }

            .psychic {
              font-family: "Secular One", sans-serif;
              font-size: 0.8em;
              color: #ecf0f1;
              background: url(${baseUrl}/images/front/types/psychic.svg)
                no-repeat 6px center;
              background-size: 16px;
              padding: 4px 8px 1px;
              padding-left: 24px;
              background-color: #ff5252;
              border-radius: 10px;
            }

            .rock {
              font-family: "Secular One", sans-serif;
              font-size: 0.8em;
              color: #ecf0f1;
              background: url(${baseUrl}/images/front/types/rock.svg) no-repeat
                6px center;
              background-size: 16px;
              padding: 4px 8px 1px;
              padding-left: 24px;
              background-color: #ccae62;
              border-radius: 10px;
            }

            .steel {
              font-family: "Secular One", sans-serif;
              font-size: 0.8em;
              color: #ecf0f1;
              background: url(${baseUrl}/images/front/types/steel.svg) no-repeat
                6px center;
              background-size: 16px;
              padding: 4px 8px 1px;
              padding-left: 24px;
              background-color: #34495e;
              border-radius: 10px;
            }

            .water {
              font-family: "Secular One", sans-serif;
              font-size: 0.8em;
              color: #ecf0f1;
              background: url(${baseUrl}/images/front/types/water.svg) no-repeat
                6px center;
              background-size: 16px;
              padding: 4px 8px 1px;
              padding-left: 24px;
              background-color: #34ace0;
              border-radius: 10px;
            }
          }
        }
      }
    }

    .nav {
      width: 100%;
      min-height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url(${baseUrl}/images/front/blue_bg.jpg);
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      box-shadow: 0 5px 10px #bdc3c7;

      .arrows,
      .back {
        text-transform: uppercase;
        font-family: "Fredoka", sans-serif;
        font-size: 1.6em;
        font-weight: 500;
        text-shadow: 1px 1px 3px black, 1px 1px 3px black;
        color: #ecf0f1;
        border: none;
        background-color: unset;
        padding: 5px 25px;
        :hover {
          color: #f1c40f;
        }
        :disabled {
          visibility: hidden;
        }
      }

      .back {
        background-color: #34495e;
        :hover {
          background-color: #e74c3c;
          color: #ecf0f1;
        }
      }
    }
  }
`;

const Pokemon = (props) => {
  const history = useHistory();

  // Creamos un estado de carga
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  // Solicitamos los datos a nuestra API
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getPokemon(parseInt(id)));
    setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => dispatch(clearPokemon());
  }, [dispatch, id]);

  const {
    name,
    image,
    types = [],
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    totalRecords,
    error,
  } = useSelector((state) => state.pokemon);

  function prevBtnHandle() {
    history.push(`/pokemon/${parseInt(id) - 1}`);
  }

  function nextBtnHandle() {
    history.push(`/pokemon/${parseInt(id) + 1}`);
  }

  if (error) {
    return <NotFound message={error} />;
  } else if (loading) {
    return <Loading />;
  }

  const hpPercent = Math.floor((parseInt(hp) / 255) * 100);
  const hpStat = {
    width: hpPercent + "%",
  };

  const attackPercent = Math.floor((parseInt(attack) / 255) * 100);
  const attackStat = {
    width: attackPercent + "%",
  };

  const defensePercent = Math.floor((parseInt(defense) / 255) * 100);
  const defenseStat = {
    width: "" + defensePercent + "%",
  };

  const speedPercent = Math.floor((parseInt(speed) / 255) * 100);
  const speedStat = {
    width: "" + speedPercent + "%",
  };

  return (
    <PokemonSection>
      <div className="container">
        <div className="nav">
          <button
            className="arrows"
            onClick={prevBtnHandle}
            disabled={parseInt(id) - 1 === 0 ? true : false}
          >
            ◄ Prev
          </button>

          <button className="back" onClick={() => history.push("/pokemon")}>
            Back
          </button>
          <button
            className="arrows"
            onClick={nextBtnHandle}
            disabled={parseInt(id) + 1 > parseInt(totalRecords)}
          >
            Next ►
          </button>
        </div>
        <div className="summary">
          <div className="character-image">
            <img src={image} alt={name} />
          </div>
          <div className="info">
            <div className="container">
              <h2>
                {name} <span className="badge">#{id}</span>{" "}
              </h2>
              <ul className="types">
                {types.map((type) => (
                  <li className={type.name.toLowerCase()} key={type.id}>
                    {type.name.toUpperCase()}
                  </li>
                ))}
              </ul>
              <div className="stats">
                <span className="name">HP</span>
                <div className="skill">
                  <div className="base-stat hp" style={hpStat}></div>
                </div>
              </div>
              <div className="stats">
                <span className="name">ATTACK</span>
                <div className="skill">
                  <div className="base-stat attack" style={attackStat}></div>
                </div>
              </div>
              <div className="stats">
                <span className="name">DEFENSE</span>
                <div className="skill">
                  <div className="base-stat defense" style={defenseStat}></div>
                </div>
              </div>
              <div className="stats">
                <span className="name">SPEED</span>
                <div className="skill">
                  <div className="base-stat speed" style={speedStat}></div>
                </div>
              </div>
              {/* <ul>
                <li>hp: {hp}</li>
                <li>attack: {attack}</li>
                <li>defense: {defense}</li>
                <li>speed: {speed}</li>
              </ul> */}
              <div className="measures">
                <div className="weight">
                  <img
                    src={baseUrl + "/images/front/weight.png"}
                    alt="Weight"
                  />
                  <p>{weight ? weight / 10 : 0.0} Kg</p>
                </div>
                <div className="height">
                  <img
                    src={baseUrl + "/images/front/height.png"}
                    alt="Height"
                  />

                  <p>{height ? height / 10 : 0.0} m</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PokemonSection>
  );
};

export default Pokemon;
