import React, { useEffect, useState } from "react";

const Inventario = () => {
  const [inventario, setInventario] = useState([]);

  // Cargar inventario almacenado en localStorage
  useEffect(() => {
    const inventarioGuardado = JSON.parse(localStorage.getItem("inventario")) || [];
    setInventario(inventarioGuardado);
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">
        Inventario Actual
      </h1>

      {inventario.length === 0 ? (
        <p className="text-center text-gray-500">
          No hay productos registrados en el inventario.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Presentación</th>
                <th className="px-4 py-2 text-left">Proveedor</th>
                <th className="px-4 py-2 text-left">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {inventario.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2 text-gray-800 font-medium">{item.nombre}</td>
                  <td className="px-4 py-2 text-gray-700">{item.presentacion}</td>
                  <td className="px-4 py-2 text-gray-700">{item.proveedor || "—"}</td>
                  <td className="px-4 py-2 text-gray-700">{item.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Inventario;
