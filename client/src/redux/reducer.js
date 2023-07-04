import {
  FETCH_VIDEOGAMES_SUCCESS,
  FETCH_VIDEOGAMES_FAILURE,
  SET_GENRE_FILTER,
  SET_ORIGIN_FILTER,
  SET_CURRENT_PAGE,
  SORT_VIDEO_GAMES,
  SET_SEARCH_TERM,
  CREATE_VIDEO_GAME_SUCCESS,
  CREATE_VIDEO_GAME_FAILURE,
  FETCH_VIDEOGAME_GENRE,
  FETCH_GENRES,
} from "./action";

const initialState = {
  videoGames: [],
  post: [],
  genreFilter: "",
  originFilter: "",
  currentPage: 1,
  searchTerm: "",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_VIDEOGAMES_SUCCESS:
      return {
        ...state,
        videoGames: action.payload,
      };
    case FETCH_VIDEOGAMES_FAILURE:
      return state;
    case SET_GENRE_FILTER:
      return {
        ...state,
        genreFilter: action.payload,
      };
    case SET_ORIGIN_FILTER:
      return {
        ...state,
        originFilter: action.payload,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SORT_VIDEO_GAMES:
      return {
        ...state,
        videoGames: action.payload,
      };
    case SET_SEARCH_TERM:
      return {
        ...state,
        videoGames: action.payload,
      };
    case CREATE_VIDEO_GAME_SUCCESS:
      return {
        ...state,
        videoGames: [...state.videoGames, action.payload],
      };
    case CREATE_VIDEO_GAME_FAILURE:
      return state;
    case FETCH_VIDEOGAME_GENRE:
      return { ...state, genreFilter: action.payload };

    case FETCH_GENRES:
      return { ...state, FETCH_GENRES: action.payload };

    default:
      return state;
  }
}

export default rootReducer;
