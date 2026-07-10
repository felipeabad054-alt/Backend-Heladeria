const pool = require("../config/db");

async function obtenerTodos() {
  const resultado = await pool.query(
    "SELECT * FROM sabores ORDER BY id ASC"
  );

  return resultado.rows;
}

async function obtenerPorId(id) {
  const resultado = await pool.query(
    "SELECT * FROM sabores WHERE id = $1",
    [id]
  );

  return resultado.rows[0];
}

async function crear({ nombre, precio, stock, descripcion }) {
  const resultado = await pool.query(
    `
      INSERT INTO sabores (nombre, precio, stock, descripcion)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
    [nombre, precio, stock, descripcion]
  );

  return resultado.rows[0];
}

async function actualizar(id, { nombre, precio, stock, descripcion }) {
  const resultado = await pool.query(
    `
      UPDATE sabores
      SET nombre = $1,
          precio = $2,
          stock = $3,
          descripcion = $4
      WHERE id = $5
      RETURNING *
    `,
    [nombre, precio, stock, descripcion, id]
  );

  return resultado.rows[0];
}

async function eliminar(id) {
  const resultado = await pool.query(
    "DELETE FROM sabores WHERE id = $1 RETURNING *",
    [id]
  );

  return resultado.rows[0];
}

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};