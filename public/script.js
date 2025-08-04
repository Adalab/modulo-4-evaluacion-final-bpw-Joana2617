const btn = document.getElementById("btn-carregar");
const lista = document.getElementById("lista-personagens");

const list = document.getElementById("character-list");

fetch("/personajes")
  .then((res) => res.json())
  .then((data) => {
    data.simpsons.forEach((character) => {
      const item = document.createElement("li");

      // Cria estrutura inicial do card
      item.innerHTML = `
        <div class="card">
          <img src="img/${character.nombre.toLowerCase()}.png" alt="${
        character.nombre
      }" class="character-img">
          <div class="info">
            <strong>${character.nombre} ${character.apellido}</strong><br>
            Occupation: ${character.ocupacion || "Unknown"}<br>
            <span class="frase">Carregando fala...</span>
          </div>
        </div>
      `;

      list.appendChild(item);

      // Buscar a fala individual via /frases/:id
      fetch(`/frases/${character.id}`)
        .then((res) => res.json())
        .then((dataFrase) => {
          const fraseSpan = item.querySelector(".frase");
          fraseSpan.innerText = `"${dataFrase.texto || "..."}"`;
        })
        .catch((err) => {
          const fraseSpan = item.querySelector(".frase");
          fraseSpan.innerText = "(fala indisponível)";
          console.warn(`Erro ao buscar frase de ${character.nombre}:`, err);
        });
    });
  })
  .catch((err) => console.error("Erro ao carregar personagens:", err));
