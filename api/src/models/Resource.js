const { DataTypes } = require("sequelize");

// Esta modelo ha sido diseñado para almacenar la URL de los detalles de cada Pokemon en la base de datos
// De esta manera evito la duplicidad de ids provenientes de la API de los provenientes de la BD.

module.exports = (sequelize) => {
  sequelize.define("source", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
};
