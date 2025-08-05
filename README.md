# Simpsons API 🍩✨

A RESTful API built with Node.js, Express.js, and MySQL to manage the most iconic quotes from _The Simpsons_, connecting each quote to the character who said it and the episode where it appeared. Created entirely by **Joana**.

## Features

- CRUD operations on iconic phrases
- Relational database linking quotes, characters, and episodes
- SQL views for optimized logic and maintainability
- Additional endpoints for filtering quotes by character or episode
- Built with clean code practices and modular architecture

## Database Schema

**Tables:**

- `frases`:

  - `id` _(primary key)_
  - `texto` _(quote text, required)_
  - `marca_tiempo` _(timestamp in episode, optional)_
  - `descripcion` _(extra info or trivia, optional)_

- `personajes`:

  - `id` _(primary key)_
  - `nombre`, `apellido`, `ocupacion`, `descripcion`

- `capitulos`:
  - `id` _(primary key)_
  - `titulo`, `numero_episodio`, `temporada`, `fecha_emision`, `sinopsis`

**Relationships:**

- One-to-many: A character can have multiple quotes
- Many-to-many: Characters appear in multiple episodes

## Server Setup

Built with:

- Express.js
- MySQL
- Dotenv for environment variables

- `GET /frases/personaje/:id` — Quotes by character
- `GET /frases/capitulo/:id` — Quotes by episode
- `GET /personajes` & `GET /capitulos` — Full listings
- (Optional) POST, PUT, DELETE for characters and episodes

## Render

https://simpsons-joana2617.onrender.com/

## Localhost

http://localhost:3000
http://localhost:3000/characters.html
http://localhost:3000/frases
http://localhost:3000/personajes
http://localhost:3000/capitulos

Clients can consume the API by sending HTTP requests to each endpoint. All responses return relevant joined data for a smooth frontend experience.

Sample usage:

```bash
GET /frases
Response: [
  {
    "texto": "D'oh!",
    "personaje": "Homer Simpson",
    "capitulo": "Homer's Odyssey"
  },
  ...
]

```
