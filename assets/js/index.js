import { Leon, Lobo, Oso, Serpiente, Aguila } from "./clases/Tipos.js";
import animalesData from "./Animales.js";

let animales = [];

const reloadTable = () => {
  const animalesTemplate = document.getElementById("Animales");
  animalesTemplate.innerHTML = "";
  animales.forEach((p, i) => {
    animalesTemplate.innerHTML += `
          <div class="px-3 pb-2">
            <div class="bg-dark text-white">
              <img
                height="200"
                src="${p.getImg()}"
                data-toggle="modal" data-target="#exampleModal"
                onclick="modalDetails('${i}')"
              />
              <div>
                <button onclick="playSound('${p.getNombre()}')" class="btn btn-secondary w-100"> <img height="30" src="assets/imgs/audio.svg" /> </button>
              </div>
            </div>
          </div>
    `;
  });
  document
    .querySelectorAll(".card-body button")
    .forEach((b) => b.addEventListener("click", activarHabiblidad));
};

window.playSound = (nombre) => {
  const animal = animales.find((a) => a.getNombre() == nombre);
  console.log(animal);
  nombre == "Leon"
    ? animal.Rugir()
    : nombre == "Lobo"
    ? animal.Aullar()
    : nombre == "Oso"
    ? animal.Gruñir()
    : nombre == "Serpiente"
    ? animal.Sisear()
    : nombre == "Aguila"
    ? animal.Chillar()
    : undefined;
};

window.modalDetails = (i) => {
  const modalBody = document.getElementsByClassName("modal-body")[0];
  const animal = animales[i];
  modalBody.innerHTML = `
    <div class="px-3 pb-2">
    <div class="card w-50 m-auto bg-dark text-white border-0">
      <img
        src="${animal.getImg()}"
        class="d-block m-auto w-100"
      />
      <div class="card-body text-center">
        <h6 class="card-text ">${animal.getEdad()}</h6>
        <h6 class="card-text m-0">Comentarios</h6>
        <hr/>
        <p>${animal.getComentarios()}</p>
      </div>
    </div>
    </div>
    `;
};

let imagenSrc;
let sonido;
document.getElementById("animal").addEventListener("change", async (e) => {
  const animalSelected = e.target.value;
  const animales = await animalesData.getData();
  const animalObject = animales.find((a) => a.name == animalSelected);
  imagenSrc = `/assets/imgs/${animalObject.imagen}`;
  sonido = animalObject.sonido;
  const preview = document.getElementById("preview");
  preview.parentElement.classList.remove("p-5");
  preview.style.backgroundImage = `url(${imagenSrc})`;
});

document.getElementById("btnRegistrar").addEventListener("click", async (e) => {
  const nombreElement = document.getElementById("animal");
  const edadElement = document.getElementById("edad");
  const comentariosElement = document.getElementById("comentarios");
  const nombre = nombreElement.value;
  const edad = edadElement.value;
  const comentarios = comentariosElement.value;
  if (nombre && edad && comentarios) {
    let animal =
      nombre == "Leon"
        ? new Leon(nombre, edad, imagenSrc, comentarios, sonido)
        : nombre == "Lobo"
        ? new Lobo(nombre, edad, imagenSrc, comentarios, sonido)
        : nombre == "Oso"
        ? new Oso(nombre, edad, imagenSrc, comentarios, sonido)
        : nombre == "Serpiente"
        ? new Serpiente(nombre, edad, imagenSrc, comentarios, sonido)
        : nombre == "Aguila"
        ? new Aguila(nombre, edad, imagenSrc, comentarios, sonido)
        : undefined;

    nombreElement.selectedIndex = 0;
    edadElement.selectedIndex = 0;
    comentariosElement.value = "";
    document.getElementById("preview").style.backgroundImage =
      "url(assets/imgs/lion.svg)";
    animales.push(animal);
    reloadTable();
  } else {
    alert("Debe llenar todos los datos del formulario");
  }
});
