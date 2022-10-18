import { useEffect } from "react";
import Pokemons from "../Pokemons/Pokemons";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getPrevOrNext } from "../../redux/actions";
import { useLocation, useHistory } from "react-router-dom";

const Home = (props) => {
  // Obtenemos los querys pasados por url para armar la paginación
  const location = useLocation();
  const history = useHistory();
  const search = location.search;
  // Nos suscribimos al store para renderear el componente cada vez que tengamos un cambio
  const pokemons = useSelector((state) => state.pokemons);
  const prev = useSelector((state) => state.prev);
  const next = useSelector((state) => state.next);
  const count = useSelector((state) => state.count);
  // Hacemos la solicitud inicial a la API
  const dispatch = useDispatch();
  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(getAllPokemons(search));
    }
  }, [pokemons, dispatch, search]);

  return (
    <>
      <div>
        <p>
          Order:
          <span> Asc </span>|<span> Desc </span>
        </p>
      </div>
      <div>
        <button
          onClick={() => {
            history.push(`/pokemons/?${prev ? prev.split("?").pop() : ""}`);
            dispatch(getPrevOrNext(prev));
          }}
          disabled={prev ? false : true}
        >
          Prev
        </button>
        <button
          onClick={() => {
            history.push(`/pokemons/?${next ? next.split("?").pop() : ""}`);
            dispatch(getPrevOrNext(next));
          }}
          disabled={next ? false : true}
        >
          Next
        </button>
      </div>
      <div>
        {pokemons.map((pokemon) => (
          <Pokemons key={pokemon.id} data={pokemon} />
        ))}
      </div>
    </>
  );
};

export default Home;
