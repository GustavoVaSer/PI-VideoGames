import axios from "axios";
require("dotenv").config();
export const FETCH_VIDEOGAMES_SUCCESS = "FETCH_VIDEOGAMES_SUCCESS";
export const FETCH_VIDEOGAMES_FAILURE = "FETCH_VIDEOGAMES_FAILURE";
export const SET_GENRE_FILTER = "SET_GENRE_FILTER";
export const FETCH_VIDEOGAME_GENRE = "FETCH_VIDEOGAME_GENRE";
export const SET_ORIGIN_FILTER = "SET_ORIGIN_FILTER";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_SEARCH_TERM = "SET_SEARCH_TERM";
export const SORT_VIDEO_GAMES = "SORT_VIDEO_GAMES";
export const CREATE_VIDEO_GAME_SUCCESS = "CREATE_VIDEO_GAME_SUCCESS";
export const CREATE_VIDEO_GAME_FAILURE = "CREATE_VIDEO_GAME_FAILURE";
export const FETCH_GENRES = "FETCH_GENRES";

const API_KEY = "1d449c3663a04ff6b2ed70c1faca004b";

export function fetchVideoGames(url) {
  console.log("Ejecutando fetchVideoGames");
  return async function (dispatch) {
    try {
      const response = await axios.get(url);
      dispatch({
        type: FETCH_VIDEOGAMES_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: FETCH_VIDEOGAMES_FAILURE, payload: error.message });
    }
  };
}

export const setSearchTerm = (searchTerm) => {
  console.log("Ejecutando setSearchTerm con término de búsqueda:", searchTerm);
  return (dispatch, getState) => {
    const videoGames = getState().videoGames;
    const filteredGames = videoGames.filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    dispatch({
      type: SET_SEARCH_TERM,
      payload: filteredGames,
    });
  };
};

//Ya no usare axios para hacer un get de la api ahora tengo que usar un filter de mi objeto global videoGames, lo que haga match con genre
export const fetchVideogamesByGender = (genre) => {
  const url = `http://localhost:3001/videogames/?genres=${genre.toLowerCase()}`;
  return async function (dispatch) {
    try {
      const response = await axios.get(url);
      dispatch({
        type: FETCH_GENRES,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: FETCH_VIDEOGAMES_FAILURE, payload: error.message });
    }
  };
};

export const fetchGenres = (url) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(url);
      dispatch({
        type: FETCH_VIDEOGAME_GENRE,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: FETCH_VIDEOGAMES_FAILURE, payload: error.message });
    }
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
  return (dispatch, getState) => {
    const videoGames = getState().videoGames; // Obtén la lista de juegos del estado global
    let sortedVideoGames = [...videoGames]; // Crea una copia de la lista de juegos para evitar mutar el estado global directamente

    switch (sortType) {
      case "name-asc":
        sortedVideoGames.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sortedVideoGames.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "rating-asc":
        sortedVideoGames.sort((a, b) => a.rating - b.rating);
        break;
      case "rating-desc":
        sortedVideoGames.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    dispatch({
      type: SORT_VIDEO_GAMES,
      payload: sortedVideoGames,
    });
  };
};

export const createVideoGame = (newGame) => {
  return (dispatch) => {
    axios
      .post(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=15`,
        newGame
      )
      .then((response) => {
        const data = response.data;
        console.log("Nuevo videojuego creado:", data);
        dispatch({
          type: CREATE_VIDEO_GAME_SUCCESS,
          payload: data,
        });
      })
      .catch((error) => {
        console.error("Error al crear el nuevo videojuego:", error);
        dispatch({
          type: CREATE_VIDEO_GAME_FAILURE,
          payload: error.message,
        });
      });
  };
};
