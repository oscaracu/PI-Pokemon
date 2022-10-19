export const CATCH_EM_ALL = "CATCH_EM_ALL";
export const PREV_OR_NEXT = "PREV_OR_NEXT";
export const CLEAR_POKEMONS = "CLEAR_POKEMONS";

export const getAllPokemons =
  (search = "") =>
  (dispatch) => {
    return fetch(`http://localhost:3001/pokemons/${search}`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: CATCH_EM_ALL, payload: data }))
      .catch((error) => console.error(error));
  };

export const getPrevOrNext = (url) => (dispatch) =>
  fetch(url)
    .then((response) => response.json())
    .then((data) => dispatch({ type: PREV_OR_NEXT, payload: data }))
    .catch((error) => console.log(error));

export const clearPokemons = () => (dispatch) =>
  dispatch({ type: CLEAR_POKEMONS });
