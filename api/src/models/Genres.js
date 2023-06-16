const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("genre", {
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

  const Genre = sequelize.define("genre", {
    // propiedades del modelo
  });

  Genre.associate = (models) => {
    Genre.belongsToMany(models.Videogame, { through: "VideogameGenre" });
  };

  return Genre;
};
