const router = require("express").Router();
const { Videogame, Genre } = require("../db.js");
const axios = require("axios");
const { Op } = require("sequelize");
require("dotenv").config();

// Importar todos los routers;
const apiKey = process.env.API_KEY;

// Ruta principal
router.get("/", (req, res) => {
  res.send("Bienvenido a mi aplicación de videojuegos");
});

// Ejemplo: const authRouter = require('./auth.js');
// GET /videogames
router.get("/videogames", async (req, res, next) => {
  try {
    // Obtener los videojuegos de la base de datos
    const videogamesDB = await Videogame.findAll();

    // Obtener los videojuegos de la API RAWG
    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: apiKey, // Incluir la API_KEY en los parámetros de consulta
      },
    });
    const videogamesAPI = response.data.results;

    // Combinar los videojuegos de la base de datos y la API en un solo arreglo
    const videogames = [...videogamesDB, ...videogamesAPI];

    res.json(videogames);
  } catch (error) {
    next(error);
  }
});

// GET /videogames/:idVideogame
router.get("/videogames/:idVideogame", async (req, res, next) => {
  const { idVideogame } = req.params;

  try {
    // Buscar el videojuego en la base de datos por su ID
    const videogameDB = await Videogame.findByPk(idVideogame, {
      include: Genre,
    });

    if (videogameDB) {
      // El videojuego fue encontrado en la base de datos
      res.json(videogameDB);
    } else {
      // El videojuego no existe en la base de datos, buscarlo en la API RAWG
      const response = await axios.get(
        `https://api.rawg.io/api/games/${idVideogame}`,
        {
          params: {
            key: apiKey, // Incluir la API_KEY en los parámetros de consulta
          },
        }
      );
      const videogameAPI = response.data;

      res.json(videogameAPI);
    }
  } catch (error) {
    next(error);
  }
});

// GET /videogames/name?="..."
router.get("/videogames/name", async (req, res, next) => {
  const { name } = req.query;

  try {
    // Buscar videojuegos en la base de datos que coincidan con el nombre (insensible a mayúsculas y minúsculas)
    const videogamesDB = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: 15,
    });

    if (videogamesDB.length > 0) {
      // Se encontraron videojuegos en la base de datos
      res.json(videogamesDB);
    } else {
      // No se encontraron videojuegos en la base de datos, buscar en la API RAWG
      const response = await axios.get("https://api.rawg.io/api/games", {
        params: {
          search: name,
          page_size: 15,
          key: apiKey, // Incluir la API_KEY en los parámetros de consulta
        },
      });
      const videogamesAPI = response.data.results;

      res.json(videogamesAPI);
    }
  } catch (error) {
    next(error);
  }
});

// POST /videogames
router.post("/videogames", async (req, res, next) => {
  const { name, description, platforms, image, releaseDate, rating, genres } =
    req.body;

  try {
    // Crear el videojuego en la base de datos
    const videogame = await Videogame.create({
      name,
      description,
      platforms,
      image,
      releaseDate,
      rating,
    });

    // Buscar los géneros en la base de datos y relacionarlos con el videojuego
    const foundGenres = await Genre.findAll({
      where: {
        name: {
          [Op.in]: genres,
        },
      },
    });

    await videogame.addGenres(foundGenres);

    res.status(201).json(videogame);
  } catch (error) {
    next(error);
  }
});

// GET /genres
router.get("/genres", async (req, res, next) => {
  try {
    // Obtener los géneros de la base de datos
    const genresDB = await Genre.findAll();

    if (genresDB.length > 0) {
      // Los géneros ya están en la base de datos, retornarlos
      res.json(genresDB);
    } else {
      // Los géneros no están en la base de datos, obtenerlos de la API RAWG
      const response = await axios.get("https://api.rawg.io/api/genres", {
        params: {
          key: apiKey, // Incluir la API_KEY en los parámetros de consulta
        },
      });
      const genresAPI = response.data.results;

      // Guardar los géneros en la base de datos
      await Promise.all(
        genresAPI.map((genreAPI) => {
          return Genre.create({ name: genreAPI.name });
        })
      );

      res.json(genresAPI);
    }
  } catch (error) {
    next(error);
  }
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
