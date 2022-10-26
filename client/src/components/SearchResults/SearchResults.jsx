import { useState } from "react";
import Pokemons from "../Pokemons/Pokemons";
// import { useSelector } from "react-redux";
import { getAllPokemons, getTypes } from "../../redux/actions";
import { useLocation, useHistory } from "react-router-dom";
// import PageNotFound404 from "../PageNotFound404/PageNotFound404";
import Pagination from "../Pagination/Pagination";
import NotFound from "../NotFound/NotFound";
import Loading from "../Loading/Loading";
import styled from "styled-components";
import { clearPokemon } from "../../redux/actions";

const baseUrl = "https://pi-pokemon-production-cccc.up.railway.app";

const SearchSection = styled.section`
  color: #2c3e50;
  font-family: "Fredoka", sans-serif;
  background-image: url(${baseUrl}/images/front/blue_bg.jpg);

  background-color: #bdc3c7;

  .results {
    background-color: #ecf0f1cc;
    backdrop-filter: grayscale(100%);
    font-family: "Signika", sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .container {
      margin: 3em;
      width: 75%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: center;
      gap: 25px;
      align-items: stretch;
    }
  }

  .filters {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-image: url(${baseUrl}/images/front/blue_bg.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0 5px 10px #34495e;

    .container {
      width: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-color: red;

      .filter {
        font-family: "Fredoka", sans-serif;
        font-weight: 500;
        text-transform: uppercase;
        color: #ecf0f1;
        text-shadow: 1px 1px 3px black, 1px 1px 3px black;
        overflow: hidden;

        .clear {
          min-width: 110px;

          font-family: inherit;
          text-transform: inherit;
          font-weight: inherit;
          color: #ecf0f1;
          background-color: #34495e;
          border: none;
          padding: 10px 15px;
          margin: 12px;
          :hover {
            background-color: #c0392b;
            color: #ecf0f1;
          }
        }

        .dropdown {
          overflow: hidden;
          margin: 12px;
          .dropbtn {
            min-width: 110px;

            font-family: inherit;
            text-transform: inherit;
            font-weight: inherit;
            color: #2c3e50;
            background-color: #ecf0f1;
            border: none;
            padding: 10px 15px;
            margin: 0;
            :hover {
              background-color: #34495e;
              color: #ecf0f1;
            }
          }
        }

        button:hover,
        .dropdown:hover .dropbtn {
          background-color: #34495e;
          color: #ecf0f1;
        }

        .dropdown-content {
          min-width: 110px;
          background-color: #ecf0f1;
          position: absolute;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 1;
          display: none;
          flex-direction: column;
          button {
            font-family: inherit;
            text-transform: inherit;
            font-weight: inherit;
            color: #2c3e50;
            padding: 7px 15px;
            text-align: center;
            border: none;
            outline: none;
            background-color: #ecf0f1;
            :hover {
              background-color: #34495e;
              color: #ecf0f1;
            }
          }
        }

        .dropdown:hover .dropdown-content {
          display: flex;
          flex-direction: column;
        }
      }

      /* .navbar {
  background-color: #333;
} */
    }
  }
`;

