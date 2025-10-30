import React from 'react';

const Principal = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Panel Principal
        </h1>
        <p className="text-xl text-gray-600">
          Bienvenido al sistema de gestión integral
        </p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Productos</h3>
          <p className="text-3xl font-bold text-blue-600">1,248</p>
          <p className="text-sm text-green-500">+12% este mes</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Inventario</h3>
          <p className="text-3xl font-bold text-green-600">856</p>
          <p className="text-sm text-green-500">+5% este mes</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Compras</h3>
          <p className="text-3xl font-bold text-purple-600">324</p>
          <p className="text-sm text-green-500">+8% este mes</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Proveedores</h3>
          <p className="text-3xl font-bold text-orange-600">48</p>
          <p className="text-sm text-green-500">+2% este mes</p>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-gray-600 hover:text-blue-600">
            <div className="text-center">
              <div className="text-2xl mb-2">📦</div>
              <div className="font-semibold">Agregar Producto</div>
            </div>
          </button>

          <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-gray-600 hover:text-green-600">
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-semibold">Ver Reportes</div>
            </div>
          </button>

          <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all text-gray-600 hover:text-purple-600">
            <div className="text-center">
              <div className="text-2xl mb-2">👥</div>
              <div className="font-semibold">Gestionar Proveedores</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Principal;