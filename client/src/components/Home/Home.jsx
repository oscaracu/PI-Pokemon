import { useEffect, useState } from "react";
import Pokemons from "../Pokemons/Pokemons";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPokemons,
  getAllPokemons,
  getPrevOrNext,
} from "../../redux/actions";
import { useLocation, useHistory, Link } from "react-router-dom";
import PageNotFound404 from "../PageNotFound404/PageNotFound404";

const Home = (props) => {
  // Obtenemos los querys pasados por url para armar la paginación
  const location = useLocation();
  const history = useHistory();

  // Hacemos la solicitud inicial a la API
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPokemons(location.search));
  }, [location, dispatch]);

  // Nos suscribimos al store para renderear el componente cada vez que tengamos un cambio
  const pokemons = useSelector((state) => state.pokemons);
  const prev = useSelector((state) => state.prev);
  const next = useSelector((state) => state.next);
  const count = useSelector((state) => state.count);

  function handlePrev(event) {
    history.push({ search: `?${prev ? prev.split("?").pop() : ""}` });
  }

  function handleNext(event) {
    history.push({ search: `?${next ? next.split("?").pop() : ""}` });
  }

  function handleDesc(event) {
    const currentSearch = location.search;
    if (currentSearch === "")
      history.push({ search: `${location.search}order=DESC` });
    else if (!currentSearch.includes("order=DESC"))
      history.push({ search: `${location.search}&order=DESC` });
    if (currentSearch.includes("order=ASC"))
      history.push({
        search: currentSearch.replace("order=ASC", "order=DESC"),
      });
  }

  function handleAsc(event) {
    const currentSearch = location.search;
    if (currentSearch === "")
      history.push({ search: `${location.search}order=ASC` });
    else if (!currentSearch.includes("order=ASC"))
      history.push({ search: `${location.search}&order=ASC` });
    if (currentSearch.includes("order=DESC"))
      history.push({
        search: currentSearch.replace("order=DESC", "order=ASC"),
      });
  }

  function handleOrderBy(event) {
    const currentSearch = location.search;
    if (currentSearch === "")
      history.push({
        search: `${location.search}orderBy=${event.target.value}`,
      });
    else if (!currentSearch.includes(`orderBy=${event.target.value}`))
      history.push({
        search: `${location.search}&orderBy=${event.target.value}`,
      });
    if (currentSearch.includes("orderBy=name") && event.target.name !== "name")
      history.push({
        search: currentSearch.replace(
          "orderBy=name",
          `orderBy=${event.target.value}`
        ),
      });
    else if (
      currentSearch.includes("orderBy=attack") &&
      event.target.name !== "attack"
    )
      history.push({
        search: currentSearch.replace(
          "orderBy=attack",
          `orderBy=${event.target.value}`
        ),
      });
    else if (currentSearch.includes("orderBy=id") && event.target.name !== "id")
      history.push({
        search: currentSearch.replace(
          "orderBy=id",
          `orderBy=${event.target.value}`
        ),
      });
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
