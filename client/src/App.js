import { Route, Switch } from "react-router-dom";
// import "./App.css";
import Landing from "./components/Landing/Landing";
import Main from "./components/Main/Main";
import CreatePokemon from "./components/CreatePokemon/CreatePokemon";
import PageNotFound404 from "./components/PageNotFound404/PageNotFound404";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { getAllPokemons, getTypes } from "./redux/actions";
import Loading from "./components/Loading/Loading";

function App() {
  // const { search } = useLocation();

  ///////////////////////////////////////////////////////////
  // Manejamos las solicitudes inicial a nuestro back-end API
  ///////////////////////////////////////////////////////////

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllPokemons(search ? search : ""));
  //   dispatch(getTypes());
  // }, [dispatch, search]);

  // const { count } = useSelector((state) => state);

  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"}>
          <Landing
            count={905}
            dispatch={dispatch}
            useEffect={useEffect}
            useSelector={useSelector}
          />
        </Route>
        <Route path={"/pokemon"}>
          <Main
            dispatch={dispatch}
            useEffect={useEffect}
            useSelector={useSelector}
          />
        </Route>
        <Route path={"/create"}>
          <CreatePokemon
            dispatch={dispatch}
            useEffect={useEffect}
            useSelector={useSelector}
          />
        </Route>
        <Route path={"/loading"} component={Loading} />
        <Route path={"/*"}>
          <PageNotFound404 />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
