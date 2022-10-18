const Nav = (props) => {
  return (
    <>
      <header>
        <nav>
          <div>Logo</div>
          <ul>
            <li>Home</li>
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
