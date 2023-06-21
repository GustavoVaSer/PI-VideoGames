require("dotenv").config();
const axios = require("axios");
const { Videogame } = require("../../db");
const { API_KEY } = process.env;

// Se trae un game por id de la api
// Por ahora devolvemos integrando id de la api y id de la BD
const getVideoGameId = async (idVideogame) => {
  // Función para buscar videogame en la BD
  const findGameBD = async (idVideogame) => {
    return await Videogame.findOne({
      where: { id: idVideogame },
    });
  };

  // Función para buscar videogame en la API
  const findGameAPI = async (idVideogame) => {
    try {
      const { data } = await axios.get(
        `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
      );
      const gameObj = {
        id: data.id,
        name: data.name,
        description: data.description,
        platforms: data.platforms,
        image: data.background_image,
        released: data.released,
        rating: data.rating,
        genres: data.genres,
      };
      return gameObj;
    } catch (error) {
      return null;
    }
  };

  // Función para lógica de buscar
  const searchGame = async (idVideogame) => {
    if (idVideogame.includes("-")) {
      const gameFound = await findGameBD(idVideogame);
      let error;
      if (!gameFound) {
        error = new Error(
          `El videogame con id: ${idVideogame} no se encuentra en la BD`
        );
        error.statusCode = 404;
        throw error;
      }
      return gameFound;
    } else {
      const gameApi = await findGameAPI(idVideogame);

      if (gameApi) {
        return gameApi;
      } else {
        error = new Error(
          `El videogame con id: ${idVideogame} no se encuentra en la API`
        );
        error.statusCode = 404;
        throw error;
      }
    }
  };

  // Ahora ejecuto searchGame para finalmente retornar el videogame encontrado
  const game = await searchGame(idVideogame);
  return game;
};

module.exports = getVideoGameId;
