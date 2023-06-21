require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;

const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

const getVideoGame = async () => {
  try {
    const response = await axios.get(URL);
    const videogames = response.data.results.map((game) => ({
      id: game.id,
      name: game.name,
      description: game.description,
      platforms: game.platforms,
      image: game.background_image,
      released: game.released,
      rating: game.rating,
      genres: game.genres,
    }));

    return videogames;
  } catch (error) {
    console.error("Error al obtener los videojuegos:", error);
    throw error;
  }
};

module.exports = getVideoGame;
