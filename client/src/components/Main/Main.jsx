import { Route, Switch, useRouteMatch } from "react-router-dom";
import { getTypes } from "../../redux/actions";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import Pokemon from "../Pokemon/Pokemon";
import SearchResults from "../SearchResults/SearchResults";
import SearchBar from "../SearchBar/SearchBar";

const Main = (props) => {
  const { dispatch, useEffect } = props;

  let { path } = useRouteMatch();
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <>
      <Nav />
      <SearchBar />
      <Switch>
        <Route exact path={path}>
          <SearchResults dispatch={dispatch} />
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
