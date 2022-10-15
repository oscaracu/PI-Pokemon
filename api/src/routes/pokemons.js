const { Router } = require("express");
const { Pokemon, Source, Type } = require("../db");
const axios = require("axios");

const router = Router();

// Variables globales

const store = { currentImg: null, currentFilename: null };

// GET routes

// Recibe un nombre por query y devuelve el pokemon con ese nombre, si no,
// devuelve el listado de pokemons con los datos necesarios para desplegar la ruta principal del client.

router.get("/", async (req, res) => {
  const { name, offset, limit, order, attribute, type } = req.query;
  // Almacenamos la url base en una constante
  const currentUrl = `http://${req.hostname}:3001${req.baseUrl}/`;

  try {
    // En esta seccion se procesan los request por query name

    if (name) {
      const source = await Source.findOne({ where: { name } });
      if (!source) throw new Error("Pokemon not found");
      // Si el elemento encontrado no tiene una url se hace una consulta a la base de datos
      if (!source.url) {
        const pokemonDetails = await source.getPokemon({ include: [Type] });
        const currentPokemon = {
          id: source.id,
          name: source.name,
          image: pokemonDetails.image,
          attack: pokemonDetails.attack,
          types: pokemonDetails.types.map((type) => {
            return { name: type.name };
          }),
        };

        return res.send(currentPokemon);
      } else {
        // Si el elemento si tiene una url se hace una request a la API externa
        const apiResponse = await axios(source.url);
        const pokemonDetails = apiResponse.data;
        const currentPokemon = {
          id: source.id,
          name: source.name,
          image: pokemonDetails.sprites.other["official-artwork"].front_default,
          attack: pokemonDetails.stats[1].base_stat,
          types: pokemonDetails.types.map((type) => {
            return { name: type.type.name };
          }),
        };
        return res.send(currentPokemon);
      }
    }

    // A partir de aqui manejamos el request que lista todos los pokemons cuando no se recibe nombre por query
    // La lista a desplegar se almacenará en el objeto pokemonList
    // Contendrá las propiedades next y previous ayudar a la paginación del client

    const paginationAux = {
      currentOffset: parseInt(offset) ? parseInt(offset) : 0, // Establece valor por defecto de offset
      currentLimit: parseInt(limit) ? parseInt(limit) : 12, // Establece valor por defecto de limit
    };
    const currentDif = paginationAux.currentOffset - paginationAux.currentLimit;

    // Usamos findAndCountAll para obtener el numero de pokemons disponible y los devolvemos en grupos pequeños para evitar demoras de carga
    // Se recibe offset y limit por query para limitar la carga de resultados desde la API
    // El valor por defecto de offset será 0 y de limit 12 para cumplir con la paginacion solicitada en el boilerplate

    const { count, rows } = await Source.findAndCountAll({
      offset: offset ? offset : 0,
      limit: limit ? limit : 12,
      order: [[attribute ? attribute : "id", order ? order : "ASC"]],
    });
    const pokemonsList = {
      count: count,
      next:
        paginationAux.currentOffset > count ||
        paginationAux.currentOffset + paginationAux.currentLimit > count
          ? null
          : `${currentUrl}?offset=${
              paginationAux.currentOffset + paginationAux.currentLimit
            }&limit=${paginationAux.currentLimit}`,
      previous:
        paginationAux.currentOffset === 0
          ? null
          : `${currentUrl}?offset=${
              currentDif < 0
                ? 0
                : paginationAux.currentOffset - paginationAux.currentLimit
            }&limit=${
              currentDif < 0
                ? paginationAux.currentLimit + currentDif
                : paginationAux.currentLimit
            }`,
      results: [],
    };
    // Rows contiene un array con los elementos obtenidos con findAndCountAll
    const pokemonsSource = rows;
    for (const source of pokemonsSource) {
      // Si el elemento encontrado no tiene una url se hace una consulta a la base de datos

      if (!source.url) {
        const pokemonDetails = await source.getPokemon({ include: [Type] });
        const currentPokemon = {
          id: source.id,
          name: source.name,
          image: pokemonDetails.image,
          attack: pokemonDetails.attack,
          types: pokemonDetails.types.map((type) => {
            return { name: type.name };
          }),
        };
        pokemonsList.results.push(currentPokemon);
      } else {
        // Si el elemento si tiene una url se hace una request a la API externa

        const apiResponse = await axios(source.url);
        const pokemonDetails = apiResponse.data;
        const currentPokemon = {
          id: source.id,
          name: source.name,
          image: pokemonDetails.sprites.other["official-artwork"].front_default,
          attack: pokemonDetails.stats[1].base_stat,
          types: pokemonDetails.types.map((type) => {
            return { name: type.type.name };
          }),
        };
        // Almacenamos los resultados
        pokemonsList.results.push(currentPokemon);
      }
    }

    res.send(pokemonsList);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Recibe un id por params y devuelve el detalle de ese pokemon en particular

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (isNaN(id))
      throw new Error(
        "a number is required as a route parameter, for names use a query /?name=something"
      );
    const dbResponse = await Source.findByPk(parseInt(id));
    if (!dbResponse) throw new Error("Pokemon id not found");
    // Si la response no tiene url se obtienen los detalles de la base de datos local
    if (!dbResponse.url) {
      const pokemonDetails = await dbResponse.getPokemon({ include: Type });
      const { image, hp, attack, defense, speed, height, weight, types } =
        pokemonDetails;
      const currentPokemon = {
        id,
        name: dbResponse.name,
        image,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        types: types.map((type) => {
          return { name: type.name };
        }),
      };
      return res.send(currentPokemon);
    } else {
      //Si la response tiene url, se obtienen los detalles por request a la API pokemon externa
      const apiResponse = await axios(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const apiData = apiResponse.data;
      const { sprites, stats, height, weight, types } = apiData;
      const currentPokemon = {
        id,
        name: dbResponse.name,
        img: sprites.other["official-artwork"].front_default,
        hp: stats[0].base_stat,
        attack: stats[1].base_stat,
        defense: stats[2].base_stat,
        speed: stats[5].base_stat,
        height,
        weight,
        types: types.map((type) => {
          return { name: type.type.name };
        }),
      };
      res.send(currentPokemon);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// POST route

router.post("/", async (req, res) => {
  const imagesUrl = `http://${req.hostname}:3001/images/`;
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
    // Si hay un arhivo de imagen precargado se almacena y se crea el nombre de archivo
    if (store.currentImg) {
      const fileExt = store.currentImg.name.split(".").pop();
      const fileName = name
        .split(/[ \-\_]/)
        .map((word) => `${word.toLowerCase()}`)
        .join("_");
      await store.currentImg.mv(
        `./src/public/images/${fileName}.${fileExt}`,
        (err) => {
          if (err) throw new Error("image file upload failed");
        }
      );
      store.currentFilename = `${fileName}.${fileExt}`;
    }
    const newPokemon = {
      name,
      image: store.currentImg
        ? `${imagesUrl}${store.currentFilename}`
        : `${imagesUrl}default.png`,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
    };
    // Aqui se crea un nuevo pokemon en la base de datos
    const dbPokemon = await Pokemon.create(newPokemon);

    // Aqui asignamos a que tipos de pokemon pertenece
    if (types && types.length > 0) {
      const dbTypes = [];
      for (const type of types) {
        const currentType = await Type.findByPk(parseInt(type.id));
        dbTypes.push(currentType);
      }
      await dbPokemon.setTypes(dbTypes);
    } else {
      // Si no se reciben tipos, se asigna el tipo normal por defecto
      const defaultType = await Type.findByPk(1);
      await dbPokemon.setTypes(defaultType);
    }

    // Si no hay errores finalmente se crea la entrada en el indice y se asocian las tablas
    const dbSource = await Source.create({ name });
    await dbSource.setPokemon(dbPokemon);
    // Limpiamos la store
    store.currentImg = null;
    store.currentFilename = null;
    res.send(dbSource);
  } catch (error) {
    if (error.message === "image file upload failed") {
      return res.status(500).send({ error: error.message });
    }
    res.status(400).send({ error: error.message });
  }
});

// Recibe un archivo y lo almacena en memoria

router.post("/upload", async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      throw new Error("No files were uploaded.");
    store.currentImg = req.files.img;

    res.send({ message: "the file has been preloaded successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
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
    // Hacemos la request al indice de la base de datos por id
    const currentSource = await Source.findByPk(parseInt(id));
    // Si no existe se envía mensaje de error
    if (!currentSource) throw new Error("the requested id does not exist");
    // Si existe el id se obtienen los detalles asociados al indice
    const currentPokemon = await currentSource.getPokemon();
    // Primero se actualizan los detalles del pokemon y sus tipos
    await currentPokemon.update(newPokemonData);
    if (types && types.length > 0) {
      const dbTypes = [];
      for (const type of types) {
        const currentType = await Type.findByPk(parseInt(type.id));
        dbTypes.push(currentType);
      }
      await currentPokemon.setTypes(dbTypes);
      // Si no hay errores se actualiza el indice
      await currentSource.update({ name: newPokemonData.name });
    }
    res.send(currentPokemon);
  } catch (error) {
    res.status(400).send({ error: error.message });
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
    res.send({ message: "Pokemon successfully eliminated" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
