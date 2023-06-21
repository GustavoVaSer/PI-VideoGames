const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Genre = sequelize.define("Genre", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Genre;
};
