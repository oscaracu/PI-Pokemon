import { Route, Switch, useRouteMatch } from "react-router-dom";
import { getTypes } from "../../redux/actions";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import Pokemon from "../Pokemon/Pokemon";
import SearchResults from "../SearchResults/SearchResults";

const Main = (props) => {
  const { dispatch, useEffect } = props;

  let { path } = useRouteMatch();
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <>
      <Nav />
      <Switch>
        <Route exact path={path}>
          <SearchResults />
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
