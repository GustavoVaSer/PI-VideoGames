import { FETCH_VIDEOGAMES_SUCCESS } from "./action";

const initialState = { videoGames: [], post: [] };

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        videoGames: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
