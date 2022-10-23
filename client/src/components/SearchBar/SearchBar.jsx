import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";

const SearchSection = styled.div`
  color: #2c3e50;

  .top {
    font-family: "Secular One", sans-serif;
    background-image: url("http://localhost:3001/images/front/red_bg.jpg");
    padding: 10px;
    color: #ecf0f1;
    text-align: center;
    text-shadow: 2px 2px 5px black;
  }

  nav {
    background-color: #ecf0f1;
    display: flex;
    justify-content: center;

    .container {
      font-family: "Signika", sans-serif;
      width: 80%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      margin: 15px auto;

      div {
        text-align: center;
      }

      .logo {
        height: 80px;
        width: auto;
      }

      .menu {
        width: 60%;
      }

      .left,
      .right {
        width: 20%;

        .btn {
          text-decoration: none;
          font-size: 1.6em;
          color: #ecf0f1;
          padding: 10px 20px;
          border-radius: 20px;
          background-image: url("http://localhost:3001/images/front/blue_bg.jpg");
          background-size: 250px;
          text-shadow: 2px 2px 3px black;
          box-shadow: 0px 2px 10px #7f8c8d;

          &:hover {
            background-image: url("http://localhost:3001/images/front/red_bg.jpg");
            color: #ecf0f1;
          }
        }
      }

      ul {
        font-size: 1.4em;
        display: flex;
        justify-content: center;
        gap: 5px;
        list-style-type: none;
        margin: 0;
        padding: 0;
        text-transform: uppercase;
        /* font-weight: 600; */
        color: #2980b9;

        li {
          border-right: 2px solid #bdc3c7;
          padding: 7px 30px;

          :last-child {
            border-right: none;
          }

          a {
            text-decoration: none;
            color: #2980b9;

            :hover {
              color: #e74c3c;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
`;

const Nav = (props) => {
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
        <header>
          <div className="top">New pokemon are coming!</div>
          <nav>
            <div className="container">
              <div className="left">
                <img
                  className="logo"
                  src="http://localhost:3001/images/front/logo.png"
                  alt="Logo Pokemon"
                />
              </div>
              <div className="menu">
                <ul>
                  <li>
                    <NavLink to={"/"}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/pokemon"}>Pokemons</NavLink>
                  </li>
                  <li>About</li>
                </ul>
              </div>
              <div className="right">
                <NavLink className="btn" to={"/create"}>
                  Create
                </NavLink>
              </div>
            </div>
          </nav>
          <section className="search">
            <div>
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
          </section>
        </header>
      </SearchSection>
    </>
  );
};

export default Nav;
