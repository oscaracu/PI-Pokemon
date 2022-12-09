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
        // unique: true,
        // validate: {
        //   notNums(value) {
        //     if (!/^[a-zA-Z \-]+$/.test(value))
        //       throw new Error("The name should not have numbers");
        //   },
        // },
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
      // url: {
      //   type: DataTypes.STRING,
      // },
      image: {
        type: DataTypes.STRING,
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
    },
    {
      timestamps: false,
      indexes: [
        {
          unique: false,
          fields: ["name", "attack"],
        },
      ],
    }
  );
};
