const express = require("express");

const {
  listarSabores,
  obtenerSabor,
  crearSabor,
  actualizarSabor,
  eliminarSabor,
} = require("../controllers/saborController");

const router = express.Router();

router.get("/", listarSabores);
router.get("/:id", obtenerSabor);
router.post("/", crearSabor);
router.put("/:id", actualizarSabor);
router.delete("/:id", eliminarSabor);

module.exports = router;