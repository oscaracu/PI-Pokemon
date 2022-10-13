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

// POST route

router.post("/", async (req, res) => {
  const { name, image, hp, attack, defense, speed, height, weight, types } =
    req.body;
  try {
    // Solicitud inicial a la API pokemon para crear un índice en la base de datos local
    const { count } = await Source.findAndCountAll();
    if (count === 0) {
      const apiRequest = await axios(
        "https://pokeapi.co/api/v2/pokemon/?limit=905"
      );
      const pokemonList = apiRequest.data.results;
      const dbIndex = await Source.bulkCreate(pokemonList);
      return res.send(dbIndex);
    }

    // A partir de aqui maneja las solicitudes post de forma normal
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

// PUT route
// Modifica un pokemon existente en la base de datos.
//Si el id pertenece a un pokemon original envía un mensaje de error

router.put("/", async (req, res) => {
  const { id, name, image, hp, attack, defense, speed, height, weight, types } =
    req.body;
  const newPokemonData = {
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
  };
  try {
    if (!id) throw new Error("an id is required");
    if (parseInt(id) < 906)
      throw new Error("modifying an original pokemon is not allowed");
    const currentSource = await Source.findByPk(parseInt(id));
    if (!currentSource) throw new Error("the requested id does not exist");
    const currentPokemon = await currentSource.getPokemon();
    await currentSource.update({ name: newPokemonData.name });
    await currentPokemon.update(newPokemonData);
    if (types && types.length > 0) {
      const dbTypes = [];
      for (const type of types) {
        const currentType = await Type.findByPk(parseInt(type.id));
        dbTypes.push(currentType);
      }
      await currentPokemon.setTypes(dbTypes);
    }
    res.send(currentPokemon);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// DELETE route
// Borra un pokemon de la base de datos.
// Si el id pertenece a un pokemon original envía un error.

router.delete("/", async (req, res) => {
  const { id } = req.body;
  try {
    if (!id) throw new Error("an id is required");
    if (parseInt(id) < 906)
      throw new Error("deleting an original pokemon is not allowed");
    const currentSource = await Source.findByPk(parseInt(id));
    if (!currentSource) throw new Error("the requested id does not exist");
    await currentSource.destroy();
    res.send("Pokemon successfully eliminated");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
