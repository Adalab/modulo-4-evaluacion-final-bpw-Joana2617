const express = require("express");
const router = express.Router();
const { getConnection } = require("../db");

router.get("/", async (req, res) => {
  try {
    const conn = await getConnection();
    const [result] = await conn.query("SELECT * FROM capitulos");
    await conn.end();

    res.json({
      info: { count: result.length },
      simpsons: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error accessing the database" });
  }
});

router.post("/", async (req, res) => {
  const { titulo, numero_episodio, temporada } = req.body;

  if (!titulo || !numero_episodio || !temporada) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const conn = await getConnection();
    const query = `
      INSERT INTO capitulos (titulo, numero_episodio, temporada)
      VALUES (?, ?, ?)
    `;
    const [result] = await conn.execute(query, [
      titulo,
      numero_episodio,
      temporada,
    ]);
    await conn.end();

    res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar capítulo" });
  }
});

module.exports = router;
