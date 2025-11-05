import React, { useState, useEffect, useRef } from "react";

const Compras = () => {
  const [productos, setProductos] = useState([]);
  const [compra, setCompra] = useState({
    productoId: "",
    cantidad: "",
    proveedor: "",
    costo: "",
  });
  const [pedidos, setPedidos] = useState([]);
  const [inventario, setInventario] = useState([]);

  const cargado = useRef(false);

  // Cargar datos iniciales
  useEffect(() => {
    const almacenados = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(almacenados);

    const pedidosGuardados = JSON.parse(localStorage.getItem("pedido")) || [];
    setPedidos(pedidosGuardados);

    const inventarioGuardado = JSON.parse(localStorage.getItem("inventario")) || [];
    setInventario(inventarioGuardado);
  }, []);

  // Guardar pedidos e inventario en localStorage (evitar guardar en primera carga)
  useEffect(() => {
    if (cargado.current) {
      localStorage.setItem("pedido", JSON.stringify(pedidos));
      localStorage.setItem("inventario", JSON.stringify(inventario));
    } else {
      cargado.current = true;
    }
  }, [pedidos, inventario]);

  const handleChange = (e) => {
    setCompra({
      ...compra,
      [e.target.name]: e.target.value,
    });
  };

  const total =
    compra.cantidad && compra.costo
      ? Number(compra.cantidad) * Number(compra.costo)
      : 0;

  const handleCompra = (e) => {
    e.preventDefault();

    if (
      !compra.productoId ||
      !compra.cantidad ||
      !compra.proveedor ||
      !compra.costo
    ) {
      alert("Completa todos los campos antes de registrar la compra.");
      return;
    }

    const productoBase = productos.find(
      (p) => p.id === Number(compra.productoId)
    );
    if (!productoBase) return alert("Selecciona un producto válido.");

    const nuevaCompra = {
      id: Date.now(),
      productoId: productoBase.id,
      nombre: productoBase.nombre,
      proveedor: compra.proveedor,
      presentacion: productoBase.presentacion,
      cantidad: Number(compra.cantidad),
      costo: Number(compra.costo),
      total: total,
      fecha: new Date().toLocaleString(),
    };

    // Guardar en lista de pedidos
    const nuevosPedidos = [...pedidos, nuevaCompra];
    setPedidos(nuevosPedidos);

    // Actualizar inventario
    const existente = inventario.find((i) => i.id === productoBase.id);
    if (existente) {
      const actualizado = inventario.map((i) =>
        i.id === productoBase.id
          ? {
              ...i,
              cantidad: i.cantidad + Number(compra.cantidad),
              costo: Number(compra.costo),
            }
          : i
      );
      setInventario(actualizado);
    } else {
      const nuevo = {
        ...productoBase,
        cantidad: Number(compra.cantidad),
        costo: Number(compra.costo),
      };
      setInventario([...inventario, nuevo]);
    }

    alert("Compra registrada correctamente.");

    // Limpiar campos
    setCompra({
      productoId: "",
      cantidad: "",
      proveedor: "",
      costo: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">
        Registro de Compras
      </h1>

      <form
        onSubmit={handleCompra}
        className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8"
      >
        <select
          name="productoId"
          value={compra.productoId}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">Seleccionar producto</option>
          {productos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="cantidad"
          value={compra.cantidad}
          onChange={handleChange}
          placeholder="Cantidad"
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
          min="1"
        />

        <input
          type="text"
          name="proveedor"
          value={compra.proveedor}
          onChange={handleChange}
          placeholder="Proveedor"
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="number"
          name="costo"
          value={compra.costo}
          onChange={handleChange}
          placeholder="Costo ($)"
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
          min="0"
          step="0.01"
        />

        <div className="col-span-1 sm:col-span-4 flex gap-3 items-center justify-between mt-2">
          <p className="text-lg font-semibold text-gray-700">
            Total: <span className="text-indigo-600">${total.toFixed(2)}</span>
          </p>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition duration-200"
          >
            Registrar compra
          </button>
        </div>
      </form>

      {/* Lista de pedidos */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Pedidos Registrados
      </h2>

      {pedidos.length === 0 ? (
        <p className="text-center text-gray-500">No hay pedidos registrados.</p>
      ) : (
        <div className="grid gap-4">
          {pedidos.map((p) => (
            <div
              key={p.id}
              className="flex flex-col sm:flex-row justify-between items-center border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div>
                <p className="font-semibold text-lg text-gray-800">{p.nombre}</p>
                <p className="text-sm text-gray-600">
                  Proveedor: {p.proveedor}
                </p>
                <p className="text-sm text-gray-600">
                  Presentación: {p.presentacion}
                </p>
                <p className="text-sm text-gray-700">
                  Cantidad: {p.cantidad} | Costo: ${p.costo.toFixed(2)} | Total: $
                  {p.total.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">Fecha: {p.fecha}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Compras;
