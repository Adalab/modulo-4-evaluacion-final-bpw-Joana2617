const express = require("express");
const router = express.Router();
const { getConnection } = require("../db");

router.get("/", async (req, res) => {
  try {
    const conn = await getConnection();
    const [result] = await conn.query("SELECT * FROM frases");
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
  const { texto, marca_tiempo, descripcion, personaje_id, capitulo_id } =
    req.body;

  if (!texto || !personaje_id || !capitulo_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const conn = await getConnection();
    const query = `
      INSERT INTO frases (texto, marca_tiempo, descripcion, personaje_id, capitulo_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await conn.execute(query, [
      texto,
      marca_tiempo,
      descripcion,
      personaje_id,
      capitulo_id,
    ]);
    await conn.end();

    res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error inserting phrase" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { texto, marca_tiempo, descripcion, personaje_id, capitulo_id } =
    req.body;

  try {
    const conn = await getConnection();
    const query = `
      UPDATE frases
      SET texto = ?, marca_tiempo = ?, descripcion = ?, personaje_id = ?, capitulo_id = ?
      WHERE id = ?
    `;
    const [result] = await conn.execute(query, [
      texto,
      marca_tiempo,
      descripcion,
      personaje_id,
      capitulo_id,
      id,
    ]);
    await conn.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Phrase not found for update" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating phrase" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const conn = await getConnection();
    const [result] = await conn.execute("DELETE FROM frases WHERE id = ?", [
      id,
    ]);
    await conn.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Phrase not found for delete" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting phrase" });
  }
});

module.exports = router;
