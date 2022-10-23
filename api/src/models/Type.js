const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo para los Tipos de Pokemon
  sequelize.define(
    "type",
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
              .map(
                (word) =>
                  `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`
              )
              .join(" ")
          );
        },
      },
    },
    { timestamps: false }
  );
};
