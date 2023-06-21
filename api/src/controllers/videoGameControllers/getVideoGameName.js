require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame } = require("../../db");
const { Op } = require("sequelize");

const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

const getVideoGamesByName = async (name) => {
  if (!name) {
    const error = new Error(
      "Debe ingresar un nombre para buscar el videojuego"
    );
    error.statusCode = 400;
    throw error;
  }

  const formattedName = name.toLowerCase();

  const searchInAPI = async (formattedName) => {
    try {
      const { data } = await axios.get(
        `${URL}&search=${encodeURIComponent(
          formattedName
        )}&search_precise=true&page_size=150`
      );
      const gamesByName = data.results.map((game) => {
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
      });
      return gamesByName;
    } catch (error) {
      return [];
    }
  };

  const searchInDatabase = async (formattedName) => {
    return await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${formattedName}%`,
        },
      },
      limit: 15,
    });
  };

  const gamesFromAPI = await searchInAPI(formattedName);
  const gamesFromDatabase = await searchInDatabase(formattedName);

  if (gamesFromAPI.length) {
    return gamesFromAPI;
  } else if (gamesFromDatabase.length) {
    return gamesFromDatabase;
  } else {
    const error = new Error(
      `No se encontró ningún juego que contenga la palabra ${name}`
    );
    error.statusCode = 404;
    throw error;
  }
};

module.exports = getVideoGamesByName;
