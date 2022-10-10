const { Router } = require("express");

const router = Router();

// GET routes

router.get("/", (req, res) => {
  res.send("Hola Pokemon!");
});

module.exports = router;
