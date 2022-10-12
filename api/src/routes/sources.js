const { Router } = require("express");
const { Source } = require("../db");

// Esta ruta servirá de puente entre nuestra API local y la API externa de pokemon
// En la base de datos la tabla sources almacena un indice de pokemons con la url de su detalle
// Cada vez que se realice una consulta a nuestra API en la ruta /pokemons se obtendran los detalles de este indice
// Los pokemons nuevos que no provengan de la API pokemon tendrán una url de la api local

const router = Router();

// GET route

// Obtiene el indice de URLs

router.get("/", async (req, res) => {
  try {
    const sourcesRequest = await Source.findAll();
    res.send(sourcesRequest);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
