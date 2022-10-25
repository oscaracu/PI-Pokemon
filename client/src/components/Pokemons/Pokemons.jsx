import { Link } from "react-router-dom";
import styled from "styled-components";

const Cards = styled.div`
  box-sizing: border-box;
  width: 23%;
  background-color: #ecf0f1;
  padding: 15px;

  h3,
  h4 {
    margin: 0;
    text-align: center;
  }

  .number {
    margin-top: -25px;
    font-size: 4em;
    color: #95a5a6;
  }

  .name {
    margin-top: -20px;
    margin-bottom: 8px;
    font-family: "Fredoka One", cursive;
    font-size: 1.9em;
    color: #2980b9;
  }

  .card-header {
    position: relative;
  }

  .card-body {
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;

      .Normal {
        font-family: "Secular One", sans-serif;
        font-size: 0.8em;
        color: #ecf0f1;
        background: url("http://localhost:3001/images/front/types/normal.svg")
          no-repeat 6px center;
        background-size: 16px;
        padding: 4px 8px 1px;
        padding-left: 24px;
        background-color: #7f8c8d;
        border-radius: 10px;
      }

      .Fighting {
        font-family: "Secular One", sans-serif;
        font-size: 0.8em;
        color: #ecf0f1;
        background: url("http://localhost:3001/images/front/types/fighting.svg")
          no-repeat 6px center;
        background-size: 16px;
        padding: 4px 8px 1px;
        padding-left: 24px;
        background-color: #f39c12;
        border-radius: 10px;
      }

      .Bug {
        font-family: "Secular One", sans-serif;
        font-size: 0.8em;
        color: #ecf0f1;
        background: url("http://localhost:3001/images/front/types/bug.svg")
          no-repeat 6px center;
        background-size: 16px;
        padding: 4px 8px 1px;
        padding-left: 24px;
        background-color: #27ae60;
        border-radius: 10px;
      }

      .Dark {
        font-family: "Secular One", sans-serif;
        font-size: 0.8em;
        color: #ecf0f1;
        background: url("http://localhost:3001/images/front/types/dark.svg")
          no-repeat 6px center;
        background-size: 16px;
        padding: 4px 8px 1px;
        padding-left: 24px;
        background-color: #2c3e50;
        border-radius: 10px;
      }

      .Dragon {
        font-family: "Secular One", sans-serif;
        font-size: 0.8em;
        color: #ecf0f1;
        background: url("http://localhost:3001/images/front/types/dragon.svg")
          no-repeat 6px center;
        background-size: 16px;
        padding: 4px 8px 1px;
        padding-left: 24px;
        background-color: #341f97;
        border-radius: 10px;
      }

      .Electric {
        font-family: "Secular One", sans-serif;
        font-size: 0.8em;
        color: #ecf0f1;
        background: url("http://localhost:3001/images/front/types/electric.svg")
          no-repeat 6px center;
        background-size: 16px;
        padding: 4px 8px 1px;
        padding-left: 24px;
        background-color: #f1c40f;
        border-radius: 10px;
      }

      .Fairy {
        font-family: "Secular One", sans-serif;
        font-size: 0.8em;
        color: #ecf0f1;
        background: url("http://localhost:3001/images/front/types/fairy.svg")
          no-repeat 6px center;
        background-size: 16px;
        padding: 4px 8px 1px;
        padding-left: 24px;
        background-color: #ff9ff3;
        border-radius: 10px;
      }

      .Fire {
        font-family: "Secular One", sans-serif;
        font-size: 0.8em;
        color: #ecf0f1;
        background: url("http://localhost:3001/images/front/types/fire.svg")
          no-repeat 6px center;
        background-size: 16px;
        padding: 4px 8px 1px;
        padding-left: 24px;
        background-color: #d35400;
        border-radius: 10px;
      }

      .Flying {
        font-family: "Secular One", sans-serif;
        font-size: 0.8em;
        color: #ecf0f1;
        background: url("http://localhost:3001/images/front/types/flying.svg")
          no-repeat 6px center;
        background-size: 16px;
        padding: 4px 8px 1px;
        padding-left: 24px;
        background-color: #3498db;
        border-radius: 10px;
      }

      .Ghost {
        font-family: "Secular One", sans-serif;
        font-size: 0.8em;
        color: #ecf0f1;
        background: url("http://localhost:3001/images/front/types/ghost.svg")
          no-repeat 6px center;
        background-size: 16px;
        padding: 4px 8px 1px;
        padding-left: 24px;
        background-color: #8e44ad;
        border-radius: 10px;
      }

      .Grass {
        font-family: "Secular One", sans-serif;
        font-size: 0.8em;
        color: #ecf0f1;
        background: url("http://localhost:3001/images/front/types/grass.svg")
          no-repeat 6px center;
        background-size: 16px;
        padding: 4px 8px 1px;
        padding-left: 24px;
        background-color: #16a085;
        border-radius: 10px;
      }

      .Ground {
        font-family: "Secular One", sans-serif;
        font-size: 0.8em;
        color: #ecf0f1;
        background: url("http://localhost:3001/images/front/types/ground.svg")
          no-repeat 6px center;
        background-size: 16px;
        padding: 4px 8px 1px;
        padding-left: 24px;
        background-color: #cc8e35;
        border-radius: 10px;
      }

      .Ice {
        font-family: "Secular One", sans-serif;
        font-size: 0.8em;
        color: #ecf0f1;
        background: url("http://localhost:3001/images/front/types/ice.svg")
          no-repeat 6px center;
        background-size: 16px;
        padding: 4px 8px 1px;
        padding-left: 24px;
        background-color: #54a0ff;
        border-radius: 10px;
      }

      .Poison {
        font-family: "Secular One", sans-serif;
        font-size: 0.8em;
        color: #ecf0f1;
        background: url("http://localhost:3001/images/front/types/poison.svg")
          no-repeat 6px center;
        background-size: 16px;
        padding: 4px 8px 1px;
        padding-left: 24px;
        background-color: #9b59b6;
        border-radius: 10px;
      }

      .Psychic {
        font-family: "Secular One", sans-serif;
        font-size: 0.8em;
        color: #ecf0f1;
        background: url("http://localhost:3001/images/front/types/psychic.svg")
          no-repeat 6px center;
        background-size: 16px;
        padding: 4px 8px 1px;
        padding-left: 24px;
        background-color: #ff5252;
        border-radius: 10px;
      }

      .Rock {
        font-family: "Secular One", sans-serif;
        font-size: 0.8em;
        color: #ecf0f1;
        background: url("http://localhost:3001/images/front/types/rock.svg")
          no-repeat 6px center;
        background-size: 16px;
        padding: 4px 8px 1px;
        padding-left: 24px;
        background-color: #ccae62;
        border-radius: 10px;
      }

      .Steel {
        font-family: "Secular One", sans-serif;
        font-size: 0.8em;
        color: #ecf0f1;
        background: url("http://localhost:3001/images/front/types/steel.svg")
          no-repeat 6px center;
        background-size: 16px;
        padding: 4px 8px 1px;
        padding-left: 24px;
        background-color: #34495e;
        border-radius: 10px;
      }

      .Water {
        font-family: "Secular One", sans-serif;
        font-size: 0.8em;
        color: #ecf0f1;
        background: url("http://localhost:3001/images/front/types/water.svg")
          no-repeat 6px center;
        background-size: 16px;
        padding: 4px 8px 1px;
        padding-left: 24px;
        background-color: #34ace0;
        border-radius: 10px;
      }
    }
  }

  img {
    width: 100%;
    height: auto;
  }
`;

const Pokemons = (props) => {
  const { id, name, image, types } = props.data;
  return (
    <Cards>
      <div className="card-header">
        <Link to={`/pokemon/${id}`}>
          <img src={image} alt={name} />
        </Link>
      </div>
      <div className="card-body">
        <h3 className="number">{id}</h3>
        <h4 className="name">{name}</h4>
        <ul>
          {types.map((type) => (
            <li className={type.name} key={type.id}>
              {type.name}
            </li>
          ))}
        </ul>
      </div>
    </Cards>
  );
};

export default Pokemons;
