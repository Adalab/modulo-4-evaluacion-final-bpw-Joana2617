const express = require("express");
const router = express.Router();
const { getConnection } = require("../db");

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const conn = await getConnection();
    const [result] = await conn.execute(
      "SELECT * FROM frase_detalhada WHERE id = ?",
      [id]
    );
    await conn.end();

    if (result.length === 0) {
      return res.status(404).json({ error: "Frase não encontrada" });
    }

    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar frase" });
  }
});

router.get("/personaje/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const conn = await getConnection();
    const [result] = await conn.execute(
      "SELECT * FROM frase_detalhada WHERE id = ?",
      [id]
    );
    await conn.end();

    if (result.length === 0) {
      return res
        .status(404)
        .json({ error: "Nenhuma frase encontrada para este personagem" });
    }

    res.json({
      info: { count: result.length },
      frases: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar frases do personagem" });
  }
});

router.get("/capitulo/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const conn = await getConnection();
    const query = `
      SELECT 
        f.id,
        f.texto,
        f.marca_tiempo,
        f.descripcion,
        p.nombre AS personaje,
        c.titulo AS capitulo
      FROM frases f
      LEFT JOIN personajes p ON f.personaje_id = p.id
      LEFT JOIN capitulos c ON f.capitulo_id = c.id
      WHERE f.capitulo_id = ?
    `;
    const [result] = await conn.execute(query, [id]);
    await conn.end();

    if (result.length === 0) {
      return res
        .status(404)
        .json({ error: "Nenhuma frase encontrada para este capítulo" });
    }

    res.json({
      info: { count: result.length },
      frases: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar frases do capítulo" });
  }
});

module.exports = router;
