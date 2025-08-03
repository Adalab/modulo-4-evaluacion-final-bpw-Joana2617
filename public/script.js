const btn = document.getElementById("btn-carregar");
const lista = document.getElementById("lista-personagens");

const data = {
  simpsons: [
    {
      nombre: "Homer",
      apellido: "Simpson",
      ocupacion: "Operador de usina",
      imagen_url: "img/homer.png",
    },
    {
      nombre: "Lisa",
      apellido: "Simpson",
      ocupacion: "Estudante",
      imagen_url: "img/lisa.png",
    },
    {
      nombre: "Bart",
      apellido: "Simpson",
      ocupacion: "Estudante",
      imagen_url: "img/bart.png",
    },
  ],
};

btn.addEventListener("click", () => {
  lista.innerHTML = ""; // Limpa antes de adicionar novos
  data.simpsons.forEach((personagem) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <div class="card">
        <img src="${personagem.imagen_url}" alt="${
      personagem.nombre
    }" class="personagem-img">
        <div class="info">
          <strong>${personagem.nombre} ${personagem.apellido}</strong><br>
          Ocupação: ${personagem.ocupacion || "Desconhecida"}
        </div>
      </div>
    `;
    lista.appendChild(item);
  });
});
