import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { clearPokemon, getPokemon } from "../../redux/actions";
import Loading from "../Loading/Loading";

const Pokemon = (props) => {
  const history = useHistory();

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
    totalRecords,
  } = useSelector((state) => state.pokemon);

  function prevBtnHandle() {
    history.push(`/pokemon/${parseInt(id) - 1}`);
  }

  function nextBtnHandle() {
    history.push(`/pokemon/${parseInt(id) + 1}`);
  }

  if (loading) return <Loading />;
  else
    return (
      <>
        <div>
          <button onClick={() => history.goBack()}>Back</button>
        </div>
        <div>
          <button
            onClick={prevBtnHandle}
            disabled={parseInt(id) - 1 === 0 ? true : false}
          >
            Prev
          </button>
          <button
            onClick={nextBtnHandle}
            disabled={parseInt(id) + 1 > parseInt(totalRecords)}
          >
            Next
          </button>
        </div>
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
