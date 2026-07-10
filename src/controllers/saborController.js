const saborModel = require("../models/saborModel");

async function listarSabores(req, res) {
  try {
    const sabores = await saborModel.obtenerTodos();
    res.json(sabores);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener los sabores",
    });
  }
}

async function obtenerSabor(req, res) {
  try {
    const { id } = req.params;
    const sabor = await saborModel.obtenerPorId(id);

    if (!sabor) {
      return res.status(404).json({
        mensaje: "Sabor no encontrado",
      });
    }

    res.json(sabor);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener el sabor",
    });
  }
}

async function crearSabor(req, res) {
  try {
    const { nombre, precio, stock, descripcion } = req.body;

    if (!nombre || precio === undefined || stock === undefined) {
      return res.status(400).json({
        mensaje: "Nombre, precio y stock son obligatorios",
      });
    }

    if (Number(precio) < 0 || Number(stock) < 0) {
      return res.status(400).json({
        mensaje: "El precio y el stock no pueden ser negativos",
      });
    }

    const nuevoSabor = await saborModel.crear({
      nombre,
      precio,
      stock,
      descripcion: descripcion || "",
    });

    res.status(201).json(nuevoSabor);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al crear el sabor",
    });
  }
}

async function actualizarSabor(req, res) {
  try {
    const { id } = req.params;
    const { nombre, precio, stock, descripcion } = req.body;

    if (!nombre || precio === undefined || stock === undefined) {
      return res.status(400).json({
        mensaje: "Nombre, precio y stock son obligatorios",
      });
    }

    if (Number(precio) < 0 || Number(stock) < 0) {
      return res.status(400).json({
        mensaje: "El precio y el stock no pueden ser negativos",
      });
    }

    const saborActualizado = await saborModel.actualizar(id, {
      nombre,
      precio,
      stock,
      descripcion: descripcion || "",
    });

    if (!saborActualizado) {
      return res.status(404).json({
        mensaje: "Sabor no encontrado",
      });
    }

    res.json(saborActualizado);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al actualizar el sabor",
    });
  }
}

async function eliminarSabor(req, res) {
  try {
    const { id } = req.params;
    const saborEliminado = await saborModel.eliminar(id);

    if (!saborEliminado) {
      return res.status(404).json({
        mensaje: "Sabor no encontrado",
      });
    }

    res.json({
      mensaje: "Sabor eliminado correctamente",
      sabor: saborEliminado,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al eliminar el sabor",
    });
  }
}

module.exports = {
  listarSabores,
  obtenerSabor,
  crearSabor,
  actualizarSabor,
  eliminarSabor,
};