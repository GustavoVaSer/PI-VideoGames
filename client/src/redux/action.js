import axios from "axios";
require("dotenv").config();
export const FETCH_VIDEOGAMES_SUCCESS = "FETCH_VIDEOGAMES_SUCCESS";
export const FETCH_VIDEOGAMES_FAILURE = "FETCH_VIDEOGAMES_FAILURE";
export const SET_GENRE_FILTER = "SET_GENRE_FILTER";
export const SET_ORIGIN_FILTER = "SET_ORIGIN_FILTER";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_SEARCH_TERM = "SET_SEARCH_TERM";
export const SORT_VIDEO_GAMES = "SORT_VIDEO_GAMES";

const API_KEY = "1d449c3663a04ff6b2ed70c1faca004b";
console.log(API_KEY);

export function fetchVideoGames(url) {
  console.log("Ejecutando fetchVideoGames");
  return async function (dispatch) {
    try {
      const response = await axios.get(url);
      dispatch({
        type: FETCH_VIDEOGAMES_SUCCESS,
        payload: response.data.results,
      });
    } catch (error) {
      dispatch({ type: FETCH_VIDEOGAMES_FAILURE, payload: error.message });
    }
  };
}

export const setSearchTerm = (searchTerm) => {
  console.log("Ejecutando setSearchTerm con término de búsqueda:", searchTerm);
  return {
    type: SET_SEARCH_TERM,
    payload: searchTerm,
  };
};

export const setGenreFilter = (genre) => {
  return {
    type: SET_GENRE_FILTER,
    payload: genre,
  };
};

export const setOriginFilter = (origin) => {
  return {
    type: SET_ORIGIN_FILTER,
    payload: origin,
  };
};

export const setCurrentPage = (pageNumber) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: pageNumber,
  };
};

export const sortVideoGames = (sortType) => {
  return {
    type: SORT_VIDEO_GAMES,
    payload: sortType,
  };
};
