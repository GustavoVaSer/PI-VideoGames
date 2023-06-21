const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Videogame = sequelize.define(
    "Videogame",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
      },
      platforms: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      image: {
        type: DataTypes.STRING,
      },
      released: {
        type: DataTypes.DATEONLY,
      },
      rating: {
        type: DataTypes.FLOAT,
      },
    },
    {
      timestamps: false,
    }
  );

  return Videogame;
};
