import { Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import Nav from "./components/Nav/Nav";
import PageNotFound404 from "./components/PageNotFound404/PageNotFound404";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"} component={Landing} />
        <Route exact path={"/pokemons"}>
          <Nav />
          <Home />
          <Footer />
        </Route>
        <Route path={"*"}>
          <Nav />
          <PageNotFound404 />
          <Footer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
