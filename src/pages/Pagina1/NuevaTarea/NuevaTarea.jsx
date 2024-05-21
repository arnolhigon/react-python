import React from 'react';
import { useForm } from 'react-hook-form';
import { CrearTarea } from '../../../services/apiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { showSuccessNotification,showErrorNotification} from '../../../utils/notifications';


const NuevoTarea = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await CrearTarea(data);
      reset(); 
      showSuccessNotification("Operacion Exitosa")
      navigate('/pagina1');
    } catch (error) {
      showErrorNotification("Error al guardar Tarea")
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Formulario para Nueva Tarea</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        <div className="col-md-4">
          <label htmlFor="titulo" className="form-label">Titulo:</label>
          <input type="text" {...register('titulo', { required: 'El título es requerido' })} className="form-control" />
          {errors.titulo && <div className="text-danger">{errors.titulo.message}</div>}
        </div>
        <div className="col-md-4">
          <label htmlFor="descripcion" className="form-label">Descripción:</label>
          <textarea {...register('descripcion', { required: 'La descripción es requerida' })} className="form-control" />
          {errors.descripcion && <div className="text-danger">{errors.descripcion.message}</div>}
        </div>
        <div className="col-md-4">
          <label htmlFor="estado_actual" className="form-label">Estado Actual:</label>
          <select {...register('estado_actual', { required: 'Selecciona un estado' })} className="form-select">
            <option value="">Seleccionar Estado</option>
            <option value="1">Nuevo</option>
            <option value="2">En Progreso</option>
            <option value="3">En Revisión</option>
            <option value="4">Completado</option>
          </select>
          {errors.estado_actual && <div className="text-danger">{errors.estado_actual.message}</div>}
        </div>
        <div className="col-md-12 mt-3">
          <button type="submit" disabled={isSubmitting} className="btn btn-primary">Guardar Tarea</button>
        </div>
      </form>
    </div>
  );
};

export default NuevoTarea;
