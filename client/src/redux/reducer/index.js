import { CATCH_EM_ALL, PREV_OR_NEXT } from "../actions";

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

    default:
      return state;
  }
};

export default rootReducer;
