require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;

const getVideoGameById = async (idVideogame) => {
  const getGameFromAPI = async (idVideogame) => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
      );
      const game = response.data;
      return {
        id: game.id,
        name: game.name,
        description: game.description,
        platforms: game.platforms,
        image: game.background_image,
        released: game.released,
        rating: game.rating,
        genres: game.genres,
      };
    } catch (error) {
      return null;
    }
  };

  const getGameFromDatabase = async (idVideogame) => {
    return await Videogame.findOne({
      where: { id: idVideogame },
    });
  };

  if (idVideogame.includes("-")) {
    const gameFromDatabase = await getGameFromDatabase(idVideogame);
    if (!gameFromDatabase) {
      const error = new Error(
        `El videojuego con id: ${idVideogame} no se encuentra en la base de datos`
      );
      error.statusCode = 404;
      throw error;
    }
    return gameFromDatabase;
  } else {
    const gameFromAPI = await getGameFromAPI(idVideogame);
    if (gameFromAPI) {
      return gameFromAPI;
    } else {
      const error = new Error(
        `El videojuego con id: ${idVideogame} no se encuentra en la API`
      );
      error.statusCode = 404;
      throw error;
    }
  }
};

module.exports = getVideoGameById;
