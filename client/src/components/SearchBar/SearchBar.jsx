import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

// const baseUrl = "http://localhost:3001";
const baseUrl = "https://pi-pokemon-production-cccc.up.railway.app";

const SearchSection = styled.section`
  background-image: url(${baseUrl}/images/front/pikachu_01.png),
    url(${baseUrl}/images/front/eevee_01.png),
    url(${baseUrl}/images/front/main_bg.png);
  background-size: contain, contain, cover;
  background-position: -80px, right, bottom;
  background-repeat: no-repeat;
  height: 450px;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    font-family: "Fredoka", sans-serif;
    margin-bottom: 30px;
    margin-top: -50px;
    text-align: center;
    width: 50%;
    font-size: 3.5em;
    color: #ecf0f1;
    text-shadow: 0 0 5px black, 0 0 5px black, 0 0 5px black, 0 0 5px black;
  }

  .container {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f1c40f;
    box-shadow: 0px 8px 16px #2c3e50;

    form {
      width: 100%;
      padding: 20px;
      display: flex;
      gap: 15px;
      font-family: "Fredoka", sans-serif;

      button {
        border: none;
        font-family: "Signika", sans-serif;
        font-size: 1.4em;
        padding: 0 40px;
        background-color: #e74c3c;
        color: #ecf0f1;
        text-shadow: 2px 2px 2px #2c3e50;
        font-weight: 500;

        :hover {
          background-color: #c0392b;
        }
      }

      input {
        width: 100%;
        height: 40px;
        border: none;
        padding: 15px 15px;
        font-size: 1.2em;
        color: #2c3e50;
        font-family: "Fredoka", sans-serif;

        :focus {
          border: none;
          outline: 3px solid #f39c1299;
        }

        ::placeholder {
          color: #95a5a6;
        }
      }
    }
  }
`;

const SearchBar = (props) => {
  const history = useHistory();
  const [search, setSearch] = useState("");

  function searchHandler(event) {
    event.preventDefault();
    if (search === "") history.push({ pathname: "/pokemon", search: "" });
    else history.push({ pathname: "/pokemon", search: `?name=${search}` });
    setSearch("");
  }

  return (
    <>
      <SearchSection>
        <h1>What Pokemon are you looking for today?</h1>
        <div className="container">
          <form onSubmit={searchHandler}>
            <input
              onChange={(event) => setSearch(event.target.value)}
              type="search"
              name="search"
              id="search"
              value={search}
              placeholder="Enter a Pokemon's name"
            />
            <button type="submit">Buscar</button>
          </form>
        </div>
      </SearchSection>
    </>
  );
};

export default SearchBar;
