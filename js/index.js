import { dbServices } from "./services/dbServices.js";

//constantes y variables

let btnLogin = document.getElementById("btnLogin");
let linkTodos = document.getElementById("linkTodos");
let linkStarWars = document.getElementById("linkStarWars");
let linkConsolas = document.getElementById("linkConsolas");
let linkDiversos = document.getElementById("linkDiversos");
let inputBuscar = document.getElementById("inputBuscar");
let btnBuscar = document.getElementById("btnBuscar");

let divMain = document.getElementById("divMain");
let divGaleriaStarWars = document.getElementById("galeriaStarWars");
let divGaleriaConsolas = document.getElementById("galeriaConsolas");
let divGaleriaDiversos = document.getElementById("galeriaDiversos");

let divProducto = document.getElementById("divProductos");

let inputNyA = document.getElementById("inputNyA");
let mensajeParaEnviar = document.getElementById("mensajeParaEnviar");
let btnEnviar = document.getElementById("btnEnviar");

//funciones

//eventos

linkTodos.addEventListener("click", () => {
  divMain.innerHTML = "";

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

  divMain.innerHTML = contenedor;
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
                  <p class="card-text">${precio}</p>
                  <a href="#" class="btn btn-primary" id="${id}">Ver producto</a>
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
                  <p class="card-text">${precio}</p>
                  <a href="#" class="btn btn-primary" id="${id}">Ver producto</a>
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
                  <p class="card-text">${precio}</p>
                  <a href="#" class="btn btn-primary" id="${id}">Ver producto</a>
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
});

linkStarWars.addEventListener("click", () => {
  divMain.innerHTML = "";

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

  divMain.innerHTML = contenedor;
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
                  <p class="card-text">${precio}</p>
                  <a href="#" class="btn btn-primary" id="${id}">Ver producto</a>
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
});

linkConsolas.addEventListener("click", () => {
  divMain.innerHTML = "";

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

  divMain.innerHTML = contenedor;
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
                  <p class="card-text">${precio}</p>
                  <a href="#" class="btn btn-primary" id="${id}">Ver producto</a>
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
});

linkDiversos.addEventListener("click", () => {
  divMain.innerHTML = "";

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

  divMain.innerHTML = contenedor;
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
                  <p class="card-text">${precio}</p>
                  <a href="#" class="btn btn-primary" id="${id}">Ver producto</a>
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
});

btnBuscar.addEventListener("click", () => {
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
        divMain.innerHTML = "";

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

        divMain.innerHTML = contenedor;
        let divGaleriaEncontrados =
          document.getElementById("galeriaEncontrados");

        data.forEach(({ id, nombre, precio, descripcion, categoria, img }) => {
          if (nombre.toLowerCase().includes(inputBuscar.value.toLowerCase())) {
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
                  <p class="card-text">${precio}</p>
                  <a href="#" class="btn btn-primary" id="${id}">Ver producto</a>
              </div>
          </div>
      `;
          }
        });
      } else {
        alert("No se encontraron artículos para la búsqueda solicitada!");
      }
    })
    .catch((error) => {
      alert("Ocurrió un error al buscar los productos solicitados");
      console.log(error);
    });
});

btnEnviar.addEventListener("click", (e) => {
  e.preventDefault();
  inputNyA.value = "";
  mensajeParaEnviar.value = "";
});

btnLogin.addEventListener("click", () => {
  divMain.innerHTML = "";

  divMain.innerHTML = `
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
  <button type="submit" class="btn btn-primary btn-block mb-4" id="btnAdmin">
    Entrar
  </button>
</form>
`;

  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let btnAdmin = document.getElementById("btnAdmin");

  btnAdmin.addEventListener("click", () => {
    if (email.value == "admin@admin.com" && password.value == "admin") {
      btnLogin.innerText = "Logout";
      btnLogin.setAttribute("id", "btnLogout");
      btnLogin.classList.remove("btn-primary");
      btnLogin.classList.add("btn-danger");
      divMain.innerHTML = "";

      let btnLogout = document.getElementById("btnLogout");

      btnLogout.addEventListener("click", () => {
        btnLogin.innerText = "Login";
        btnLogin.setAttribute("id", "btnLogout");
        btnLogin.classList.remove("btn-danger");
        btnLogin.classList.add("btn-primary");
        btnLogin.setAttribute("id", "btnLogin");
        divMain.innerHTML = "";
      });
    } else {
      alert("Credenciales incorrectas!");
    }
  });
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
                  <p class="card-text">${precio}</p>
                  <a class="btn btn-primary verDetalle" id="${id}">Ver producto</a>
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
                  <p class="card-text">${precio}</p>
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
                  <p class="card-text">${precio}</p>
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

divProducto.addEventListener("click", (e) => {
  if (e.target.classList.contains("verDetalle")) {
    console.log(e.target.getAttribute("id"));
  }
});
