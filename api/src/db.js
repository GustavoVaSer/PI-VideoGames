require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`,
  {
    logging: false,
    native: false,
  }
);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== "index.js" && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const modelDefiner = require(path.join(__dirname, "models", file));
    modelDefiners.push(modelDefiner);
  });

// modelDefiners.forEach((modelDefiner) => modelDefiner(sequelize, DataTypes));

// Asocia los modelos si es necesario
Object.keys(sequelize.models).forEach((modelName) => {
  if (sequelize.models[modelName].associate) {
    sequelize.models[modelName].associate(sequelize.models);
  }
});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
