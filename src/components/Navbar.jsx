import React, { useState } from 'react';

const Navbar = ({ currentPage, onPageChange, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Principal', key: 'Principal' },
    { name: 'Productos', key: 'Productos' },
    { name: 'Inventario', key: 'Inventario' },
    { name: 'Compras', key: 'Compras' },
    { name: 'Proveedores', key: 'Proveedores' },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo y título */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-800">Sistema Gestion de Inventario</span>
          </div>

          {/* Menú desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onPageChange(item.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === item.key
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Botón logout y menú móvil */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onLogout}
              className="hidden md:block bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-200"
            >
              Cerrar Sesión
            </button>

            {/* Botón menú móvil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    onPageChange(item.key);
                    setIsMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-lg font-medium text-left transition-all ${
                    currentPage === item.key
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={onLogout}
                className="px-4 py-3 bg-red-500 text-white rounded-lg font-semibold text-left hover:bg-red-600 transition-all"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;