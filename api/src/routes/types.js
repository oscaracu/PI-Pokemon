const { Router } = require("express");
const axios = require("axios");
const { Type } = require("../db");

const router = Router();

//GET Routes

//Obtiene la lista de todos los tipos de pokemon

router.get("/", async (req, res) => {
  try {
    const typesRequest = await Type.findAll();
    res.send(typesRequest);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST Routes

// Agrega un nuevo Tipo de Pokemon a la base de datos

router.post("/", async (req, res) => {
  // Solicitud de datos inicial a la API para alimentar la base de datos local.
  // const apiRequest = await axios("https://pokeapi.co/api/v2/type/");
  // const apiData = apiRequest.data.results;
  // const typesList = apiData.map((element) => {
  //   return { name: element.name };
  // });
  // const dbTypes = await Type.bulkCreate(typesList);
  // res.send(dbTypes);
  const { name } = req.body;
  try {
    if (!name) throw new Error("A name for new Pokemon Type is required");
    const newType = await Type.create({ name });
    res.send(newType);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// PUT Routes
// Modifica un Tipo de Pokemon en la base de datos
// Si el id pertenece a los tipos originales manda un mensaje de error

router.put("/", async (req, res) => {
  const { id, name } = req.body;

  try {
    if (!id || !name) throw new Error("data required");
    if (parseInt(id) < 21)
      throw new Error("modifying an original pokemon type is not allowed");
    const currentType = await Type.findByPk(parseInt(id));
    await currentType.update({ name });
    res.send(currentType);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
