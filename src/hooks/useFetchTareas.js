
import { useState, useEffect } from 'react';
import { Listartareas } from '../services/apiService';


const useFetchTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState(null);

  const fetchTareas = async () => {
 
    try {
      const response = await Listartareas(); 
      setTareas(response.data);
      setError(null);
    } catch (error) {
      setError('Error al cargar datos. Por favor, intenta nuevamente.');
    }
  };

  useEffect(() => {
    fetchTareas();
  }, []); 
  const refetchTareas = async () => {
    await fetchTareas();
  };

  return { tareas, error, refetchTareas };
};

export default useFetchTareas;
