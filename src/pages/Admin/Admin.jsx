import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Admin = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Cargando...</p>; 
  }

  return (
    <div>
      <h1>Bienvenido, {user.username}</h1>
      <p>Grupos: {user.groups.join(', ')}</p>
    </div>
  );
};

export default Admin;
