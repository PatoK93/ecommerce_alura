const listarProductos = () =>
  fetch("http://localhost:3000/productos").then((respuesta) =>
    respuesta.json()
  );

const crearProducto = (id, nombre, precio, descripcion, categoria, img) => {
  return fetch("http://localhost:3000/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, nombre, precio, descripcion, categoria, img }),
  });
};

const eliminarProducto = (id) => {
  return fetch(`http://localhost:3000/productos/${id}`, {
    method: "DELETE",
  });
};

const detalleProducto = (id) => {
  return fetch(`http://localhost:3000/productos/${id}`).then((respuesta) =>
    respuesta.json()
  );
};

const actualizarProducto = (
  id,
  nombre,
  precio,
  descripcion,
  categoria,
  img
) => {
  return fetch(`http://localhost:3000/productos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, nombre, precio, descripcion, categoria, img }),
  })
    .then((respuesta) => respuesta)
    .catch((err) => console.log(err));
};

export const dbServices = {
  listarProductos,
  crearProducto,
  eliminarProducto,
  detalleProducto,
  actualizarProducto,
};
