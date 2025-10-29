import React, { useState, useEffect, useRef } from "react";

const Productos = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    proveedor: "",
    presentacion: "",
  });
  const [productos, setProductos] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  // Evitar guardar en la carga inicial
  const cargado = useRef(false);

  useEffect(() => {
    const almacenados = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(almacenados);
  }, []);

  useEffect(() => {
    if (cargado.current) {
      localStorage.setItem("productos", JSON.stringify(productos));
    } else {
      cargado.current = true;
    }
  }, [productos]);

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  // Agregar o editar producto
  const handleAddOrEdit = (e) => {
    e.preventDefault();
    if (!producto.nombre || !producto.proveedor || !producto.presentacion)
      return alert("Completa todos los campos");

    if (editando) {
      const actualizados = productos.map((p) =>
        p.id === idEditando ? { ...p, ...producto } : p
      );
      setProductos(actualizados);
      setEditando(false);
      setIdEditando(null);
    } else {
      const nuevo = {
        id: Date.now(),
        ...producto,
      };
      setProductos([...productos, nuevo]);
    }

    setProducto({ nombre: "", proveedor: "", presentacion: "" });
  };

  // Eliminar producto
  const handleDelete = (id) => {
    const filtrados = productos.filter((p) => p.id !== id);
    setProductos(filtrados);

    if (id === idEditando) {
      setEditando(false);
      setProducto({ nombre: "", proveedor: "", presentacion: "" });
      setIdEditando(null);
    }
  };

  // Editar producto
  const handleEdit = (p) => {
    setProducto({
      nombre: p.nombre,
      proveedor: p.proveedor,
      presentacion: p.presentacion,
    });
    setEditando(true);
    setIdEditando(p.id);
  };

  // Cancelar edición
  const handleCancel = () => {
    setEditando(false);
    setProducto({ nombre: "", proveedor: "", presentacion: "" });
    setIdEditando(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">
        Gestión de Productos
      </h1>

      {/* Formulario */}
      <form
        onSubmit={handleAddOrEdit}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
      >
        <input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          name="proveedor"
          value={producto.proveedor}
          onChange={handleChange}
          placeholder="Proveedor"
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          name="presentacion"
          value={producto.presentacion}
          onChange={handleChange}
          placeholder="Presentación"
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
        />

        <div className="col-span-1 sm:col-span-3 flex gap-3">
          <button
            type="submit"
            className={`flex-1 ${
              editando
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-indigo-600 hover:bg-indigo-700"
            } text-white py-2 rounded-lg transition duration-200`}
          >
            {editando ? "Guardar cambios" : "Agregar producto"}
          </button>
          {editando && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition duration-200"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de productos */}
      {productos.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos guardados.</p>
      ) : (
        <div className="grid gap-4">
          {productos.map((p) => (
            <div
              key={p.id}
              className="flex flex-col sm:flex-row justify-between items-center border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div>
                <p className="font-semibold text-lg text-gray-800">{p.nombre}</p>
                <p className="text-sm text-gray-600">Proveedor: {p.proveedor}</p>
                <p className="text-sm text-gray-600">
                  Presentación: {p.presentacion}
                </p>
              </div>
              <div className="flex gap-2 mt-3 sm:mt-0">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Productos;
