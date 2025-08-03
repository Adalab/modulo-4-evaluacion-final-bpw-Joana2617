const list = document.getElementById("character-list");

const data = {
  simpsons: [
    {
      nombre: "Homer",
      apellido: "Simpson",
      ocupacion: "Nuclear Safety Inspector",
      imagen_url: "img/homer.png",
    },

    {
      nombre: "Marge",
      apellido: "Bouvier",
      ocupacion: "Homemaker",
      imagen_url: "img/marge.png",
    },

    {
      nombre: "Lisa",
      apellido: "Simpson",
      ocupacion: "Student",
      imagen_url: "img/Lisa.png",
    },
    {
      nombre: "Bart",
      apellido: "Simpson",
      ocupacion: "Student",
      imagen_url: "img/Bart.jpg",
    },

    {
      nombre: "Maggie",
      apellido: "Simpson",
      ocupacion: "Baby",
      imagen_url: "img/maggie.png",
    },
  ],
};

data.simpsons.forEach((character) => {
  const item = document.createElement("li");
  item.innerHTML = `
    <div class="card">
      <img src="${character.imagen_url}" alt="${
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
