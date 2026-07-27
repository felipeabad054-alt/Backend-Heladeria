const fs = require("fs");
const { Pool } = require("pg");

const usarSSL = process.env.DB_SSL === "true";

let ssl = false;

if (usarSSL) {
  const rutaCertificado = process.env.DB_SSL_CA;

  if (!rutaCertificado) {
    throw new Error(
      "DB_SSL está activado, pero no se configuró DB_SSL_CA"
    );
  }

  ssl = {
    rejectUnauthorized: true,
    ca: fs.readFileSync(rutaCertificado, "utf8"),
  };
}

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl,
  connectionTimeoutMillis: 10000,
});

pool.on("error", (error) => {
  console.error(
    "Error inesperado en la conexión PostgreSQL:",
    error
  );
});

module.exports = pool;