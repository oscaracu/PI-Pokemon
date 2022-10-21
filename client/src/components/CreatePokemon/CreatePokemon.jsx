import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../redux/actions";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import TypesCheckBox from "../TypesCheckbox/TypesCheckBox";

const CreatePokemon = (props) => {
  // Creamos en estado para el formulario controlado
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const { types } = useSelector((state) => state);

  useEffect(() => {
    if (types.length === 0) {
      dispatch(getTypes());
    }
  }, [dispatch, types]);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(inputs);
  }

  return (
    <>
      <Nav />
      <h1>¡Create a Pokemon!</h1>
      <div>
        <img src="http://localhost:3001/images/default.png" alt="Default" />
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={inputs.name || ""}
            onChange={handleChange}
          />
          <label htmlFor="hp">HP:</label>
          <input
            type="number"
            name="hp"
            id="hp"
            value={inputs.hp || ""}
            onChange={handleChange}
          />
          <label htmlFor="attack">Attack:</label>
          <input
            type="number"
            name="attack"
            id="attack"
            value={inputs.attack || ""}
            onChange={handleChange}
          />
          <label htmlFor="defense">Defense</label>
          <input
            type="number"
            name="defense"
            id="defense"
            value={inputs.defense || ""}
            onChange={handleChange}
          />
          <label htmlFor="speed">Speed</label>
          <input
            type="number"
            name="speed"
            id="speed"
            value={inputs.speed || ""}
            onChange={handleChange}
          />
          <label htmlFor="height">Height</label>
          <input
            type="number"
            name="height"
            id="height"
            value={inputs.height || ""}
            onChange={handleChange}
          />
          <label htmlFor="weight">Weight</label>
          <input
            type="number"
            name="weight"
            id="weight"
            value={inputs.weight || ""}
            onChange={handleChange}
          />
          <fieldset>
            <legend>Type(s)</legend>
            {types.length > 0 ? (
              <TypesCheckBox types={types} setInputs={setInputs} />
            ) : (
              <p>Loading...</p>
            )}
          </fieldset>
          <button>Create</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreatePokemon;
