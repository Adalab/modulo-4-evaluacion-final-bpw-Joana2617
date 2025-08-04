const express = require("express");
const router = express.Router();
const { getConnection } = require("../db");

router.get("/", async (req, res) => {
  try {
    const conn = await getConnection();
    const [result] = await conn.query("SELECT * FROM personajes");
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
  const { nombre, apellido, ocupacion, edad } = req.body;

  if (!nombre || !apellido) {
    return res.status(400).json({ error: "Nome e sobrenome são obrigatórios" });
  }

  try {
    const conn = await getConnection();
    const query = `
      INSERT INTO personajes (nombre, apellido, ocupacion, edad)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await conn.execute(query, [
      nombre,
      apellido,
      ocupacion,
      edad,
    ]);
    await conn.end();

    res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar personagem" });
  }
});

module.exports = router;
