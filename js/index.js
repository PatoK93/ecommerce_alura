import { dbServices } from "./services/dbServices.js";

//constantes y variables

let divBtnAgregarProducto = document.getElementById("divBtnAgregarProducto");
let btnAgregarProducto = document.getElementById("btnAgregarProducto");
let btnLogin = document.getElementById("btnLogin");
let linkTodos = document.getElementById("linkTodos");
let linkStarWars = document.getElementById("linkStarWars");
let linkConsolas = document.getElementById("linkConsolas");
let linkDiversos = document.getElementById("linkDiversos");
let inputBuscar = document.getElementById("inputBuscar");
let btnBuscar = document.getElementById("btnBuscar");
let linkIndex = document.getElementById("logoIndex");

let divMain = document.getElementById("divMain");
let divProducto = document.getElementById("divProductos");
let divGaleriaStarWars = document.getElementById("galeriaStarWars");
let divGaleriaConsolas = document.getElementById("galeriaConsolas");
let divGaleriaDiversos = document.getElementById("galeriaDiversos");

let inputNyA = document.getElementById("inputNyA");
let mensajeParaEnviar = document.getElementById("mensajeParaEnviar");
let btnEnviar = document.getElementById("btnEnviar");

let esAdmin = false;

//funciones

//eventos

btnAgregarProducto.addEventListener("click", () => {
  divProducto.innerHTML = "";

  let formAgregarProducto = `
  <div class="formAgregarEditarProducto">
  <form action="">
    <h3>Agregar Nuevo Producto</h3>
    <div class="mb-4">
      <label for="urlImagenProducto" class="form-label"
        >URL de la imagen</label
      >
      <input
        type="text"
        class="form-control"
        id="urlImagenProducto"
        placeholder="Ingrese la URL de la imagen"
        required
      />
    </div>
    <div class="mb-3">
      <label for="categoriaProducto" class="form-label"
        >Categoría del producto</label
      >
      <select name="categorias" id="categoriaProducto" title="Star Wars">
      <option value="Star Wars">Star Wars</option>
      <option value="Consolas">Consolas</option>
      <option value="Diversos">Diversos</option>
    </select>
    </div>
    <div class="mb-3">
      <label for="nombreProducto" class="form-label"
        >Nombre del producto</label
      >
      <input
        type="text"
        class="form-control"
        id="nombreProducto"
        placeholder="Ingrese el nombre del producto"
        required
        maxlength="20"
      />
    </div>
    <div class="mb-3">
      <label for="precioProducto" class="form-label"
        >Precio del producto</label
      >
      <input
        type="number"
        class="form-control"
        id="precioProducto"
        placeholder="Ingrese el precio del producto"
        required
      />
    </div>
    <div class="mb-3">
      <label for="descripcionProdcuto" class="form-label"
        >Descripción del prodcuto</label
      >
      <textarea
        class="form-control"
        id="descripcionProdcuto"
        rows="5"
        cols="5"
        required
        maxlength="150"
      ></textarea>
    </div>
    <div class="col-auto">
      <button
        type="button"
        class="btn btn-primary mb-3"
        id="btnAgregarEditarProducto"
      >
        Agregar Producto
      </button>
    </div>
  </form>
</div>
  `;

  divProducto.innerHTML += formAgregarProducto;

  let urlImagen = document.getElementById("urlImagenProducto");
  let categoriaProducto = document.getElementById("categoriaProducto");
  let nombreProducto = document.getElementById("nombreProducto");
  let precioProducto = document.getElementById("precioProducto");
  let descripcionProdcuto = document.getElementById("descripcionProdcuto");
  let btnAgregarEditarProducto = document.getElementById(
    "btnAgregarEditarProducto"
  );

  btnAgregarEditarProducto.addEventListener("click", () => {
    if (
      urlImagen.value != "" &&
      categoriaProducto.value != "" &&
      nombreProducto.value != "" &&
      precioProducto.value != "" &&
      descripcionProdcuto.value != ""
    ) {
      dbServices
        .crearProducto(
          uuid.v4(),
          nombreProducto.value,
          precioProducto.value,
          descripcionProdcuto.value,
          categoriaProducto.value,
          urlImagen.value
        )
        .then()
        .catch((error) => {
          alert("Ocurrió un error al crear un nuevo producto");
          console.log(error);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tiene que llenar todos los campos para cargar un nuevo producto!",
      });
    }
  });
});

