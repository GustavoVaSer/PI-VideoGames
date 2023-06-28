import {
  FETCH_VIDEOGAMES_SUCCESS,
  FETCH_VIDEOGAMES_FAILURE,
  SET_GENRE_FILTER,
  SET_ORIGIN_FILTER,
  SET_CURRENT_PAGE,
  SORT_VIDEO_GAMES,
} from "./action";

const initialState = { videoGames: [], post: [] };

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_VIDEOGAMES_SUCCESS:
      return {
        ...state,
        videoGames: action.payload,
      };
    case FETCH_VIDEOGAMES_FAILURE:
      // Handle the failure case if needed
      return state;
    case SET_GENRE_FILTER:
      // Handle setting the genre filter
      return state;
    case SET_ORIGIN_FILTER:
      // Handle setting the origin filter
      return state;
    case SET_CURRENT_PAGE:
      // Handle setting the current page
      return state;
    case SORT_VIDEO_GAMES:
      // Handle sorting the video games
      return state;
    default:
      return state;
  }
}

export default rootReducer;
