import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../redux/actions";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import TypesCheckBox from "../TypesCheckbox/TypesCheckBox";

const CreatePokemon = (props) => {
  // Creamos en estado para el formulario controlado
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [inputs, setInputs] = useState({ types: [] });
  const dispatch = useDispatch();
  const { types } = useSelector((state) => state);

  useEffect(() => {
    if (types.length === 0) {
      dispatch(getTypes());
    }
  }, [dispatch, types]);

  function handleChange(event) {
    const { name, value } = event.target;
    setErrors(validate({ ...inputs, [name]: value }));
    setInputs((values) => ({ ...values, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(inputs);
    fetch("http://localhost:3001/pokemons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setInputs({});
    setSelectedFile();
    setIsFilePicked(false);

    console.log(inputs);
  }

  function handleImageLoad(event) {
    const formData = new FormData();
    formData.append("img", event.target.files[0]);
    console.log(event.target.files[0]);
    fetch("http://localhost:3001/pokemons/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  }

  return (
    <>
      <Nav />
      <h1>¡Create a Pokemon!</h1>
      <div>
        <img
          src={
            isFilePicked
              ? URL.createObjectURL(selectedFile)
              : "http://localhost:3001/images/default.png"
          }
          alt="Preview"
        />
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
          {/* /// Input de archivo de imagen */}
          <input type="file" name="img" id="img" onChange={handleImageLoad} />
          {/* /// Input de atributos  */}
          <label htmlFor="hp">HP:</label>
          <input
            type="range"
            name="hp"
            id="hp"
            min={1}
            max={255}
            value={inputs.hp || 10}
            onChange={handleChange}
          />
          <span>{inputs.hp ? inputs.hp : 10}</span>
          <label htmlFor="attack">Attack:</label>
          <input
            type="range"
            name="attack"
            id="attack"
            min={1}
            max={255}
            value={inputs.attack || 10}
            onChange={handleChange}
          />
          <span>{inputs.attack ? inputs.attack : 10}</span>
          <label htmlFor="defense">Defense</label>
          <input
            type="range"
            name="defense"
            id="defense"
            min={1}
            max={255}
            value={inputs.defense || 10}
            onChange={handleChange}
          />
          <span>{inputs.defense ? inputs.defense : 10}</span>
          <label htmlFor="speed">Speed</label>
          <input
            type="range"
            name="speed"
            id="speed"
            min={1}
            max={255}
            value={inputs.speed || 10}
            onChange={handleChange}
          />
          <span>{inputs.speed ? inputs.speed : 10}</span>
          <label htmlFor="height">Height</label>
          <input
            type="number"
            name="height"
            id="height"
            min={0}
            max={1000}
            value={inputs.height || ""}
            onChange={handleChange}
          />
          <label htmlFor="weight">Weight</label>
          <input
            type="number"
            name="weight"
            id="weight"
            min={0}
            max={1000}
            value={inputs.weight || ""}
            onChange={handleChange}
          />
          <fieldset>
            <legend>Type(s)</legend>
            {types.length > 0 ? (
              <TypesCheckBox
                types={types}
                setInputs={setInputs}
                setErrors={setErrors}
              />
            ) : (
              <p>Loading...</p>
            )}
          </fieldset>
          {errors.name && <p>{errors.name}</p>}
          {errors.height && <p>{errors.height}</p>}
          {errors.weight && <p>{errors.weight}</p>}
          {errors.types && <p>{errors.types}</p>}
          <button
            disabled={
              !inputs.name ||
              !inputs.height ||
              !inputs.weight ||
              inputs.types.length === 0 ||
              !!Object.keys(errors).length
            }
          >
            Create
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export function validate(inputs) {
  const errors = {};

  if (!inputs.name) {
    errors.name = "Name is required";
  } else if (!/^[a-zA-Z -]+$/.test(inputs.name)) {
    errors.name = "Name must only contain letters without numbers";
  }

  if (!inputs.height) {
    errors.height = "Height is required";
  } else if (inputs.height < 0 || inputs.height > 1000) {
    errors.height = "Height must be greater than 0 and less than 1000";
  }

  if (!inputs.weight) {
    errors.height = "Weight is required";
  } else if (inputs.weight < 0 || inputs.weight > 1000) {
    errors.height = "Weight must be greater than 0 and less than 1000";
  }

  if (inputs.types.length === 0) {
    errors.types = "You must choose at least one type of pokemon";
  }

  return errors;
}

export default CreatePokemon;

// name === "name" && !/^[a-zA-Z \-]+$/.test(value)
// ? setError(true)
// : setError(false);
// name === ("height" || "weight") && (value > 0 || value < 1000)
// ? setError(false)
// : setError(true);
