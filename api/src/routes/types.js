const { Router } = require("express");

const router = Router();

//GET Routes

//Obtiene la lista de todos los tipos de pokemon

router.get("/", (req, res) => {
  res.send("Tipos de Pokemon");
});

module.exports = router;
