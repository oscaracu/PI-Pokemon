import { Route, Switch } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing/Landing";
import Main from "./components/Main/Main";
import CreatePokemon from "./components/CreatePokemon/CreatePokemon";
import PageNotFound404 from "./components/PageNotFound404/PageNotFound404";

function App() {
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
