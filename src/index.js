const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2/promise");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const getConnection = async () => {
  return await mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });
};

app.get("/personajes", async (req, res) => {
  try {
    const conn = await getConnection();
    const [result] = await conn.query("SELECT * FROM personajes");
    await conn.end();
    res.json({ info: { count: result.length }, simpsons: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error accessing the database" });
  }
});

app.post("/personajes", async (req, res) => {
  const { nombre, apellido, ocupacion } = req.body;
  if (!nombre || !apellido) {
    return res.status(400).json({ error: "Nome e sobrenome são obrigatórios" });
  }

  try {
    const conn = await getConnection();
    const query = `
      INSERT INTO personajes (nombre, apellido, ocupacion)
      VALUES (?, ?, ?)
    `;
    const [result] = await conn.execute(query, [nombre, apellido, ocupacion]);
    await conn.end();
    res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar personagem" });
  }
});

app.get("/capitulos", async (req, res) => {
  try {
    const conn = await getConnection();
    const [result] = await conn.query("SELECT * FROM capitulos");
    await conn.end();
    res.json({ info: { count: result.length }, simpsons: result });
  } catch (err) {
    console.error("Erro ao acessar o banco:", err);
    res.status(500).json({ error: "Error accessing the database" });
  }
});

app.post("/capitulos", async (req, res) => {
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
    res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    console.error("Erro ao criar capítulo:", err);
    res.status(500).json({ error: "Erro ao criar capítulo" });
  }
});

app.get("/frases", async (req, res) => {
  try {
    const conn = await getConnection();
    const [result] = await conn.query("SELECT * FROM frases");
    await conn.end();
    res.json({ info: { count: result.length }, simpsons: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error accessing the database" });
  }
});

app.post("/frases", async (req, res) => {
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

app.put("/frases/:id", async (req, res) => {
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

app.delete("/frases/:id", async (req, res) => {
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

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
