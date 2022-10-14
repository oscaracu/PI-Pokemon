const { DataTypes } = require("sequelize");

// Esta modelo ha sido diseñado para almacenar la URL de los detalles de cada Pokemon en la base de datos
// De esta manera evito la duplicidad de ids provenientes de la API de los provenientes de la base de datos local.

module.exports = (sequelize) => {
  sequelize.define(
    "source",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        set(value) {
          this.setDataValue(
            "name",
            value
              .split(/[ \-\_]/)
              .map((word) => `${word.toLowerCase()}`)
              .join("-")
          );
        },
      },
      url: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
