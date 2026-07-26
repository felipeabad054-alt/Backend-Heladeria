const { Pool } = require("pg");

const usarSSL = process.env.DB_SSL === "true";

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  // Para Amazon RDS.
  ssl: usarSSL
    ? {
        rejectUnauthorized: false,
      }
    : false,

  connectionTimeoutMillis: 10000,
});

pool.on("error", (error) => {
  console.error("Error inesperado en la conexión PostgreSQL:", error);
});

module.exports = pool;