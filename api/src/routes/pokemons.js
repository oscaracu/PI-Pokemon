const { Router } = require("express");
const { Pokemon, Source, Type } = require("../db");
const axios = require("axios");

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

router.post("/", async (req, res) => {
  // Solicitud inicial a la API pokemon para crear un índice en la base de datos local
  // const apiRequest = await axios(
  //   "https://pokeapi.co/api/v2/pokemon/?limit=905"
  // );
  // const pokemonList = apiRequest.data.results;
  // const dbIndex = await Source.bulkCreate(pokemonList);
  // res.send(dbIndex);
  const { name, image, hp, attack, defense, speed, height, weight, types } =
    req.body;
  try {
    if (!name) throw new Error("a name is required");
    const newPokemon = {
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
    };
    const dbSource = await Source.create({ name });
    const dbPokemon = await Pokemon.create(newPokemon);
    await dbSource.setPokemon(dbPokemon);
    if (types && types.length > 0) {
      const dbTypes = [];
      for (const type of types) {
        const currentType = await Type.findByPk(parseInt(type.id));
        dbTypes.push(currentType);
      }
      await dbPokemon.setTypes(dbTypes);
    } else {
      const defaultType = await Type.findByPk(1);
      await dbPokemon.setTypes(defaultType);
    }
    res.send(dbSource);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
