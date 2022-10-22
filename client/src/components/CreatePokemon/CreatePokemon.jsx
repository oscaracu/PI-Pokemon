import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../redux/actions";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import TypesCheckBox from "../TypesCheckbox/TypesCheckBox";

const CreatePokemon = (props) => {
  // Creamos en estado para el formulario controlado
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
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
