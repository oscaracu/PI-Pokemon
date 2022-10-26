export const CATCH_EM_ALL = "CATCH_EM_ALL";
// export const PREV_OR_NEXT = "PREV_OR_NEXT";
export const CLEAR_POKEMON = "CLEAR_POKEMON";
export const GET_TYPES = "GET_TYPES";
export const GET_POKEMON = "GET_POKEMON";
export const CLEAR_POKEMONS = "CLEAR_POKEMONS";

const baseUrl = "https://pi-pokemon-production-cccc.up.railway.app";
// const baseUrl = "http://localhost:3001";

export const getAllPokemons =
  (search = "") =>
  (dispatch) => {
    return fetch(`${baseUrl}/pokemons/${search}`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: CATCH_EM_ALL, payload: data }))
      .catch((error) => console.error(error));
  };

export const getTypes = () => (dispatch) => {
  return fetch(`${baseUrl}/types`)
    .then((response) => response.json())
    .then((data) => dispatch({ type: GET_TYPES, payload: data }))
    .catch((error) => console.log(error));
};

export const getPokemon = (id) => (dispatch) => {
  return fetch(`${baseUrl}/pokemons/${id}`)
    .then((response) => response.json())
    .then((data) => dispatch({ type: GET_POKEMON, payload: data }))
    .catch((error) => console.log(error));
};

export const clearPokemon = () => (dispatch) =>
  dispatch({ type: CLEAR_POKEMON });

export const clearPokemons = () => (dispatch) =>
  dispatch({ type: CLEAR_POKEMONS });

// Candidatos a ser eliminados

// export const getPrevOrNext = (url) => (dispatch) =>
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => dispatch({ type: PREV_OR_NEXT, payload: data }))
//     .catch((error) => console.log(error));
