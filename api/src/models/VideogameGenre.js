const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("VideogameGenre", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  });
};
