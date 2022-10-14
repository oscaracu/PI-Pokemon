const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  const ERR_MSG_GTZ = "must be an integer greater than 0";
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNums(value) {
            if (!/^[a-zA-Z \-]+$/.test(value))
              throw new Error("The name should not have numbers");
          },
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
          intGTZ(value) {
            if (!/^([1-9][0-9]+|[1-9])$/.test(value))
              throw new Error("hp " + ERR_MSG_GTZ);
          },
        },
      },
      attack: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
        validate: {
          intGTZ(value) {
            if (!/^([1-9][0-9]+|[1-9])$/.test(value))
              throw new Error("attack " + ERR_MSG_GTZ);
          },
        },
      },
      defense: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
        validate: {
          intGTZ(value) {
            if (!/^([1-9][0-9]+|[1-9])$/.test(value))
              throw new Error("defense " + ERR_MSG_GTZ);
          },
        },
      },
      speed: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
        validate: {
          intGTZ(value) {
            if (!/^([1-9][0-9]+|[1-9])$/.test(value))
              throw new Error("speed " + ERR_MSG_GTZ);
          },
        },
      },
      height: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
        validate: {
          intGTZ(value) {
            if (!/^([1-9][0-9]+|[1-9])$/.test(value))
              throw new Error("height " + ERR_MSG_GTZ);
          },
        },
      },
      weight: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
        validate: {
          intGTZ(value) {
            if (!/^([1-9][0-9]+|[1-9])$/.test(value))
              throw new Error("weight " + ERR_MSG_GTZ);
          },
        },
      },
    },
    { timestamps: false }
  );
};
