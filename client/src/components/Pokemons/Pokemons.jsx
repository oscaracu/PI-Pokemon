import { Link, useRouteMatch } from "react-router-dom";

const Pokemons = (props) => {
  const { url } = useRouteMatch();
  const { id, name, image, types } = props.data;
  return (
    <>
      <div>
        <Link to={`${url}/${id}`}>
          <img src={image} alt={name} />
        </Link>
        <h1>{name}</h1>
        <p>N.°{id}</p>
        <ul>
          {types.map((type) => (
            <li key={type.id}>{type.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Pokemons;
