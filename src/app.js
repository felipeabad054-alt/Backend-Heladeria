const express = require("express");
const cors = require("cors");

const saborRoutes = require("./routes/saborRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensaje: "API de la Heladería funcionando correctamente",
  });
});

app.use("/api/sabores", saborRoutes);

module.exports = app;