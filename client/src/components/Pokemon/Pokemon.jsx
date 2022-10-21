import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemon } from "../../redux/actions";

const Pokemon = (props) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPokemon(parseInt(id)));
  }, [dispatch, id]);

  const pokemon = useSelector((state) => state.pokemon);

  return (
    <>
      <div>
        <img src={pokemon.image} alt="Pokemon" />
        <h1>{pokemon.name}</h1>
        <h2>{pokemon.id}</h2>
        <ul>types</ul>
        <ul>
          <li>hp</li>
          <li>attack</li>
          <li>defense</li>
          <li>speed</li>
        </ul>
        <p>height</p>
        <p>weight</p>
      </div>
    </>
  );
};

export default Pokemon;
