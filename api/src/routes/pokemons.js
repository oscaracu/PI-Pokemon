const { Router } = require("express");

const router = Router();

// GET routes

// Recibe un nombre por query y devuelve el pokemon con ese nombre, si no,
// devuelve el listado de pokemons con los datos necesarios para desplegar la ruta principal del client.

router.get("/", (req, res) => {
  const { name } = req.query;
  if (name) res.send(`Hola, yo soy ${name}`);
  else res.send("Hola Pokemon!");
});

// Recibe un id por params y devuelve el detalle de ese pokemon en particular

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Soy el pokemon ${id}`);
});

// POST routes

module.exports = router;
