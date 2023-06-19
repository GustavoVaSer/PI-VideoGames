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

// Asocia los modelos si es necesario
modelDefiners.forEach((modelDefiner) => {
  if (modelDefiner && modelDefiner.default) {
    const model = modelDefiner.default(sequelize, DataTypes);
    if (model.associate) {
      model.associate(sequelize.models);
    }
  }
});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
