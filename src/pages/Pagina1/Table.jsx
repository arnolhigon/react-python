import React, { useState, useEffect } from 'react';
import {EliminarTarea} from '../../services/apiService';
import { showSuccessNotification,showErrorNotification} from '../../utils/notifications';
import ConfirmationModal from '../../utils/ConfirmationModal';
import useFetchTareas from '../../hooks/useFetchTareas'; 


const Table = () => {
 
  const { tareas, error, refetchTareas } = useFetchTareas();
  const [showModal, setShowModal] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [taskTitleToDelete, setTaskTitleToDelete] = useState('');



  const handleShowModal = (id, title) => {
    console.log('Título de la tarea:', title);
    setTaskIdToDelete(id); 
    setTaskTitleToDelete(title); 
    setShowModal(true); 
  };
  

  const handleCloseModal = () => {
    setShowModal(false); 
    setTaskIdToDelete(null); 
  };


  const handleEliminarTarea = async () => {
    try {
      await EliminarTarea(taskIdToDelete);
      showSuccessNotification('¡Tarea eliminada exitosamente!');
      await refetchTareas();
    } catch (error) {
      showErrorNotification('No se pudo eliminar la tarea. Por favor, inténtalo de nuevo.');
    } finally {
      setShowModal(false);
      setTaskIdToDelete(null);
    }
  };


  return (
    <div>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
        {tareas.length === 0 ? (
            <p className="display-4 mt-5">No hay tareas disponibles.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Fecha de Creación</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {tareas.map((tarea) => (
                  <tr key={tarea.id}>
                    <td>{tarea.id}</td>
                    <td>{tarea.titulo}</td>
                    <td>{tarea.descripcion}</td>
                    <td>{tarea.estado_actual}</td>
                    <td>{new Date(tarea.created).toLocaleString()}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleShowModal(tarea.id, tarea.titulo)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      <ConfirmationModal
        show={showModal}
        onHide={handleCloseModal}
        onConfirm={handleEliminarTarea}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de eliminar la tarea "${taskTitleToDelete}" con ID ${taskIdToDelete}?`}
        taskId={taskIdToDelete}
        taskTitle={taskTitleToDelete}
      />
    </div>
  );
};

export default Table;