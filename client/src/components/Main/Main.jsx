import { Route, Switch, useRouteMatch } from "react-router-dom";
// import { getTypes } from "../../redux/actions";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import Pokemon from "../Pokemon/Pokemon";
import SearchResults from "../SearchResults/SearchResults";
import SearchBar from "../SearchBar/SearchBar";
// import { getAllPokemons, getTypes } from "../../redux/actions";

const Main = (props) => {
  // const { search } = useLocation();

  const { dispatch, useEffect, useSelector } = props;

  let { path } = useRouteMatch();

  // useEffect(() => {
  //   dispatch(getAllPokemons(search ? search : ""));
  //   dispatch(getTypes());
  // }, [dispatch, search]);

  return (
    <>
      <Nav />
      <SearchBar />
      <Switch>
        <Route exact path={path}>
          <SearchResults
            dispatch={dispatch}
            useEffect={useEffect}
            useSelector={useSelector}
          />
        </Route>
        <Route path={`${path}/:id`}>
          <Pokemon />
        </Route>
      </Switch>
      <Footer />
    </>
  );
};

export default Main;
