const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^[a-zA-Z \-]+$/,
        },
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
      image: {
        type: DataTypes.STRING,
        defaultValue: "default.png",
      },
      hp: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
        validate: {
          is: /^([1-9][0-9]+|[1-9])$/,
        },
      },
      attack: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
        validate: {
          is: /^([1-9][0-9]+|[1-9])$/,
        },
      },
      defense: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
        validate: {
          is: /^([1-9][0-9]+|[1-9])$/,
        },
      },
      speed: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
        validate: {
          is: /^([1-9][0-9]+|[1-9])$/,
        },
      },
      height: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
        validate: {
          is: /^([1-9][0-9]+|[1-9])$/,
        },
      },
      weight: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
        validate: {
          is: /^([1-9][0-9]+|[1-9])$/,
        },
      },
    },
    { timestamps: false }
  );
};
