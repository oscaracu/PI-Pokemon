import { Link } from "react-router-dom";

const Nav = (props) => {
  return (
    <>
      <header>
        <nav>
          <div>Logo</div>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>About</li>
            <li>Pokemons</li>
            <li>Create Pokemon</li>
          </ul>
          <div>
            <input type="text" name="search" id="search" />
            <button>Buscar</button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Nav;
