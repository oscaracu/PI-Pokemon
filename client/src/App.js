import { Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <div className="App">
      <Route exact path={"/"} component={Landing} />
      <Route exact path={"/pokemons"}>
        <Nav />
        <Home />
        <Footer />
      </Route>
    </div>
  );
}

export default App;
