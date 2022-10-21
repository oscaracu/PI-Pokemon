import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearPokemon, getPokemon } from "../../redux/actions";
import Loading from "../Loading/Loading";

const Pokemon = (props) => {
  // Creamos un estado de carga
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  // Solicitamos los datos a nuestra API
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(getPokemon(parseInt(id)));
    setTimeout(() => {
      setLoading(false);
    }, 0);
    return () => dispatch(clearPokemon());
  }, [dispatch, id]);

  const {
    name,
    image,
    types = [],
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
  } = useSelector((state) => state.pokemon);

  if (loading) return <Loading />;
  else
    return (
      <>
        <div>
          <img src={image} alt={name} />
          <h1>{name}</h1>
          <h2>{id}</h2>
          <ul>
            {types.map((type) => (
              <li key={type.id}>{type.name}</li>
            ))}
          </ul>
          <ul>
            <li>hp: {hp}</li>
            <li>attack: {attack}</li>
            <li>defense: {defense}</li>
            <li>speed: {speed}</li>
          </ul>
          <p>height: {height}</p>
          <p>weight: {weight}</p>
        </div>
      </>
    );
};

export default Pokemon;
