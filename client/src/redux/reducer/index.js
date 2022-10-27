import {
  CATCH_EM_ALL,
  GET_POKEMON,
  CLEAR_POKEMON,
  CLEAR_POKEMONS,
  GET_TYPES,
  SET_LAST_SEARCH,
  // PREV_OR_NEXT,
} from "../actions";

const initialState = {
  pokemons: [],
  prev: null,
  next: null,
  pokemon: {},
  count: null,
  types: [],
  lastSearch: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATCH_EM_ALL:
      return {
        ...state,
        pokemons: action.payload.results,
        prev: action.payload.previous,
        next: action.payload.next,
        count: action.payload.count,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case GET_POKEMON:
      return {
        ...state,
        pokemon: action.payload,
      };
    case CLEAR_POKEMON:
      return {
        ...state,
        pokemon: {},
      };

    case CLEAR_POKEMONS:
      return {
        ...state,
        pokemons: {},
      };

    case SET_LAST_SEARCH:
      return {
        ...state,
        lastSearch: action.payload,
      };

    // case PREV_OR_NEXT:
    //   return {
    //     ...state,
    //     pokemons: action.payload.results,
    //     prev: action.payload.previous,
    //     next: action.payload.next,
    //     count: action.payload.count,
    //   };

    default:
      return state;
  }
};

export default rootReducer;
