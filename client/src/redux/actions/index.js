export const CATCH_EM_ALL = "CATCH_EM_ALL";
export const PREV_OR_NEXT = "PREV_OR_NEXT";

export const getAllPokemons =
  (orderBy = "", order = "", type = "", source = "", offset = "", limit = "") =>
  (dispatch) => {
    return fetch(
      `http://localhost:3001/pokemons/?offset=${offset}&limit=${limit}&orderBy=${orderBy}&order=${order}&type=${type}&source=${source}`
    )
      .then((response) => response.json())
      .then((data) => dispatch({ type: CATCH_EM_ALL, payload: data }))
      .catch((error) => console.error(error));
  };

export const getPrevOrNext = (url) => (dispatch) =>
  fetch(url)
    .then((response) => response.json())
    .then((data) => dispatch({ type: PREV_OR_NEXT, payload: data }))
    .catch((error) => console.log(error));