import { Route, Switch, useLocation } from "react-router-dom";
// import "./App.css";
import Landing from "./components/Landing/Landing";
import Main from "./components/Main/Main";
import CreatePokemon from "./components/CreatePokemon/CreatePokemon";
import PageNotFound404 from "./components/PageNotFound404/PageNotFound404";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllPokemons, getTypes } from "./redux/actions";

function App() {
  const { search } = useLocation();

  console.log(search);

  ///////////////////////////////////////////////////////////
  // Manejamos las solicitudes inicial a nuestro back-end API
  ///////////////////////////////////////////////////////////

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPokemons(search ? search : ""));
  }, [dispatch, search]);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"}>
          <Landing />
        </Route>
        <Route path={"/pokemon"}>
          <Main />
        </Route>
        <Route path={"/create"}>
          <CreatePokemon />
        </Route>
        <Route path={"/*"}>
          <PageNotFound404 />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
