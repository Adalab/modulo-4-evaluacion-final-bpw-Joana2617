const express = require("express");
const router = express.Router();
const { getConnection } = require("../db");

// GET /capitulos – Listar todos os capítulos
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
    console.error("Erro ao acessar o banco:", err);
    res.status(500).json({ error: "Error accessing the database" });
  }
});

// POST /capitulos – Criar um novo capítulo (ajustado sem campo temporada)
router.post("/", async (req, res) => {
  const { titulo, numero_episodio, fecha_emision } = req.body;

  if (!titulo || !numero_episodio || !fecha_emision) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const conn = await getConnection();
    const query = `
      INSERT INTO capitulos (titulo, numero_episodio, fecha_emision)
      VALUES (?, ?, ?)
    `;
    const [result] = await conn.execute(query, [
      titulo,
      numero_episodio,
      fecha_emision,
    ]);
    await conn.end();

    res.status(201).json({
      success: true,
      id: result.insertId,
      message: "Capítulo criado com sucesso!",
    });
  } catch (err) {
    console.error("Erro ao criar capítulo:", err);
    res.status(500).json({ error: "Erro ao criar capítulo" });
  }
});

module.exports = router;
