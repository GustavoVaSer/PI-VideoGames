const express = require("express");
const router = express.Router();
const {
  getVideoGames,
  getVideoGamesName,
  getVideoGameId,
  getGenres,
  postVideoGame,
} = require("./videoGameControllers");

// Rutas para los endpoints
router.get("/videogames", getVideoGames);
router.get("/videogames/search", getVideoGamesName);
router.get("/videogame/:id", getVideoGameId);
router.get("/genres", getGenres);
router.post("/videogame", postVideoGame);

module.exports = router;
