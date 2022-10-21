import { Link } from "react-router-dom";

const Landing = (props) => {
  return (
    <>
      <h1>Bienvenido a la Pokédex Pokemon</h1>
      <Link to={"/pokemon"}>Entrar</Link>
    </>
  );
};

export default Landing;
