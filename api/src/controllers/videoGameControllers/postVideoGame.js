const { Op } = require("sequelize");
const { Videogame, Genre } = require("../../db");
const formatDate = require("../../helpers/dateFormat");

const postVideoGame = async (game) => {
  const { name, description, platforms, image, released, rating, genres } =
    game;

  // Validación de nombre válido
  if (!name) {
    const error = new Error("Se requiere un nombre válido");
    error.statusCode = 400;
    throw error;
  }

  // Validación de campos nulos del objeto Videogame
  if (!description || !platforms || !image || !released || !rating) {
    const error = new Error(
      "Se requiere información para todos los campos del videojuego a crear"
    );
    error.statusCode = 400;
    throw error;
  }

  // Validación de géneros
  if (!genres || genres.length === 0) {
    const error = new Error("Se debe asociar al menos un género");
    error.statusCode = 400;
    throw error;
  }

  // Validación de existencia de géneros
  const genresFound = await Genre.findAll({
    where: { name: { [Op.in]: genres } },
  });

  // if (genresFound.length === 0) {
  //   const error = new Error("No se encontraron los géneros asociados");
  //   error.statusCode = 404;
  //   throw error;
  // }

  // Validación de existencia de videojuego con el mismo nombre
  const gameFound = await Videogame.findOne({ where: { name } });

  if (gameFound) {
    const error = new Error(`Ya existe un videojuego con el nombre ${name}`);
    error.statusCode = 400;
    throw error;
  }

  // Creación del objeto para crear un nuevo videojuego
  const newGameObj = {
    name,
    description,
    platforms,
    image,
    released: formatDate(released),
    rating,
  };

  // Creación del nuevo videojuego
  const newGame = await Videogame.create(newGameObj);

  // Asociación de los géneros al videojuego creado
  // await newGame.addGenres(genresFound);

  // Construcción del nuevo videojuego con los géneros asociados
  const newGameCreated = await Videogame.findOne({
    where: { name: newGameObj.name },
    // include: [Genre],
  });

  return newGameCreated;
};

module.exports = postVideoGame;
