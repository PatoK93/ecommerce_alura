import { dbServices } from "../services/dbServices.js";

//constantes y variables

let divGaleriaStarWars = document.getElementById("galeriaStarWars");
let divGaleriaConsolas = document.getElementById("galeriaConsolas");
let divGaleriaDiversos = document.getElementById("galeriaDiversos");

//funciones

//flujo

dbServices
  .listarProductos()
  .then((data) => {
    data.forEach(({ id, nombre, precio, descripcion, categoria, img }) => {
      if (categoria == "Star Wars") {
        divGaleriaStarWars.innerHTML += `
      <div class="row row-cols-12 row-cols-md-12 g-12">
          <div class="col paddingCard">
              <div class="card" style="width: 15rem">
                  <img
                  src="${img}"
                  class="card-img-top"
                  alt="Imágen ${categoria}"
              />
              <div class="card-body">
                  <h5 class="card-title">${nombre}</h5>
                  <p class="card-text">${precio}</p>
                  <a href="#" class="btn btn-primary">Ver producto</a>
              </div>
          </div>
      </div>
      `;
      }
      if (categoria == "Consolas") {
        divGaleriaConsolas.innerHTML += `
      <div class="row row-cols-12 row-cols-md-12 g-12">
          <div class="col paddingCard">
              <div class="card" style="width: 15rem">
                  <img
                  src="${img}"
                  class="card-img-top"
                  alt="Imágen ${categoria}"
              />
              <div class="card-body">
                  <h5 class="card-title">${nombre}</h5>
                  <p class="card-text">${precio}</p>
                  <a href="#" class="btn btn-primary">Ver producto</a>
              </div>
          </div>
      </div>
  `;
      }
      if (categoria == "Diversos") {
        divGaleriaDiversos.innerHTML += `
      <div class="row row-cols-12 row-cols-md-12 g-12">
          <div class="col paddingCard">
              <div class="card" style="width: 15rem">
                  <img
                  src="${img}"
                  class="card-img-top"
                  alt="Imágen ${categoria}"
              />
              <div class="card-body">
                  <h5 class="card-title">${nombre}</h5>
                  <p class="card-text">${precio}</p>
                  <a href="#" class="btn btn-primary">Ver producto</a>
              </div>
          </div>
      </div>
      `;
      }
    });
  })
  .catch((error) => {
    alert("Ocurrió un error al traer los productos");
    console.log(error);
  });
