import { useEffect } from "react";
import Pokemons from "../Pokemons/Pokemons";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getPrevOrNext } from "../../redux/actions";

const Home = (props) => {
  const pokemons = useSelector((state) => state.pokemons);
  const prev = useSelector((state) => state.prev);
  const next = useSelector((state) => state.next);
  const dispatch = useDispatch();
  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(getAllPokemons());
    }
  }, [pokemons, dispatch]);

  return (
    <>
      <div>
        <button
          onClick={() => dispatch(getPrevOrNext(prev))}
          disabled={prev ? false : true}
        >
          Prev
        </button>
        <button
          onClick={() => dispatch(getPrevOrNext(next))}
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
