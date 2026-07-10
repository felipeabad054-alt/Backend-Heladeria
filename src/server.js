require("dotenv").config();

const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT || 5000;

async function iniciarServidor() {
  try {
    const resultado = await pool.query("SELECT NOW()");

    console.log("✅ PostgreSQL conectado");
    console.log("Hora del servidor:", resultado.rows[0].now);

    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Error al conectar PostgreSQL");
    console.error(error);
  }
}

iniciarServidor();