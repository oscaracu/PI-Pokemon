import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getTypes } from "../../redux/actions";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import TypesCheckBox from "../TypesCheckbox/TypesCheckBox";
import styled from "styled-components";

const CreateSection = styled.section`
  box-sizing: border-box;
  color: #34495e;
  font-family: "Fredoka", sans-serif;
  background-image: url("http://localhost:3001/images/front/blue_bg.jpg");

  /* div {
    border: 1px solid black;
  } */

  .container {
    background-color: #ecf0f1cc;
    backdrop-filter: grayscale(60%);
    font-family: "Secular One", sans-serif;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .title {
    width: 100%;
    min-height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("http://localhost:3001/images/front/blue_bg.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0 5px 10px #bdc3c7;
    color: #ecf0f1;
    font-size: 1.4em;
    text-shadow: 1px 1px 3px black, 1px 1px 3px black;

    h1 {
      margin: 5px;
    }
  }

  form {
    max-width: 1000px;
    width: 75%;
    margin: 3em;
    display: flex;
  }

  .content {
    padding: 40px;
    font-family: "Secular One", sans-serif;
    text-transform: uppercase;
    background-color: #ecf0f1;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    gap: 25px;

    .img-load {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-items: center;
      align-content: center;

      /**********File Inputs**********/
      .container-input {
        text-align: center;
        width: 50%;
        margin: 0 auto;
      }

      .inputfile {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
      }

      .inputfile + label {
        max-width: 80%;
        font-size: 1.25rem;
        font-weight: 700;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        display: inline-block;
        overflow: hidden;
        padding: 0.625rem 1.25rem;
      }

      .inputfile + label svg {
        width: 1em;
        height: 1em;
        vertical-align: middle;
        fill: currentColor;
        margin-top: -0.25em;
        margin-right: 0.25em;
      }

      .iborrainputfile {
        font-size: 16px;
        font-weight: normal;
        font-family: "Lato";
      }

      /* style 1 */

      .inputfile-1 + label {
        color: #fff;
        background-color: #7f8c8d;
      }

      .inputfile-1:focus + label,
      .inputfile-1.has-focus + label,
      .inputfile-1 + label:hover {
        background-color: #34495e;
      }

      img {
        width: 100%;
      }
    }

    .form {
      width: 50%;
      font-size: 1em;

      .submit {
        text-align: center;
        button {
          font-family: "Signika", sans-serif;
          font-size: 1.5em;
          color: #ecf0f1;
          text-shadow: 1px 1px 3px black;

          border: none;
          background-color: #34495e;
          padding: 10px 20px;

          :hover {
            background-color: #2980b9;
          }

          :disabled {
            background-color: #c0392b;
          }
        }
      }

      .validation {
        font-family: "Fredoka", sans-serif;
        text-align: center;
        font-size: 0.7em;
        color: #e74c3c;
        font-weight: 600;
      }

      fieldset {
        margin-top: 10px;
        margin-bottom: 15px;
        text-align: center;

        ul {
          text-align: left;
          font-family: "Signika", sans-serif;
          font-size: 0.8em;
          font-weight: 600;
          list-style-type: none;
          padding: 0;
          margin: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 5px;

          li {
            width: 23%;
          }
        }
      }

      .name,
      .stats,
      .measures,
      .group {
        margin-top: 0.5em;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .measures {
        gap: 20px;
      }

      .name,
      .stats {
        .label {
          width: 25%;
          text-align: left;
          padding: 5px;
        }

        .input {
          width: 75%;
        }

        input {
          width: 92%;
          font-size: inherit;
          color: #34495e;
          font-family: "Fredoka", sans-serif;
          padding: 5px 10px;
        }
      }

      .stats {
        .value {
          width: 10%;
          text-align: right;
          padding: 5px;
        }
        .range {
          width: 65%;
        }
      }

      .group {
        width: 50%;
        .label,
        .input {
          width: 50%;
          text-align: left;
          padding: 5px;
        }
        input {
          width: 80%;
          font-size: inherit;
          font-size: inherit;
          color: #34495e;
          padding: 5px 10px;
        }
      }
    }
  }
`;