const SearchResults = (props) => {
  const { dispatch, useEffect, useSelector } = props;
  const [loading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(null);
  // Obtenemos los querys pasados de la url para armar la paginación y los filtros
  const location = useLocation();
  const history = useHistory();
  const querys = new URLSearchParams(location.search);

  let currentLimit = 12;
  const limitQuery = querys.get("limit");
  if (limitQuery) currentLimit = parseInt(limitQuery);

  let currentPage = null;
  const offsetQuery = querys.get("offset");
  if (!offsetQuery) {
    currentPage = 1;
  } else {
    currentPage = offsetQuery / currentLimit + 1;
  }
  /////////////////////////////////////////
  // Hacemos la solicitud inicial a la API
  ////////////////////////////////////////

  // const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(getAllPokemons(location.search));
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, [dispatch, location]);

  // Nos suscribimos al store para renderear el componente cada vez que tengamos un cambio

  const { pokemons, prev, next, count, types, pokemon } = useSelector(
    (state) => state
  );

  useEffect(() => {
    if (types.length === 0) {
      dispatch(getTypes());
    }
  }, [dispatch, types]);

  useEffect(() => {
    if (Object.keys(pokemon).length > 0) {
      dispatch(clearPokemon());
    }
  }, [dispatch, pokemon]);

  /////////////////////////////////////////////////
  // Declaramos nuestros handlers para cada filtro
  /////////////////////////////////////////////////

  // function handlePrev(event) {
  //   history.push({ search: `?${prev ? prev.split("?").pop() : ""}` });
  // }

  // function handleNext(event) {
  //   history.push({ search: `?${next ? next.split("?").pop() : ""}` });
  // }

  // function handleDesc(event) {
  //   // Version 1
  //   // if (location.search === "")
  //   //   history.push({ search: `${location.search}order=DESC` });
  //   // else if (!location.search.includes("order=DESC"))
  //   //   history.push({ search: `${location.search}&order=DESC` });
  //   // if (location.search.includes("order=ASC"))
  //   //   history.push({
  //   //     search: location.search.replace("order=ASC", "order=DESC"),
  //   //   });

  //   // Version 2
  //   const orderQuery = querys.get("sort");
  //   if (orderQuery) querys.set("sort", "DESC");
  //   else querys.append("sort", "DESC");
  //   history.push({ search: querys.toString() });
  // }

  // function handleAsc(event) {
  //   const orderQuery = querys.get("sort");
  //   if (orderQuery) querys.set("sort", "ASC");
  //   else querys.append("sort", "ASC");
  //   history.push({ search: querys.toString() });
  // }

  function handleOrderBy(value) {
    // VERSION 1
    // if (location.search === "")
    //   history.push({
    //     search: `${location.search}orderBy=${event.target.value}`,
    //   });
    // else if (!location.search.includes(`orderBy=${event.target.value}`))
    //   history.push({
    //     search: `${location.search}&orderBy=${event.target.value}`,
    //   });
    // if (
    //   location.search.includes("orderBy=name") &&
    //   event.target.name !== "name"
    // )
    //   history.push({
    //     search: location.search.replace(
    //       "orderBy=name",
    //       `orderBy=${event.target.value}`
    //     ),
    //   });
    // else if (
    //   location.search.includes("orderBy=attack") &&
    //   event.target.name !== "attack"
    // )
    //   history.push({
    //     search: location.search.replace(
    //       "orderBy=attack",
    //       `orderBy=${event.target.value}`
    //     ),
    //   });
    // else if (
    //   location.search.includes("orderBy=id") &&
    //   event.target.name !== "id"
    // )
    //   history.push({
    //     search: location.search.replace(
    //       "orderBy=id",
    //       `orderBy=${event.target.value}`
    //     ),
    //   });

    // VERSION 2
    const orderByQuery = querys.get("orderBy");
    if (orderByQuery) querys.set("orderBy", value);
    else querys.append("orderBy", value);
    history.push({ search: querys.toString() });
  }

  function handleTypeFilter(value) {
    const typeQuery = querys.get("type");
    if (value === "all" && typeQuery) querys.delete("type");
    else if (typeQuery) {
      querys.set("type", value);
      querys.set("offset", 0);
    } else {
      querys.append("type", value);
      querys.set("offset", 0);
    }
    history.push({ search: querys.toString() });
  }

  function handleShow(value) {
    const typeQuery = querys.get("show");
    if (typeQuery) querys.set("show", value);
    else querys.append("show", value);
    history.push({ search: querys.toString() });
  }

  function handleSort(value) {
    const typeQuery = querys.get("sort");
    if (typeQuery) querys.set("sort", value);
    else querys.append("sort", value);
    history.push({ search: querys.toString() });
  }

  function handleReset() {
    history.push({ search: "" });
  }

  ////////////////////////////////////////////////////////
  //
  //  1.- Agregar un render condicional cuando count sea 0 que muestre el mensaje: No se encontraron pokemons
  //  2.- Agregar una pantalla de loading mientras pokemons.length sea 0

  if (loading) return <Loading />;

  try {
    return (
      <>
        <SearchSection>
          <div className="filters">
            <div className="container">
              {/* Selector para ordenamiendo por id, nombre o ataque */}
              {/* <div className="filter">
                <label htmlFor="orderby">Order by: </label>
                <select
                  value={querys.get("orderBy") ? querys.get("orderBy") : "id"}
                  onChange={handleOrderBy}
                  name="orderby"
                  id="orderby"
                  disabled={querys.has("name") ? true : false}
                >
                  <option value="id">Number</option>
                  <option value="name">Name</option>
                  <option value="attack">Attack</option>
                </select>
              </div> */}

              {/* // VERSION 2 */}

              <div className="filter">
                <div className="dropdown">
                  <button className="dropbtn">
                    Order by
                    <span> ▼ </span>
                  </button>
                  <div className="dropdown-content">
                    <button onClick={() => handleOrderBy("id")}>Number</button>
                    <button onClick={() => handleOrderBy("name")}>Name</button>
                    <button onClick={() => handleOrderBy("attack")}>
                      Attack
                    </button>
                  </div>
                </div>
              </div>

              {/* /// Botones de ordenamiento ascendente / descendente */}

              {/* <div className="filter">
                <label htmlFor="sort">Sort: </label>
                <select
                  value={querys.get("sort") ? querys.get("sort") : "ASC"}
                  onChange={handleSort}
                  name="sort"
                  id="sort"
                  disabled={querys.has("name") ? true : false}
                >
                  <option value="ASC">Asc</option>
                  <option value="DESC">Desc</option>
                </select>
              </div> */}

              {/* // VERSION 3 */}

              <div className="filter">
                <div className="dropdown">
                  <button className="dropbtn">
                    Sort
                    <span> ▼ </span>
                  </button>
                  <div className="dropdown-content">
                    <button onClick={() => handleSort("ASC")}>Asc</button>
                    <button onClick={() => handleSort("DESC")}>Desc</button>
                  </div>
                </div>
              </div>

              {/* <div>
              <p>
                Sort:{" "}
                <button
                  onClick={handleAsc}
                  disabled={querys.has("name") ? true : false}
                >
                  Asc
                </button>{" "}
                |{" "}
                <button
                  onClick={handleDesc}
                  disabled={querys.has("name") ? true : false}
                >
                  Desc
                </button>
              </p>
            </div> */}
              {/* Selector para filtrado por tipo de pokemon */}
              {/* <div className="filter">
                <label htmlFor="types">Filter by type: </label>
                <select
                  value={querys.get("type") ? querys.get("type") : "all"}
                  onChange={handleTypeFilter}
                  name="types"
                  id="types"
                  disabled={querys.has("name") ? true : false}
                >
                  <option value="all">All</option>
                  {types.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div> */}

              {/* VERSION 2 */}

              <div className="filter">
                <div className="dropdown">
                  <button className="dropbtn">
                    Type
                    <span> ▼ </span>
                  </button>
                  <div className="dropdown-content">
                    <button onClick={() => handleTypeFilter("all")}>All</button>

                    {types.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => handleTypeFilter(type.id)}
                      >
                        {type.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mostrar por origen, obtenido desde la API (originales) o desde la base de datos (nuevos) */}
              {/* <div className="filter">
                <label htmlFor="show">Show: </label>
                <select
                  defaultValue={querys.get("show") ? querys.get("show") : "all"}
                  onChange={handleShow}
                  name="show"
                  id="show"
                  disabled={querys.has("name") ? true : false}
                >
                  <option value="all">All</option>
                  <option value="originals">Originals</option>
                  <option value="new">New</option>
                </select>
              </div> */}

              <div className="filter">
                <div className="dropdown">
                  <button className="dropbtn">
                    Show
                    <span> ▼ </span>
                  </button>
                  <div className="dropdown-content">
                    <button onClick={() => handleShow("all")}>All</button>
                    <button onClick={() => handleShow("originals")}>
                      Originals
                    </button>
                    <button onClick={() => handleShow("new")}>New</button>
                  </div>
                </div>
              </div>

              <div className="filter">
                <button onClick={handleReset} className="clear">
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* // VERSION 2 */}

          {/* Opciones de paginación */}
          {/* <div>
          <button onClick={handlePrev} disabled={prev ? false : true}>
          Prev
          </button>
          <button onClick={handleNext} disabled={next ? false : true}>
          Next
          </button>
        </div> */}
          {/* Render de resultados de busqueda */}

          <section className="results">
            {count === 0 ? (
              <NotFound message="No pokemon found!" />
            ) : (
              <div className="container">
                {pokemons.map((pokemon) => (
                  <Pokemons key={pokemon.id} data={pokemon} />
                ))}

                <Pagination
                  totalRecords={count}
                  pageLimit={currentLimit}
                  pageNeighbours={2}
                  currentPage={currentPage}
                  prev={prev}
                  next={next}
                  history={history}
                  querys={querys}
                />
              </div>
            )}
          </section>
        </SearchSection>
      </>
    );
  } catch (error) {
    return <NotFound message={error.message} />;
  }
};

export default SearchResults;
