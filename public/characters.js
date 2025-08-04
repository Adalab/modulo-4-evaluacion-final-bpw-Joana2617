const list = document.getElementById("character-list");

fetch("/personajes")
  .then((res) => res.json())
  .then((data) => {
    data.simpsons.forEach((character) => {
      const item = document.createElement("li");
      item.innerHTML = `
        <div class="card">
          <img src="img/${character.nombre.toLowerCase()}.png" alt="${
        character.nombre
      }" class="character-img">
          <div class="info">
            <strong>${character.nombre} ${character.apellido}</strong><br>
            Occupation: ${character.ocupacion || "Unknown"}
            
          </div>
        </div>
      `;
      list.appendChild(item);
    });
  })
  .catch((err) => console.error("Erro ao carregar personagens:", err));
