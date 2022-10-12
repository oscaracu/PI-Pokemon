const { Router } = require("express");
const pokemonsRouter = require("./pokemons");
const typesRouter = require("./types");
const sourcesRouter = require("./sources");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemons", pokemonsRouter);
router.use("/types", typesRouter);
router.use("/sources", sourcesRouter);

module.exports = router;
