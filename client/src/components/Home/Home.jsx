import { useEffect, useState } from "react";
import Pokemons from "../Pokemons/Pokemons";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getTypes } from "../../redux/actions";
import { useLocation, useHistory } from "react-router-dom";
import PageNotFound404 from "../PageNotFound404/PageNotFound404";
import Pagination from "../Pagination/Pagination";
import NotFound from "../NotFound/NotFound";
import Loading from "../Loading/Loading";

const Home = (props) => {
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

  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(getAllPokemons(location.search));
    dispatch(getTypes());
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, [location, dispatch]);

  // Nos suscribimos al store para renderear el componente cada vez que tengamos un cambio

  const { pokemons, prev, next, count, types } = useSelector((state) => state);

  /////////////////////////////////////////////////
  // Declaramos nuestros handlers para cada filtro
  /////////////////////////////////////////////////

  // function handlePrev(event) {
  //   history.push({ search: `?${prev ? prev.split("?").pop() : ""}` });
  // }

  // function handleNext(event) {
  //   history.push({ search: `?${next ? next.split("?").pop() : ""}` });
  // }

  function handleDesc(event) {
    // Version 1
    // if (location.search === "")
    //   history.push({ search: `${location.search}order=DESC` });
    // else if (!location.search.includes("order=DESC"))
    //   history.push({ search: `${location.search}&order=DESC` });
    // if (location.search.includes("order=ASC"))
    //   history.push({
    //     search: location.search.replace("order=ASC", "order=DESC"),
    //   });

    // Version 2
    const orderQuery = querys.get("sort");
    if (orderQuery) querys.set("sort", "DESC");
    else querys.append("sort", "DESC");
    history.push({ search: querys.toString() });
  }

  function handleAsc(event) {
    const orderQuery = querys.get("sort");
    if (orderQuery) querys.set("sort", "ASC");
    else querys.append("sort", "ASC");
    history.push({ search: querys.toString() });
  }

  function handleOrderBy(event) {
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
    if (orderByQuery) querys.set("orderBy", event.target.value);
    else querys.append("orderBy", event.target.value);
    history.push({ search: querys.toString() });
  }

  function handleTypeFilter(event) {
    const typeQuery = querys.get("type");
    if (event.target.value === "all" && typeQuery) querys.delete("type");
    else if (typeQuery) querys.set("type", event.target.value);
    else querys.append("type", event.target.value);
    history.push({ search: querys.toString() });
  }

  function handleShow(event) {
    const typeQuery = querys.get("show");
    if (typeQuery) querys.set("show", event.target.value);
    else querys.append("show", event.target.value);
    history.push({ search: querys.toString() });
  }

  ////////////////////////////////////////////////////////
  //
  //  1.- Agregar un render condicional cuando count sea 0 que muestre el mensaje: No se encontraron pokemons
  //  2.- Agregar una pantalla de loading mientras pokemons.length sea 0

  if (loading) return <Loading />;

  try {
    return (
      <>
        {/* Selector para ordenamiendo por id, nombre o ataque */}
        <div>
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
        </div>

        {/* /// Botones de ordenamiento ascendente / descendente */}
        <div>
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
        </div>
        {/* Selector para filtrado por tipo de pokemon */}
        <div>
          <label htmlFor="types">Filter by Pokemon type: </label>
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
        </div>
        {/* Mostrar por origen, obtenido desde la API (originales) o desde la base de datos (nuevos) */}
        <div>
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
        </div>

        <hr />
        {/* Opciones de paginación */}
        {/* <div>
          <button onClick={handlePrev} disabled={prev ? false : true}>
            Prev
          </button>
          <button onClick={handleNext} disabled={next ? false : true}>
            Next
          </button>
        </div> */}
        <div>
          <Pagination
            totalRecords={count}
            pageLimit={currentLimit}
            pageNeighbours={1}
            currentPage={currentPage}
            prev={prev}
            next={next}
            history={history}
            querys={querys}
          />
        </div>
        {/* Render de resultados de busqueda */}

        <div>
          {count === 0 ? (
            <NotFound />
          ) : (
            <>
              {pokemons.map((pokemon) => (
                <Pokemons key={pokemon.id} data={pokemon} />
              ))}
            </>
          )}
        </div>
      </>
    );
  } catch (error) {
    return <PageNotFound404 />;
  }
};

export default Home;
