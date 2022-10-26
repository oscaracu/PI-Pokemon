import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const baseUrl = "https://pi-pokemon-production-cccc.up.railway.app";
// const baseUrl = "http://localhost:3001";

const Main = styled.div`
  color: #2c3e50;

  .top {
    font-family: "Secular One", sans-serif;
    background-image: url(${baseUrl}/images/front/red_bg.jpg);
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
          background-color: #3498db;
          text-decoration: none;
          font-size: 1.6em;
          color: #ecf0f1;
          padding: 10px 20px;
          background-size: 1200px;
          text-shadow: 2px 2px 3px black;
          box-shadow: 0px 2px 10px #7f8c8d77;

          &:hover {
            background-color: #e74c3c;
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
  return (
    <>
      <Main>
        <header>
          <div className="top">New pokemon are coming!</div>
          <nav>
            <div className="container">
              <div className="left">
                <Link to={"/"}>
                  <img
                    className="logo"
                    src={baseUrl + "/images/front/logo.svg"}
                    alt="Logo Pokemon"
                  />
                </Link>
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
        </header>
      </Main>
    </>
  );
};

export default Nav;
