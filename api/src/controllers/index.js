const getVideoGame = require("./videoGameControllers/getVideoGame");
const getVideoGameName = require("./videoGameControllers/getVideoGameName");
const getVideoGameId = require("./videoGameControllers/getVideoGameId");
const getGenre = require("./genreControllers/getGenre");
const postVideoGame = require("./videoGameControllers/postVideoGame");

module.exports = {
  getVideoGame,
  getVideoGameName,
  getVideoGameId,
  getGenre,
  postVideoGame,
};
