import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Landing = (props) => {
  const pokemons = useSelector((state) => state.pokemons);
  console.log(pokemons);

  return (
    <>
      <h1>Bienvenido a la Pokédex Pokemon</h1>
      <Link to={"/pokemon"}>Entrar</Link>
    </>
  );
};

export default Landing;
