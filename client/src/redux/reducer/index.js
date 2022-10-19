import { CATCH_EM_ALL, CLEAR_POKEMONS, PREV_OR_NEXT } from "../actions";

const initialState = {
  pokemons: [],
  prev: null,
  next: null,
  pokemon: {},
  count: 0,
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
    case PREV_OR_NEXT:
      return {
        ...state,
        pokemons: action.payload.results,
        prev: action.payload.previous,
        next: action.payload.next,
        count: action.payload.count,
      };

    case CLEAR_POKEMONS:
      return {
        ...state,
        pokemons: null,
      };

    default:
      return state;
  }
};

export default rootReducer;
