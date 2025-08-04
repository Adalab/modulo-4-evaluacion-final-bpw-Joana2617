const express = require("express");
const cors = require("cors");
const frasesRoutes = require("./routes/frases");
const personajesRoutes = require("./routes/personajes");
const capitulosRoutes = require("./routes/capitulos");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/frases", frasesRoutes);
app.use("/personajes", personajesRoutes);
app.use("/capitulos", capitulosRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
