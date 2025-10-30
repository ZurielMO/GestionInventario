import Login from './components/Login'
import Inventario from './components/Inventario'
import Compras from './components/Compras'
import Proveedores from './components/Proveedores'
import Navbar from './components/Navbar'
import Principal from './components/Principal'
import Productos from './components/Productos'  
import Salidas from './components/Salidas'  
import { useState } from 'react'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('Principal');

  // Usuarios y contraseñas predefinidos
  const users = [
    { username: 'admin', password: 'admin123' },
    { username: 'usuario1', password: 'password1' },
    { username: 'usuario2', password: 'password2' }
  ];

  const handleLogin = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Principal':
        return <Principal />;
      case 'Productos':
        return <Productos />;
      case 'Inventario':
        return <Inventario />;
      case 'Compras':
        return <Compras />;
      case 'Proveedores':
        return <Proveedores />;
      default:
        return <Principal />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
        onLogout={handleLogout} 
      />
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
    </div>
  );
}

export default App
