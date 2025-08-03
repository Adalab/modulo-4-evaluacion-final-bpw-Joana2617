const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2/promise");
const port = process.env.PORT || 3000;
require("dotenv").config();

const server = express();
server.use(express.static("public"));
server.use(cors());
server.use(express.json());
server.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});

const getConnection = async () => {
  return await mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });
};

server.get("/frases", async (req, res) => {
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

server.post("/frases", async (req, res) => {
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

server.get("/frases/:id", async (req, res) => {
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

server.put("/frases/:id", async (req, res) => {
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

server.delete("/frases/:id", async (req, res) => {
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

server.get("/personajes", async (req, res) => {
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

server.post("/personajes", async (req, res) => {
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

server.get("/capitulos", async (req, res) => {
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

server.post("/capitulos", async (req, res) => {
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

server.get("/frases/personaje/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const conn = await getConnection();
    const query = `SELECT * FROM frase_detalhada WHERE id = ?`;
    await conn.end();
    const [result] = await conn.execute(query, [id]);
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

server.get("/frases/capitulo/:id", async (req, res) => {
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
