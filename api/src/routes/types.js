const { Router } = require("express");
const axios = require("axios");
const { Type } = require("../db");

const router = Router();

//GET Route

//Obtiene la lista de todos los tipos de pokemon

router.get("/", async (req, res) => {
  try {
    const typesRequest = await Type.findAll();
    res.send(typesRequest);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST Route

// Agrega un nuevo Tipo de Pokemon a la base de datos

router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    // Solicitud de datos inicial a la API para alimentar la base de datos local.
    const { count } = await Type.findAndCountAll();
    if (count === 0) {
      const apiRequest = await axios("https://pokeapi.co/api/v2/type/");
      const apiData = apiRequest.data.results;
      const typesList = apiData.map((element) => {
        return { name: element.name };
      });
      const dbTypes = await Type.bulkCreate(typesList);
      return res.send(dbTypes);
    }

    //A partir de aqui maneja las solicitudes post de manera normal
    if (!name) throw new Error("A name for new Pokemon Type is required");
    const newType = await Type.create({ name });
    res.send(newType);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// PUT Route
// Modifica un Tipo de Pokemon en la base de datos
// Si el id pertenece a los tipos originales manda un mensaje de error

router.put("/", async (req, res) => {
  const { id, name } = req.body;

  try {
    if (parseInt(id) < 21)
      throw new Error("modifying an original pokemon type is not allowed");
    if (!id || !name) throw new Error("an id and a name are required");
    const currentType = await Type.findByPk(parseInt(id));
    if (!currentType) throw new Error("invalid id");
    await currentType.update({ name });
    res.send(currentType);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// DELETE Route
// Borra un Tipo de Pokemon de la base de datos
// Si el id pertenece a los tiposs originales manda un mensaje de error

router.delete("/", async (req, res) => {
  const { id } = req.body;
  try {
    if (parseInt(id) < 21)
      throw new Error("deleting an original pokemon type is not allowed");
    if (!id) throw new Error("an id is required");
    const currentType = await Type.findByPk(parseInt(id));
    if (!currentType) throw new Error("invalid id");
    await currentType.destroy();
    res.send("type removed sucessfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
