const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define("Genre", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Genre;
};
