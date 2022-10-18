import "./App.css";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <div className="App">
      <Landing />
      <Nav />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
