import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('access');
    if (storedAccessToken) {
      try {
        const decodedToken = jwtDecode(storedAccessToken);
        console.log('Datos del token:', decodedToken);
        const { username, groups, rol, proceso } = decodedToken;
        setUser({ username, groups, rol, proceso });
        console.log('Datos del token:', username, groups, rol, proceso);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        localStorage.removeItem('access'); 

      }
    }
  }, []);

  const login = (data) => {
    const { access, refresh } = data;
    if (typeof access === 'string') {
      try {
        const decodedToken = jwtDecode(access);
        const { username, groups, rol, proceso } = decodedToken;
        setUser({ username, groups, rol, proceso });
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    } else {
      console.error('El token de acceso no es una cadena de texto válida');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