linkIndex.addEventListener("click", () => {
  if (esAdmin) {
    divProducto.innerHTML = "";
    divProducto.innerHTML += `
<section id="contenedorStarWars">
<div class="paddingTituloGaleria">
  <h3 class="letraNegrita">Stars Wars</h3>
</div>
<div class="container-fluid">
  <div id="galeriaStarWars" class="row"></div>
</div>
</section>
<section id="contenedorConsolas">
<div class="paddingTituloGaleria">
  <h3 class="letraNegrita">Consolas</h3>
</div>
<div class="container-fluid">
  <div id="galeriaConsolas" class="row"></div>
</div>
</section>
<section id="contenedorDiversos">
<div class="paddingTituloGaleria">
  <h3 class="letraNegrita">Diversos</h3>
</div>
<div class="container-fluid">
  <div id="galeriaDiversos" class="row"></div>
</div>
</section>
`;

    let divGaleriaStarWarsVolver = document.getElementById("galeriaStarWars");
    let divGaleriaConsolasVolver = document.getElementById("galeriaConsolas");
    let divGaleriaDiversosVolver = document.getElementById("galeriaDiversos");

    dbServices
      .listarProductos()
      .then((data) => {
        data.forEach(({ id, nombre, precio, descripcion, categoria, img }) => {
          if (categoria == "Star Wars") {
            divGaleriaStarWarsVolver.innerHTML += `
    <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
        <div class="card" style="width: 15rem">
            <img
            src="${img}"
            class="card-img-top"
            alt="Imágen ${categoria}"
        />
        <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">$${precio}</p>
            <div class="galeriaFlex">
            <a class="btn btn-primary verDetalle tamanioEditarEliminar" id=${id}>Ver</a>
            <a class="btn btn-primary eliminarProducto tamanioEditarEliminar" id=${id}>Eliminar</a>
            <a class="btn btn-primary editarProducto tamanioEditarEliminar" id=${id}>Editar</a>
          </div>
        </div>
    </div>
`;
          }
          if (categoria == "Consolas") {
            divGaleriaConsolasVolver.innerHTML += `
<div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
    <div class="col paddingCard">
        <div class="card" style="width: 15rem">
            <img
            src="${img}"
            class="card-img-top"
            alt="Imágen ${categoria}"
        />
        <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">$${precio}</p>
            <div class="galeriaFlex">
            <a class="btn btn-primary verDetalle tamanioEditarEliminar" id=${id}>Ver</a>
            <a class="btn btn-primary eliminarProducto tamanioEditarEliminar" id=${id}>Eliminar</a>
            <a class="btn btn-primary editarProducto tamanioEditarEliminar" id=${id}>Editar</a>
          </div>
        </div>
    </div>
</div>
`;
          }
          if (categoria == "Diversos") {
            divGaleriaDiversosVolver.innerHTML += `
<div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
    <div class="col paddingCard">
        <div class="card" style="width: 15rem">
            <img
            src="${img}"
            class="card-img-top"
            alt="Imágen ${categoria}"
        />
        <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">$${precio}</p>
            <div class="galeriaFlex">
            <a class="btn btn-primary verDetalle tamanioEditarEliminar" id=${id}>Ver</a>
            <a class="btn btn-primary eliminarProducto tamanioEditarEliminar" id=${id}>Eliminar</a>
            <a class="btn btn-primary editarProducto tamanioEditarEliminar" id=${id}>Editar</a>
          </div>
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
  } else {
    divProducto.innerHTML = "";

    divProducto.innerHTML += `
      <section id="contenedorStarWars">
      <div class="paddingTituloGaleria">
        <h3 class="letraNegrita">Stars Wars</h3>
      </div>
      <div class="container-fluid">
        <div id="galeriaStarWars" class="row"></div>
      </div>
    </section>
    <section id="contenedorConsolas">
      <div class="paddingTituloGaleria">
        <h3 class="letraNegrita">Consolas</h3>
      </div>
      <div class="container-fluid">
        <div id="galeriaConsolas" class="row"></div>
      </div>
    </section>
    <section id="contenedorDiversos">
      <div class="paddingTituloGaleria">
        <h3 class="letraNegrita">Diversos</h3>
      </div>
      <div class="container-fluid">
        <div id="galeriaDiversos" class="row"></div>
      </div>
    </section>
    `;

    let divGaleriaStarWarsVolver = document.getElementById("galeriaStarWars");
    let divGaleriaConsolasVolver = document.getElementById("galeriaConsolas");
    let divGaleriaDiversosVolver = document.getElementById("galeriaDiversos");

    dbServices
      .listarProductos()
      .then((data) => {
        data.forEach(({ id, nombre, precio, descripcion, categoria, img }) => {
          if (categoria == "Star Wars") {
            divGaleriaStarWarsVolver.innerHTML += `
          <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
              <div class="card" style="width: 15rem">
                  <img
                  src="${img}"
                  class="card-img-top"
                  alt="Imágen ${categoria}"
              />
              <div class="card-body">
                  <h5 class="card-title">${nombre}</h5>
                  <p class="card-text">$${precio}</p>
                  <a class="btn btn-primary verDetalle" id=${id}>Ver Producto</a>
              </div>
          </div>
      `;
          }
          if (categoria == "Consolas") {
            divGaleriaConsolasVolver.innerHTML += `
      <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
          <div class="col paddingCard">
              <div class="card" style="width: 15rem">
                  <img
                  src="${img}"
                  class="card-img-top"
                  alt="Imágen ${categoria}"
              />
              <div class="card-body">
                  <h5 class="card-title">${nombre}</h5>
                  <p class="card-text">$${precio}</p>
                  <a class="btn btn-primary verDetalle" id=${id}>Ver Producto</a>
              </div>
          </div>
      </div>
    `;
          }
          if (categoria == "Diversos") {
            divGaleriaDiversosVolver.innerHTML += `
      <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
          <div class="col paddingCard">
              <div class="card" style="width: 15rem">
                  <img
                  src="${img}"
                  class="card-img-top"
                  alt="Imágen ${categoria}"
              />
              <div class="card-body">
                  <h5 class="card-title">${nombre}</h5>
                  <p class="card-text">$${precio}</p>
                  <a class="btn btn-primary verDetalle" id=${id}>Ver Producto</a>
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
  }
});

linkTodos.addEventListener("click", () => {
  if (esAdmin) {
    divProducto.innerHTML = "";
    divProducto.innerHTML += `
<section id="contenedorStarWars">
<div class="paddingTituloGaleria">
  <h3 class="letraNegrita">Stars Wars</h3>
</div>
<div class="container-fluid">
  <div id="galeriaStarWars" class="row"></div>
</div>
</section>
<section id="contenedorConsolas">
<div class="paddingTituloGaleria">
  <h3 class="letraNegrita">Consolas</h3>
</div>
<div class="container-fluid">
  <div id="galeriaConsolas" class="row"></div>
</div>
</section>
<section id="contenedorDiversos">
<div class="paddingTituloGaleria">
  <h3 class="letraNegrita">Diversos</h3>
</div>
<div class="container-fluid">
  <div id="galeriaDiversos" class="row"></div>
</div>
</section>
`;

    let divGaleriaStarWarsVolver = document.getElementById("galeriaStarWars");
    let divGaleriaConsolasVolver = document.getElementById("galeriaConsolas");
    let divGaleriaDiversosVolver = document.getElementById("galeriaDiversos");

    dbServices
      .listarProductos()
      .then((data) => {
        data.forEach(({ id, nombre, precio, descripcion, categoria, img }) => {
          if (categoria == "Star Wars") {
            divGaleriaStarWarsVolver.innerHTML += `
    <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
        <div class="card" style="width: 15rem">
            <img
            src="${img}"
            class="card-img-top"
            alt="Imágen ${categoria}"
        />
        <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">$${precio}</p>
            <div class="galeriaFlex">
            <a class="btn btn-primary verDetalle tamanioEditarEliminar" id=${id}>Ver</a>
            <a class="btn btn-primary eliminarProducto tamanioEditarEliminar" id=${id}>Eliminar</a>
            <a class="btn btn-primary editarProducto tamanioEditarEliminar" id=${id}>Editar</a>
          </div>
        </div>
    </div>
`;
          }
          if (categoria == "Consolas") {
            divGaleriaConsolasVolver.innerHTML += `
<div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
    <div class="col paddingCard">
        <div class="card" style="width: 15rem">
            <img
            src="${img}"
            class="card-img-top"
            alt="Imágen ${categoria}"
        />
        <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">$${precio}</p>
            <div class="galeriaFlex">
            <a class="btn btn-primary verDetalle tamanioEditarEliminar" id=${id}>Ver</a>
            <a class="btn btn-primary eliminarProducto tamanioEditarEliminar" id=${id}>Eliminar</a>
            <a class="btn btn-primary editarProducto tamanioEditarEliminar" id=${id}>Editar</a>
          </div>
        </div>
    </div>
</div>
`;
          }
          if (categoria == "Diversos") {
            divGaleriaDiversosVolver.innerHTML += `
<div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
    <div class="col paddingCard">
        <div class="card" style="width: 15rem">
            <img
            src="${img}"
            class="card-img-top"
            alt="Imágen ${categoria}"
        />
        <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">$${precio}</p>
            <div class="galeriaFlex">
            <a class="btn btn-primary verDetalle tamanioEditarEliminar" id=${id}>Ver</a>
            <a class="btn btn-primary eliminarProducto tamanioEditarEliminar" id=${id}>Eliminar</a>
            <a class="btn btn-primary editarProducto tamanioEditarEliminar" id=${id}>Editar</a>
          </div>
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
  } else {
    divProducto.innerHTML = "";

    let contenedor = `
    <section id="contenedorStarWars">
      <div class="paddingTituloGaleria">
        <h3 class="letraNegrita">Stars Wars</h3>
      </div>
      <div class="container-fluid">
        <div id="galeriaStarWars" class="row"></div>
      </div>
    </section>;
    <section id="contenedorConsolas">
    <div class="paddingTituloGaleria">
      <h3 class="letraNegrita">Consolas</h3>
    </div>
    <div class="container-fluid">
      <div id="galeriaConsolas" class="row"></div>
    </div>
  </section>;
  <section id="contenedorDiversos">
  <div class="paddingTituloGaleria">
    <h3 class="letraNegrita">Diversos</h3>
  </div>
  <div class="container-fluid">
    <div id="galeriaDiversos" class="row"></div>
  </div>
  </section>
  `;

    divProducto.innerHTML = contenedor;
    let divGaleriaStarWarsFiltrado = document.getElementById("galeriaStarWars");
    let divGaleriaConsolasFiltrado = document.getElementById("galeriaConsolas");
    let divGaleriaDiversosFiltrado = document.getElementById("galeriaDiversos");

    dbServices
      .listarProductos()
      .then((data) => {
        data.forEach(({ id, nombre, precio, descripcion, categoria, img }) => {
          if (categoria == "Star Wars") {
            divGaleriaStarWarsFiltrado.innerHTML += `
            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
                <div class="card" style="width: 15rem">
                    <img
                    src="${img}"
                    class="card-img-top"
                    alt="Imágen ${categoria}"
                />
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">$${precio}</p>
                    <a href="#" class="btn btn-primary verDetalle" id="${id}">Ver producto</a>
                </div>
            </div>
        `;
          }
          if (categoria == "Consolas") {
            divGaleriaConsolasFiltrado.innerHTML += `
        <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
            <div class="col paddingCard">
                <div class="card" style="width: 15rem">
                    <img
                    src="${img}"
                    class="card-img-top"
                    alt="Imágen ${categoria}"
                />
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">$${precio}</p>
                    <a href="#" class="btn btn-primary verDetalle" id="${id}">Ver producto</a>
                </div>
            </div>
        </div>
    `;
          }
          if (categoria == "Diversos") {
            divGaleriaDiversosFiltrado.innerHTML += `
        <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
            <div class="col paddingCard">
                <div class="card" style="width: 15rem">
                    <img
                    src="${img}"
                    class="card-img-top"
                    alt="Imágen ${categoria}"
                />
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">$${precio}</p>
                    <a href="#" class="btn btn-primary verDetalle" id="${id}">Ver producto</a>
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
  }
});

linkStarWars.addEventListener("click", () => {
  if (esAdmin) {
    divProducto.innerHTML = "";

    let contenedor = `
    <section id="contenedorStarWars">
      <div class="paddingTituloGaleria">
        <h3 class="letraNegrita">Stars Wars</h3>
      </div>
      <div class="container-fluid">
        <div id="galeriaStarWars" class="row"></div>
      </div>
    </section>
  `;

    divProducto.innerHTML = contenedor;
    let divGaleriaStarWarsFiltrado = document.getElementById("galeriaStarWars");

    dbServices
      .listarProductos()
      .then((data) => {
        data.forEach(({ id, nombre, precio, descripcion, categoria, img }) => {
          if (categoria == "Star Wars") {
            divGaleriaStarWarsFiltrado.innerHTML += `
            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
                <div class="card" style="width: 15rem">
                    <img
                    src="${img}"
                    class="card-img-top"
                    alt="Imágen ${categoria}"
                />
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">$${precio}</p>
                    <div class="galeriaFlex">
                      <a class="btn btn-primary verDetalle tamanioEditarEliminar" id=${id}>Ver</a>
                      <a class="btn btn-primary eliminarProducto tamanioEditarEliminar" id=${id}>Eliminar</a>
                      <a class="btn btn-primary editarProducto tamanioEditarEliminar" id=${id}>Editar</a>
                    </div>
                </div>
            </div>
        `;
          }
        });
      })
      .catch((error) => {
        alert("Ocurrió un error al traer los productos de Star Wars");
        console.log(error);
      });
  } else {
    divProducto.innerHTML = "";

    let contenedor = `
    <section id="contenedorStarWars">
      <div class="paddingTituloGaleria">
        <h3 class="letraNegrita">Stars Wars</h3>
      </div>
      <div class="container-fluid">
        <div id="galeriaStarWars" class="row"></div>
      </div>
    </section>
  `;

    divProducto.innerHTML = contenedor;
    let divGaleriaStarWarsFiltrado = document.getElementById("galeriaStarWars");

    dbServices
      .listarProductos()
      .then((data) => {
        data.forEach(({ id, nombre, precio, descripcion, categoria, img }) => {
          if (categoria == "Star Wars") {
            divGaleriaStarWarsFiltrado.innerHTML += `
            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
                <div class="card" style="width: 15rem">
                    <img
                    src="${img}"
                    class="card-img-top"
                    alt="Imágen ${categoria}"
                />
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">$${precio}</p>
                    <a href="#" class="btn btn-primary verDetalle" id="${id}">Ver producto</a>
                </div>
            </div>
        `;
          }
        });
      })
      .catch((error) => {
        alert("Ocurrió un error al traer los productos de Star Wars");
        console.log(error);
      });
  }
});

linkConsolas.addEventListener("click", () => {
  if (esAdmin) {
    divProducto.innerHTML = "";

    let contenedor = `
    <section id="contenedorConsolas paddingGaleria">
    <div class="paddingTituloGaleria">
      <h3 class="letraNegrita">Consolas</h3>
    </div>
    <div class="container-fluid">
      <div id="galeriaConsolas" class="row"></div>
    </div>
  </section>
  `;

    divProducto.innerHTML = contenedor;
    let divGaleriaConsolasFiltrado = document.getElementById("galeriaConsolas");

    dbServices
      .listarProductos()
      .then((data) => {
        data.forEach(({ id, nombre, precio, descripcion, categoria, img }) => {
          if (categoria == "Consolas") {
            divGaleriaConsolasFiltrado.innerHTML += `
            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
                <div class="card" style="width: 15rem">
                    <img
                    src="${img}"
                    class="card-img-top"
                    alt="Imágen ${categoria}"
                />
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">$${precio}</p>
                    <div class="galeriaFlex">
                      <a class="btn btn-primary verDetalle tamanioEditarEliminar" id=${id}>Ver</a>
                      <a class="btn btn-primary eliminarProducto tamanioEditarEliminar" id=${id}>Eliminar</a>
                      <a class="btn btn-primary editarProducto tamanioEditarEliminar" id=${id}>Editar</a>
                    </div>
                </div>
            </div>
        `;
          }
        });
      })
      .catch((error) => {
        alert("Ocurrió un error al traer los productos de Consolas");
        console.log(error);
      });
  } else {
    divProducto.innerHTML = "";

    let contenedor = `
    <section id="contenedorConsolas paddingGaleria">
    <div class="paddingTituloGaleria">
      <h3 class="letraNegrita">Consolas</h3>
    </div>
    <div class="container-fluid">
      <div id="galeriaConsolas" class="row"></div>
    </div>
  </section>
  `;

    divProducto.innerHTML = contenedor;
    let divGaleriaConsolasFiltrado = document.getElementById("galeriaConsolas");

    dbServices
      .listarProductos()
      .then((data) => {
        data.forEach(({ id, nombre, precio, descripcion, categoria, img }) => {
          if (categoria == "Consolas") {
            divGaleriaConsolasFiltrado.innerHTML += `
            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
                <div class="card" style="width: 15rem">
                    <img
                    src="${img}"
                    class="card-img-top"
                    alt="Imágen ${categoria}"
                />
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">$${precio}</p>
                    <a href="#" class="btn btn-primary verDetalle" id="${id}">Ver producto</a>
                </div>
            </div>
        `;
          }
        });
      })
      .catch((error) => {
        alert("Ocurrió un error al traer los productos de Consolas");
        console.log(error);
      });
  }
});

linkDiversos.addEventListener("click", () => {
  if (esAdmin) {
    divProducto.innerHTML = "";

    let contenedor = `
    <section id="contenedorDiversos">
    <div class="paddingTituloGaleria">
      <h3 class="letraNegrita">Diversos</h3>
    </div>
    <div class="container-fluid">
      <div id="galeriaDiversos" class="row"></div>
    </div>
  </section>
  `;

    divProducto.innerHTML = contenedor;
    let divGaleriaDiversosFiltrado = document.getElementById("galeriaDiversos");

    dbServices
      .listarProductos()
      .then((data) => {
        data.forEach(({ id, nombre, precio, descripcion, categoria, img }) => {
          if (categoria == "Diversos") {
            divGaleriaDiversosFiltrado.innerHTML += `
            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
                <div class="card" style="width: 15rem">
                    <img
                    src="${img}"
                    class="card-img-top"
                    alt="Imágen ${categoria}"
                />
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">$${precio}</p>
                    <div class="galeriaFlex">
                      <a class="btn btn-primary verDetalle tamanioEditarEliminar" id=${id}>Ver</a>
                      <a class="btn btn-primary eliminarProducto tamanioEditarEliminar" id=${id}>Eliminar</a>
                      <a class="btn btn-primary editarProducto tamanioEditarEliminar" id=${id}>Editar</a>
                    </div>
                </div>
            </div>
        `;
          }
        });
      })
      .catch((error) => {
        alert("Ocurrió un error al traer los productos de Diversos");
        console.log(error);
      });
  } else {
    divProducto.innerHTML = "";

    let contenedor = `
    <section id="contenedorDiversos">
    <div class="paddingTituloGaleria">
      <h3 class="letraNegrita">Diversos</h3>
    </div>
    <div class="container-fluid">
      <div id="galeriaDiversos" class="row"></div>
    </div>
  </section>
  `;

    divProducto.innerHTML = contenedor;
    let divGaleriaDiversosFiltrado = document.getElementById("galeriaDiversos");

    dbServices
      .listarProductos()
      .then((data) => {
        data.forEach(({ id, nombre, precio, descripcion, categoria, img }) => {
          if (categoria == "Diversos") {
            divGaleriaDiversosFiltrado.innerHTML += `
            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
                <div class="card" style="width: 15rem">
                    <img
                    src="${img}"
                    class="card-img-top"
                    alt="Imágen ${categoria}"
                />
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">$${precio}</p>
                    <a href="#" class="btn btn-primary verDetalle" id="${id}">Ver producto</a>
                </div>
            </div>
        `;
          }
        });
      })
      .catch((error) => {
        alert("Ocurrió un error al traer los productos de Diversos");
        console.log(error);
      });
  }
});

btnBuscar.addEventListener("click", () => {
  if (esAdmin) {
    let existenArticulos = false;

    dbServices
      .listarProductos()
      .then((data) => {
        data.forEach(({ id, nombre, precio, descripcion, categoria, img }) => {
          if (nombre.toLowerCase().includes(inputBuscar.value.toLowerCase())) {
            existenArticulos = true;
          }
        });

        if (existenArticulos) {
          divProducto.innerHTML = "";

          let contenedor = `
          <section id="contenedorEncontrados">
          <div class="paddingTituloGaleria">
            <h3 class="letraNegrita">Productos Encontrados</h3>
          </div>
          <div class="container-fluid">
            <div id="galeriaEncontrados" class="row"></div>
          </div>
        </section>
        `;

          divProducto.innerHTML = contenedor;
          let divGaleriaEncontrados =
            document.getElementById("galeriaEncontrados");

          data.forEach(
            ({ id, nombre, precio, descripcion, categoria, img }) => {
              if (
                nombre.toLowerCase().includes(inputBuscar.value.toLowerCase())
              ) {
                divGaleriaEncontrados.innerHTML += `
            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
                <div class="card" style="width: 15rem">
                    <img
                    src="${img}"
                    class="card-img-top"
                    alt="Imágen ${categoria}"
                />
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">$${precio}</p>
                    <div class="galeriaFlex">
                      <a class="btn btn-primary verDetalle tamanioEditarEliminar" id=${id}>Ver</a>
                      <a class="btn btn-primary eliminarProducto tamanioEditarEliminar" id=${id}>Eliminar</a>
                      <a class="btn btn-primary editarProducto tamanioEditarEliminar" id=${id}>Editar</a>
                    </div>
                </div>
            </div>
        `;
              }
            }
          );
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se encontraron artículos para la búsqueda solicitada!",
          });
        }
      })
      .catch((error) => {
        alert("Ocurrió un error al buscar los productos solicitados");
        console.log(error);
      });
  } else {
    let existenArticulos = false;

    dbServices
      .listarProductos()
      .then((data) => {
        data.forEach(({ id, nombre, precio, descripcion, categoria, img }) => {
          if (nombre.toLowerCase().includes(inputBuscar.value.toLowerCase())) {
            existenArticulos = true;
          }
        });

        if (existenArticulos) {
          divProducto.innerHTML = "";

          let contenedor = `
          <section id="contenedorEncontrados">
          <div class="paddingTituloGaleria">
            <h3 class="letraNegrita">Productos Encontrados</h3>
          </div>
          <div class="container-fluid">
            <div id="galeriaEncontrados" class="row"></div>
          </div>
        </section>
        `;

          divProducto.innerHTML = contenedor;
          let divGaleriaEncontrados =
            document.getElementById("galeriaEncontrados");

          data.forEach(
            ({ id, nombre, precio, descripcion, categoria, img }) => {
              if (
                nombre.toLowerCase().includes(inputBuscar.value.toLowerCase())
              ) {
                divGaleriaEncontrados.innerHTML += `
            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
                <div class="card" style="width: 15rem">
                    <img
                    src="${img}"
                    class="card-img-top"
                    alt="Imágen ${categoria}"
                />
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">$${precio}</p>
                    <a href="#" class="btn btn-primary verDetalle" id="${id}">Ver producto</a>
                </div>
            </div>
        `;
              }
            }
          );
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se encontraron artículos para la búsqueda solicitada!",
          });
        }
      })
      .catch((error) => {
        alert("Ocurrió un error al buscar los productos solicitados");
        console.log(error);
      });
  }
});

btnEnviar.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputNyA.value == "" || mensajeParaEnviar.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Debe llenar los campos de forma correcta!",
    });
  } else {
    inputNyA.value = "";
    mensajeParaEnviar.value = "";
  }
});

btnLogin.addEventListener("click", () => {
  divProducto.innerHTML = "";

  divProducto.innerHTML = `
  <form action="" class="formLogin">
  <h2>Iniciar Sesión</h2>
  <!-- Email input -->
  <div class="form-outline mb-4">
    <label class="form-label" for="email"
      >Escriba su correo electrónico</label
    >
    <input
      type="email"
      id="email"
      class="form-control inputWidth"
      required
    />
  </div>
  <!-- Password input -->
  <div class="form-outline mb-4">
    <label class="form-label" for="password">Escriba su contraseña</label>
    <input
      type="password"
      id="password"
      class="form-control inputWidth"
      required
    />
  </div>
  <!-- Submit button -->
  <button type="button" class="btn btn-primary btn-block mb-4" id="btnAdmin">
    Entrar
  </button>
</form>
`;

  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let btnAdmin = document.getElementById("btnAdmin");

  btnAdmin.addEventListener("click", () => {
    if (email.value == "admin@admin.com" && password.value == "admin") {
      divBtnAgregarProducto.classList.remove("divBtnAgregarProducto");
      esAdmin = true;
      btnLogin.innerText = "Logout";
      btnLogin.setAttribute("id", "btnLogout");
      btnLogin.classList.remove("btn-primary");
      btnLogin.classList.add("btn-danger");
      divProducto.innerHTML = "";

      let btnLogout = document.getElementById("btnLogout");

      divProducto.innerHTML += `
        <section id="contenedorStarWars">
        <div class="paddingTituloGaleria">
          <h3 class="letraNegrita">Stars Wars</h3>
        </div>
        <div class="container-fluid">
          <div id="galeriaStarWars" class="row"></div>
        </div>
      </section>
      <section id="contenedorConsolas">
        <div class="paddingTituloGaleria">
          <h3 class="letraNegrita">Consolas</h3>
        </div>
        <div class="container-fluid">
          <div id="galeriaConsolas" class="row"></div>
        </div>
      </section>
      <section id="contenedorDiversos">
        <div class="paddingTituloGaleria">
          <h3 class="letraNegrita">Diversos</h3>
        </div>
        <div class="container-fluid">
          <div id="galeriaDiversos" class="row"></div>
        </div>
      </section>
      `;

      let divGaleriaStarWarsVolver = document.getElementById("galeriaStarWars");
      let divGaleriaConsolasVolver = document.getElementById("galeriaConsolas");
      let divGaleriaDiversosVolver = document.getElementById("galeriaDiversos");

      dbServices
        .listarProductos()
        .then((data) => {
          data.forEach(
            ({ id, nombre, precio, descripcion, categoria, img }) => {
              if (categoria == "Star Wars") {
                divGaleriaStarWarsVolver.innerHTML += `
            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
                <div class="card" style="width: 15rem">
                    <img
                    src="${img}"
                    class="card-img-top"
                    alt="Imágen ${categoria}"
                />
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">$${precio}</p>
                    <div class="galeriaFlex">
                      <a class="btn btn-primary verDetalle tamanioEditarEliminar" id=${id}>Ver</a>
                      <a class="btn btn-primary eliminarProducto tamanioEditarEliminar" id=${id}>Eliminar</a>
                      <a class="btn btn-primary editarProducto tamanioEditarEliminar" id=${id}>Editar</a>
                    </div>
                </div>
            </div>
        `;
              }
              if (categoria == "Consolas") {
                divGaleriaConsolasVolver.innerHTML += `
        <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
            <div class="col paddingCard">
                <div class="card" style="width: 15rem">
                    <img
                    src="${img}"
                    class="card-img-top"
                    alt="Imágen ${categoria}"
                />
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">$${precio}</p>
                    <div class="galeriaFlex">
                      <a class="btn btn-primary verDetalle tamanioEditarEliminar" id=${id}>Ver</a>
                      <a class="btn btn-primary eliminarProducto tamanioEditarEliminar" id=${id}>Eliminar</a>
                      <a class="btn btn-primary editarProducto tamanioEditarEliminar" id=${id}>Editar</a>
                    </div>
                </div>
            </div>
        </div>
      `;
              }
              if (categoria == "Diversos") {
                divGaleriaDiversosVolver.innerHTML += `
        <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
            <div class="col paddingCard">
                <div class="card" style="width: 15rem">
                    <img
                    src="${img}"
                    class="card-img-top"
                    alt="Imágen ${categoria}"
                />
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">$${precio}</p>
                    <div class="galeriaFlex">
                      <a class="btn btn-primary verDetalle tamanioEditarEliminar" id=${id}>Ver</a>
                      <a class="btn btn-primary eliminarProducto tamanioEditarEliminar" id=${id}>Eliminar</a>
                      <a class="btn btn-primary editarProducto tamanioEditarEliminar" id=${id}>Editar</a>
                    </div>
                </div>
            </div>
        </div>
        `;
              }
            }
          );
        })
        .catch((error) => {
          alert("Ocurrió un error al traer los productos");
          console.log(error);
        });

      btnLogout.addEventListener("click", () => {
        divBtnAgregarProducto.classList.add("divBtnAgregarProducto");
        esAdmin = false;
        btnLogin.innerText = "Login";
        btnLogin.classList.remove("btn-danger");
        btnLogin.classList.add("btn-primary");
        btnLogin.setAttribute("id", "btnLogin");
        divProducto.innerHTML = "";

        divProducto.innerHTML += `
        <section id="contenedorStarWars">
        <div class="paddingTituloGaleria">
          <h3 class="letraNegrita">Stars Wars</h3>
        </div>
        <div class="container-fluid">
          <div id="galeriaStarWars" class="row"></div>
        </div>
      </section>
      <section id="contenedorConsolas">
        <div class="paddingTituloGaleria">
          <h3 class="letraNegrita">Consolas</h3>
        </div>
        <div class="container-fluid">
          <div id="galeriaConsolas" class="row"></div>
        </div>
      </section>
      <section id="contenedorDiversos">
        <div class="paddingTituloGaleria">
          <h3 class="letraNegrita">Diversos</h3>
        </div>
        <div class="container-fluid">
          <div id="galeriaDiversos" class="row"></div>
        </div>
      </section>
      `;

        let divGaleriaStarWarsVolver =
          document.getElementById("galeriaStarWars");
        let divGaleriaConsolasVolver =
          document.getElementById("galeriaConsolas");
        let divGaleriaDiversosVolver =
          document.getElementById("galeriaDiversos");

        dbServices
          .listarProductos()
          .then((data) => {
            data.forEach(
              ({ id, nombre, precio, descripcion, categoria, img }) => {
                if (categoria == "Star Wars") {
                  divGaleriaStarWarsVolver.innerHTML += `
            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
                <div class="card" style="width: 15rem">
                    <img
                    src="${img}"
                    class="card-img-top"
                    alt="Imágen ${categoria}"
                />
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">$${precio}</p>
                    <a class="btn btn-primary verDetalle" id=${id}>Ver producto</a>
                </div>
            </div>
        `;
                }
                if (categoria == "Consolas") {
                  divGaleriaConsolasVolver.innerHTML += `
        <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
            <div class="col paddingCard">
                <div class="card" style="width: 15rem">
                    <img
                    src="${img}"
                    class="card-img-top"
                    alt="Imágen ${categoria}"
                />
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">$${precio}</p>
                    <a class="btn btn-primary verDetalle" id="${id}">Ver producto</a>
                </div>
            </div>
        </div>
      `;
                }
                if (categoria == "Diversos") {
                  divGaleriaDiversosVolver.innerHTML += `
        <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
            <div class="col paddingCard">
                <div class="card" style="width: 15rem">
                    <img
                    src="${img}"
                    class="card-img-top"
                    alt="Imágen ${categoria}"
                />
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">$${precio}</p>
                    <a class="btn btn-primary verDetalle" id="${id}">Ver producto</a>
                </div>
            </div>
        </div>
        `;
                }
              }
            );
          })
          .catch((error) => {
            alert("Ocurrió un error al traer los productos");
            console.log(error);
          });
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Credenciales incorrectas!",
      });
    }
  });
});

divProducto.addEventListener("click", (e) => {
  if (e.target.classList.contains("verDetalle")) {
    let id = e.target.getAttribute("id");
    divProducto.innerHTML = "";
    dbServices
      .detalleProducto(id)
      .then((data) => {
        divProducto.innerHTML += `
            <div class="card mb-3" style="max-width: 2500px">
            <div class="row g-0 centradoVerticalDetalle">
              <div class="col-md-6 expandirFotoDetalle">
                <img
                  src="${data.img}"
                  class="img-fluid rounded-start"
                  alt="${data.nombre}"
                />
              </div>
              <div class="col-md-4">
                <div class="card-body">
                  <h5 class="card-title">${data.nombre}</h5>
                  <p class="card-text">${data.descripcion}</p>
                  <p class="card-text">
                    <small>$${data.precio}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="btnVolverCentrado">
          <a class="btn btn-primary btnVolverIndex" id="btnVolverIndex">Volver</a>
          </div>
        `;

        divProducto.innerHTML += `
        <div class="container-fluid">
          <div class="row" id="productosSimilares">
            <div class="paddingTituloGaleria">
              <h3>Productos Similares</h3>
            </div>
          </div>
        </div>
        `;

        let divProductosSimilares =
          document.getElementById("productosSimilares");

        dbServices
          .listarProductos()
          .then((dataSec) => {
            dataSec.forEach(
              ({ id, nombre, precio, descripcion, categoria, img }) => {
                if (data.categoria === categoria) {
                  divProductosSimilares.innerHTML += `
                  <div
                    class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex"
                  >
                    <div class="card" style="width: 15rem">
                      <img
                        src="${img}"
                        class="card-img-top"
                        alt="${nombre}"
                      />
                      <div class="card-body">
                        <h5 class="card-title">${nombre}</h5>
                        <p class="card-text">${descripcion}</p>
                        <a class="btn btn-primary verDetalle" id="${id}">Ver Producto</a>
                      </div>
                    </div>
                  </div>
                `;
                }
              }
            );
          })
          .catch((error) => {
            alert(
              "Ocurrió un error al traer los productos similares al elegido"
            );
            console.log(error);
          });
      })
      .catch((error) => {
        alert("Ocurrió un error al traer el detalle de este producto");
        console.log(error);
      });
  }
});

divProducto.addEventListener("click", (e) => {
  if (e.target.classList.contains("btnVolverIndex")) {
    if (esAdmin) {
      divProducto.innerHTML = "";
      divProducto.innerHTML += `
    <section id="contenedorStarWars">
    <div class="paddingTituloGaleria">
      <h3 class="letraNegrita">Stars Wars</h3>
    </div>
    <div class="container-fluid">
      <div id="galeriaStarWars" class="row"></div>
    </div>
  </section>
  <section id="contenedorConsolas">
    <div class="paddingTituloGaleria">
      <h3 class="letraNegrita">Consolas</h3>
    </div>
    <div class="container-fluid">
      <div id="galeriaConsolas" class="row"></div>
    </div>
  </section>
  <section id="contenedorDiversos">
    <div class="paddingTituloGaleria">
      <h3 class="letraNegrita">Diversos</h3>
    </div>
    <div class="container-fluid">
      <div id="galeriaDiversos" class="row"></div>
    </div>
  </section>
  `;

      let divGaleriaStarWarsVolver = document.getElementById("galeriaStarWars");
      let divGaleriaConsolasVolver = document.getElementById("galeriaConsolas");
      let divGaleriaDiversosVolver = document.getElementById("galeriaDiversos");

      dbServices
        .listarProductos()
        .then((data) => {
          data.forEach(
            ({ id, nombre, precio, descripcion, categoria, img }) => {
              if (categoria == "Star Wars") {
                divGaleriaStarWarsVolver.innerHTML += `
        <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
            <div class="card" style="width: 15rem">
                <img
                src="${img}"
                class="card-img-top"
                alt="Imágen ${categoria}"
            />
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">$${precio}</p>
                <div class="galeriaFlex">
                <a class="btn btn-primary verDetalle tamanioEditarEliminar" id=${id}>Ver</a>
                <a class="btn btn-primary eliminarProducto tamanioEditarEliminar" id=${id}>Eliminar</a>
                <a class="btn btn-primary editarProducto tamanioEditarEliminar" id=${id}>Editar</a>
              </div>
            </div>
        </div>
    `;
              }
              if (categoria == "Consolas") {
                divGaleriaConsolasVolver.innerHTML += `
    <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
        <div class="col paddingCard">
            <div class="card" style="width: 15rem">
                <img
                src="${img}"
                class="card-img-top"
                alt="Imágen ${categoria}"
            />
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">$${precio}</p>
                <div class="galeriaFlex">
                <a class="btn btn-primary verDetalle tamanioEditarEliminar" id=${id}>Ver</a>
                <a class="btn btn-primary eliminarProducto tamanioEditarEliminar" id=${id}>Eliminar</a>
                <a class="btn btn-primary editarProducto tamanioEditarEliminar" id=${id}>Editar</a>
              </div>
            </div>
        </div>
    </div>
  `;
              }
              if (categoria == "Diversos") {
                divGaleriaDiversosVolver.innerHTML += `
    <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
        <div class="col paddingCard">
            <div class="card" style="width: 15rem">
                <img
                src="${img}"
                class="card-img-top"
                alt="Imágen ${categoria}"
            />
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">$${precio}</p>
                <div class="galeriaFlex">
                <a class="btn btn-primary verDetalle tamanioEditarEliminar" id=${id}>Ver</a>
                <a class="btn btn-primary eliminarProducto tamanioEditarEliminar" id=${id}>Eliminar</a>
                <a class="btn btn-primary editarProducto tamanioEditarEliminar" id=${id}>Editar</a>
              </div>
            </div>
        </div>
    </div>
    `;
              }
            }
          );
        })
        .catch((error) => {
          alert("Ocurrió un error al traer los productos");
          console.log(error);
        });
    } else {
      divProducto.innerHTML = "";
      divProducto.innerHTML += `
    <section id="contenedorStarWars">
    <div class="paddingTituloGaleria">
      <h3 class="letraNegrita">Stars Wars</h3>
    </div>
    <div class="container-fluid">
      <div id="galeriaStarWars" class="row"></div>
    </div>
  </section>
  <section id="contenedorConsolas">
    <div class="paddingTituloGaleria">
      <h3 class="letraNegrita">Consolas</h3>
    </div>
    <div class="container-fluid">
      <div id="galeriaConsolas" class="row"></div>
    </div>
  </section>
  <section id="contenedorDiversos">
    <div class="paddingTituloGaleria">
      <h3 class="letraNegrita">Diversos</h3>
    </div>
    <div class="container-fluid">
      <div id="galeriaDiversos" class="row"></div>
    </div>
  </section>
  `;

      let divGaleriaStarWarsVolver = document.getElementById("galeriaStarWars");
      let divGaleriaConsolasVolver = document.getElementById("galeriaConsolas");
      let divGaleriaDiversosVolver = document.getElementById("galeriaDiversos");

      dbServices
        .listarProductos()
        .then((data) => {
          data.forEach(
            ({ id, nombre, precio, descripcion, categoria, img }) => {
              if (categoria == "Star Wars") {
                divGaleriaStarWarsVolver.innerHTML += `
        <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
            <div class="card" style="width: 15rem">
                <img
                src="${img}"
                class="card-img-top"
                alt="Imágen ${categoria}"
            />
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">$${precio}</p>
                <a class="btn btn-primary verDetalle" id=${id}>Ver producto</a>
            </div>
        </div>
    `;
              }
              if (categoria == "Consolas") {
                divGaleriaConsolasVolver.innerHTML += `
    <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
        <div class="col paddingCard">
            <div class="card" style="width: 15rem">
                <img
                src="${img}"
                class="card-img-top"
                alt="Imágen ${categoria}"
            />
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">$${precio}</p>
                <a class="btn btn-primary verDetalle" id="${id}">Ver producto</a>
            </div>
        </div>
    </div>
  `;
              }
              if (categoria == "Diversos") {
                divGaleriaDiversosVolver.innerHTML += `
    <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
        <div class="col paddingCard">
            <div class="card" style="width: 15rem">
                <img
                src="${img}"
                class="card-img-top"
                alt="Imágen ${categoria}"
            />
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">$${precio}</p>
                <a class="btn btn-primary verDetalle" id="${id}">Ver producto</a>
            </div>
        </div>
    </div>
    `;
              }
            }
          );
        })
        .catch((error) => {
          alert("Ocurrió un error al traer los productos");
          console.log(error);
        });
    }
  }
});

divProducto.addEventListener("click", (e) => {
  if (e.target.classList.contains("eliminarProducto")) {
    e.preventDefault();
    let id = e.target.getAttribute("id");
    dbServices
      .eliminarProducto(id)
      .then()
      .catch((error) => {
        alert("Ocurrió un error al eliminar el producto elegido");
        console.log(error);
      });
  }
});

divProducto.addEventListener("click", (e) => {
  if (e.target.classList.contains("editarProducto")) {
    e.preventDefault();
    let id = e.target.getAttribute("id");

    divProducto.innerHTML = "";

    let formEditarProducto = `
    <div class="formAgregarEditarProducto">
    <form action="">
      <h3>Editar Producto</h3>
      <div class="mb-4">
        <label for="urlImagenProducto" class="form-label"
          >URL de la imagen</label
        >
        <input
          type="text"
          class="form-control"
          id="urlImagenProducto"
          placeholder="Ingrese la URL de la imagen"
          required
        />
      </div>
      <div class="mb-3">
        <label for="categoriaProducto" class="form-label"
          >Categoría del producto</label
        >
        <select name="categorias" id="categoriaProducto" title="Star Wars">
        <option value="Star Wars">Star Wars</option>
        <option value="Consolas">Consolas</option>
        <option value="Diversos">Diversos</option>
      </select>
      </div>
      <div class="mb-3">
        <label for="nombreProducto" class="form-label"
          >Nombre del producto</label
        >
        <input
          type="text"
          class="form-control"
          id="nombreProducto"
          placeholder="Ingrese el nombre del producto"
          required
          maxlength="20"
        />
      </div>
      <div class="mb-3">
        <label for="precioProducto" class="form-label"
          >Precio del producto</label
        >
        <input
          type="number"
          class="form-control"
          id="precioProducto"
          placeholder="Ingrese el precio del producto"
          required
        />
      </div>
      <div class="mb-3">
        <label for="descripcionProdcuto" class="form-label"
          >Descripción del prodcuto</label
        >
        <textarea
          class="form-control"
          id="descripcionProdcuto"
          rows="5"
          cols="5"
          required
          maxlength="150"
        ></textarea>
      </div>
      <div class="col-auto">
        <button
          type="button"
          class="btn btn-primary mb-3"
          id="btnAgregarEditarProducto"
        >
          Editar Producto
        </button>
      </div>
    </form>
  </div>
    `;

    divProducto.innerHTML += formEditarProducto;

    let urlImagen = document.getElementById("urlImagenProducto");
    let categoriaProducto = document.getElementById("categoriaProducto");
    let nombreProducto = document.getElementById("nombreProducto");
    let precioProducto = document.getElementById("precioProducto");
    let descripcionProdcuto = document.getElementById("descripcionProdcuto");
    let btnAgregarEditarProducto = document.getElementById(
      "btnAgregarEditarProducto"
    );

    dbServices
      .detalleProducto(id)
      .then((data) => {
        urlImagen.value = data.img;
        categoriaProducto.value = data.categoria;
        nombreProducto.value = data.nombre;
        precioProducto.value = data.precio;
        descripcionProdcuto.value = data.descripcion;
      })
      .catch((error) => {
        alert("Ocurrió un error al traer el detalle de este producto");
        console.log(error);
      });

    btnAgregarEditarProducto.addEventListener("click", (e) => {
      if (
        urlImagen.value != "" &&
        categoriaProducto.value != "" &&
        nombreProducto.value != "" &&
        precioProducto.value != "" &&
        descripcionProdcuto.value != ""
      ) {
        dbServices
          .actualizarProducto(
            id,
            nombreProducto.value,
            precioProducto.value,
            descripcionProdcuto.value,
            categoriaProducto.value,
            urlImagen.value
          )
          .then()
          .catch((error) => {
            alert("Ocurrió un error al editar el producto elegido");
            console.log(error);
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Tiene que llenar todos los campos para editar el producto!",
        });
      }
    });
  }
});

//flujo

dbServices
  .listarProductos()
  .then((data) => {
    data.forEach(({ id, nombre, precio, descripcion, categoria, img }) => {
      if (categoria == "Star Wars") {
        divGaleriaStarWars.innerHTML += `
          <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
              <div class="card" style="width: 15rem">
                  <img
                  src="${img}"
                  class="card-img-top"
                  alt="Imágen ${categoria}"
              />
              <div class="card-body">
                  <h5 class="card-title">${nombre}</h5>
                  <p class="card-text">$${precio}</p>
                  <a class="btn btn-primary verDetalle" id=${id}>Ver producto</a>
              </div>
          </div>
      `;
      }
      if (categoria == "Consolas") {
        divGaleriaConsolas.innerHTML += `
      <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
          <div class="col paddingCard">
              <div class="card" style="width: 15rem">
                  <img
                  src="${img}"
                  class="card-img-top"
                  alt="Imágen ${categoria}"
              />
              <div class="card-body">
                  <h5 class="card-title">${nombre}</h5>
                  <p class="card-text">$${precio}</p>
                  <a class="btn btn-primary verDetalle" id="${id}">Ver producto</a>
              </div>
          </div>
      </div>
  `;
      }
      if (categoria == "Diversos") {
        divGaleriaDiversos.innerHTML += `
      <div class="col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2 paddingCard paddingGaleria galeriaFlex">
          <div class="col paddingCard">
              <div class="card" style="width: 15rem">
                  <img
                  src="${img}"
                  class="card-img-top"
                  alt="Imágen ${categoria}"
              />
              <div class="card-body">
                  <h5 class="card-title">${nombre}</h5>
                  <p class="card-text">$${precio}</p>
                  <a class="btn btn-primary verDetalle" id="${id}">Ver producto</a>
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
