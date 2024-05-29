import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    logout();
    navigate('/');
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/admin">Inicio</Link></li>
          {user && (
            <>
              <li><Link to="/pagina1">Listar Tareas</Link></li>
    
              {user.groups.includes('prestador') && user.rol === 'GES' && user.proceso === 'PR' && (
                <li><Link to="/nueva-tarea">Nueva Tarea</Link></li>
              )}


              <li><Link to="/pagina2">Descargar Reporte</Link></li>
            </>
          )}
          <li style={{ marginLeft: 'auto' }}>{user ? (
              <button onClick={handleLogout}>Salir</button>
              ) : (
              <Link to="/login">Ingresar</Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
