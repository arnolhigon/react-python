import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Admin = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Cargando...</p>; 
  }

  return (
    <div>
      <h1>Bienvenid@, {user.username}</h1>
      <p>Grupos: {user.groups.join(', ')}</p>
      <p>Rol: {user.rol}</p>
      <p>Proceso: {user.proceso}</p>

    </div>
  );
};

export default Admin;
