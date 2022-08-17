import { dbServices } from "../services/dbServices.js";

//constantes y variables

let arrayProductos = [];
let categorias = ["StarWars", "Consolas", "Diversos"];

//elementos interactivos

let divRaiz = document.getElementById("root");

//funciones

function llenarArrayProductos() {
  dbServices
    .listarProductos()
    .then((data) => {
      data.forEach(({ id, nombre, precio, descripcion, categoria, img }) => {
        let obj = {
          id: id,
          nombre: nombre,
          precio: precio,
          descripcion: descripcion,
          categoria: categoria,
          img: img,
        };
        arrayProductos.push(obj);
      });
    })
    .catch((error) => alert("Ocurrió un error al traer los productos"));
}

function renderizadoIndex() {
  divRaiz.innerHTML = "";
  let string = "";

  categorias.forEach((cat) => {
    divRaiz.innerHTML += renderizarTituloscategorias(cat);
    let divCategoriaGaleria = document.getElementById(`galeria${cat}`);
    arrayProductos.forEach((prod) => {
      if (prod.categoria === cat) {
        string += renderizarCard(
          prod.nombre,
          prod.precio,
          prod.categoria,
          prod.img
        );
      }
    });
    divCategoriaGaleria.appendChild(string);
    divRaiz.innerHTML += divCategoriaGaleria.innerHTML;
  });
}

function renderizarTituloscategorias(categoria) {
  const titulocategoria = `
    <section>
        <div id="galeria${categoria}" class="paddingGaleria">
            <div class="paddingTituloGaleria">
                <h3 class="letraNegrita">${categoria}</h3>
            </div>
        </div>
    </section>
`;
  return titulocategoria;
}

function renderizarCard(nombre, precio, categoria, img) {
  const card = `
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
  return card;
}

//flujo

llenarArrayProductos();
renderizadoIndex();
console.log(arrayProductos);
console.log(categorias);