const CreatePokemon = (props) => {
  const { dispatch, useEffect, useSelector } = props;

  const history = useHistory();
  // Creamos en estado para el formulario controlado
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [inputs, setInputs] = useState({ types: [] });
  // const dispatch = useDispatch();
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
        history.push(`/pokemon/${data.id}`);
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
      <CreateSection>
        <div className="container">
          <div className="title">
            <h1>¡Create a Pokemon!</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="content">
              <div className="img-load">
                <img
                  src={
                    isFilePicked
                      ? URL.createObjectURL(selectedFile)
                      : "http://localhost:3001/images/default.png"
                  }
                  alt="Preview"
                />
                {/* /// Input de archivo de imagen */}
                {/* <!--ESTILO 1--> */}
                <div class="container-input">
                  <input
                    className="inputfile inputfile-1"
                    type="file"
                    name="img"
                    id="img"
                    onChange={handleImageLoad}
                  />

                  <label for="img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="iborrainputfile"
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                    >
                      <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
                    </svg>
                    <span class="iborrainputfile">Select Image</span>
                  </label>
                </div>
              </div>
              <div className="form">
                <div className="name">
                  <div className="label">
                    <label htmlFor="name">Name:</label>
                  </div>
                  <div className="input">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={inputs.name || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {/* /// Input de atributos  */}
                <div className="stats">
                  <div className="label">
                    <label htmlFor="hp">HP:</label>
                  </div>
                  <div className="range">
                    <input
                      type="range"
                      name="hp"
                      id="hp"
                      min={1}
                      max={255}
                      value={inputs.hp || 10}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="value">
                    <span>{inputs.hp ? inputs.hp : 10}</span>
                  </div>
                </div>
                <div className="stats">
                  <div className="label">
                    <label htmlFor="attack">Attack:</label>
                  </div>
                  <div className="range">
                    <input
                      type="range"
                      name="attack"
                      id="attack"
                      min={1}
                      max={255}
                      value={inputs.attack || 10}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="value">
                    <span>{inputs.attack ? inputs.attack : 10}</span>
                  </div>
                </div>

                <div className="stats">
                  <div className="label">
                    <label htmlFor="defense">Defense:</label>
                  </div>
                  <div className="range">
                    <input
                      type="range"
                      name="defense"
                      id="defense"
                      min={1}
                      max={255}
                      value={inputs.defense || 10}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="value">
                    <span>{inputs.defense ? inputs.defense : 10}</span>
                  </div>
                </div>

                <div className="stats">
                  <div className="label">
                    <label htmlFor="speed">Speed:</label>
                  </div>
                  <div className="range">
                    <input
                      type="range"
                      name="speed"
                      id="speed"
                      min={1}
                      max={255}
                      value={inputs.speed || 10}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="value">
                    <span>{inputs.speed ? inputs.speed : 10}</span>
                  </div>
                </div>

                <div className="measures">
                  <div className="group">
                    <div className="label">
                      <label htmlFor="weight">Weight:</label>
                    </div>
                    <div className="input">
                      <input
                        type="number"
                        name="weight"
                        id="weight"
                        min={0}
                        max={1000}
                        value={inputs.weight || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="group">
                    <div className="label">
                      <label htmlFor="height">Height:</label>
                    </div>
                    <div className="input">
                      <input
                        type="number"
                        name="height"
                        id="height"
                        min={0}
                        max={1000}
                        value={inputs.height || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <fieldset className="types">
                  <legend>Pokemon Type(s)</legend>
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
                <div className="validation">
                  {errors.name && <p>{errors.name}</p>}
                  {errors.height && <p>{errors.height}</p>}
                  {errors.weight && <p>{errors.weight}</p>}
                  {errors.types && <p>{errors.types}</p>}
                </div>
                <div className="submit">
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
                </div>
              </div>
            </div>
          </form>
        </div>
      </CreateSection>

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
