import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

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
      <header>
        <nav>
          <div>Logo</div>
          <ul>
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>About</li>
            <li>
              <NavLink to={"/pokemon"}>Pokemons</NavLink>
            </li>
            <li>
              <NavLink to={"/create"}>Create Pokemon</NavLink>
            </li>
          </ul>
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
        </nav>
      </header>
    </>
  );
};

export default Nav;
