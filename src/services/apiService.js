import Service from "./axiosConfig";

const resource = "rest/v1";

  export function Listartareas() {
      return Service.get(`${resource}/listar_tareas/`);    
    }

  export function CrearTarea(formData) {   
          return Service.post(`${resource}/crear_tarea/`,formData);    
      }
  
  export function ListarTaraId(id) {
    return Service.get(`${resource}/tarea/${id}`);    
  }
  export function Actualizar_tarea(id,formData) {
    return Service.put(`${resource}/actualizar_tarea/${id}/`,formData);    
  }

  export function EliminarTarea(id) {
    return Service.delete(`${resource}/eliminar_tarea/${id}`);    
  }

  export function Actualizar_estado(id,formData) {
    return Service.put(`${resource}/actualizar_estado/${id}/`,formData);    
  }


  export const obtenerToken = async (username, password) => {
    try {
      const response = await Service.post(`${resource}/token/`, { username, password });
      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;
      localStorage.setItem('access', accessToken);
      localStorage.setItem('refresh', refreshToken);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('No se encontró ninguna cuenta activa con las credenciales proporcionadas');
      } else {
        console.error('Error al obtener el token:', error);
        throw error;
      }
    }
  };
  

  
  export const refrescarToken = async (refreshToken) => {
    try {
      const response = await Service.post(`${resource}/token/refresh/`, { refresh: refreshToken });
      const accessToken = response.data.access;
      localStorage.setItem('access', accessToken);
      return accessToken;
    } catch (error) {
      console.error('Error al refrescar el token:', error);
      throw error;
    }
  };


export const registerUser = async (userData) => {
  try {
    const response = await Service.post(`${resource}/register/`, userData);
    return response.data;
  } catch (error) {
    
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error.join('\n'));
    } else if (error.response && error.response.data && error.response.data.password) {
      throw new Error(error.response.data.password.join('\n'));
    } else {
      throw new Error('Error al registrar usuario');
    }
  }
};