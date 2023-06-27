import axios from "axios";
require("dotenv").config();

export const FETCH_VIDEOGAMES_SUCCESS = "FETCH_VIDEOGAMES_SUCCESS";
export const FETCH_VIDEOGAMES_FAILURE = "FETCH_VIDEOGAMES_FAILURE";

const API_KEY = process.env.API_KEY;

export function fetchVideoGames() {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=15`
      );
      dispatch({
        type: FETCH_VIDEOGAMES_SUCCESS,
        payload: response.data.results,
      });
    } catch (error) {
      dispatch({ type: FETCH_VIDEOGAMES_FAILURE, payload: error.message });
    }
  };
}

export const setGenreFilter = (genre) => {
  return {
    type: "SET_GENRE_FILTER",
    payload: genre,
  };
};

export const setOriginFilter = (origin) => {
  return {
    type: "SET_ORIGIN_FILTER",
    payload: origin,
  };
};
