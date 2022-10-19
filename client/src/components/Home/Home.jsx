import { useEffect, useState } from "react";
import Pokemons from "../Pokemons/Pokemons";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getTypes } from "../../redux/actions";
import { useLocation, useHistory } from "react-router-dom";
import PageNotFound404 from "../PageNotFound404/PageNotFound404";

const Home = (props) => {
  // Obtenemos los querys pasados de la url para armar la paginación y los filtros
  const location = useLocation();
  const history = useHistory();
  const querys = new URLSearchParams(location.search);

  // Hacemos la solicitud inicial a la API
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPokemons(location.search));
    dispatch(getTypes());
  }, [location, dispatch]);

  // Nos suscribimos al store para renderear el componente cada vez que tengamos un cambio

  const { pokemons, prev, next, count, types } = useSelector((state) => state);

  // Declaramos nuestros handlers para cada filtro

  function handlePrev(event) {
    history.push({ search: `?${prev ? prev.split("?").pop() : ""}` });
  }

  function handleNext(event) {
    history.push({ search: `?${next ? next.split("?").pop() : ""}` });
  }

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
    const orderQuery = querys.get("order");
    if (orderQuery) querys.set("order", "DESC");
    else querys.append("order", "DESC");
    history.push({ search: querys.toString() });
  }

  function handleAsc(event) {
    const orderQuery = querys.get("order");
    if (orderQuery) querys.set("order", "ASC");
    else querys.append("order", "ASC");
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
    if (typeQuery) querys.set("type", event.target.value);
    else querys.append("type", event.target.value);
    history.push({ search: querys.toString() });
  }

  try {
    return (
      <>
        <div>
          <p>
            Order: <button onClick={handleAsc}>Asc</button> |{" "}
            <button onClick={handleDesc}>Desc</button>
          </p>
        </div>

        <div>
          <label htmlFor="types">Filter by Pokemon type: </label>
          <select onChange={handleTypeFilter} name="types" id="types">
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="orderby">Order by: </label>
          <select onChange={handleOrderBy} name="orderby" id="orderby">
            <option value="id">Number</option>
            <option value="name">Name</option>
            <option value="attack">Attack</option>
          </select>
        </div>

        <hr />
        <div>
          <button onClick={handlePrev} disabled={prev ? false : true}>
            Prev
          </button>
          <button onClick={handleNext} disabled={next ? false : true}>
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
  } catch (error) {
    return <PageNotFound404 />;
  }
};

export default Home;
