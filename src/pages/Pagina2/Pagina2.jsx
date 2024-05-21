import React, { useState, useEffect } from 'react';
import useFetchTareas from '../../hooks/useFetchTareas'; 
import * as XLSX from 'xlsx';

const Pagina2 = () => {
  const { tareas, error } = useFetchTareas();
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [exportMessage, setExportMessage] = useState('');

  const handleExportToExcel = () => {
    let filteredTareas = tareas;

    if (startDateTime && endDateTime) {
      const startDateObj = new Date(startDateTime);
      const endDateObj = new Date(endDateTime);

      filteredTareas = tareas.filter((tarea) => {
        const tareaFechaCreacion = new Date(tarea.created);
        return tareaFechaCreacion >= startDateObj && tareaFechaCreacion <= endDateObj;
      });
    }

    if (filteredTareas.length === 0) {
      setExportMessage('No hay tareas dentro del rango de fechas seleccionado.');
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(filteredTareas);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tareas');
    XLSX.writeFile(workbook, 'tareas.xlsx');
  };

  const handleDateTimeChange = (e, setterFunction) => {
    setterFunction(e.target.value);
    setExportMessage(''); 
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <label>Fecha y Hora de Inicio:</label>
          <input type="datetime-local" className="form-control" value={startDateTime} onChange={(e) => handleDateTimeChange(e, setStartDateTime)} />
        </div>
        <div className="col-md-4">
          <label>Fecha y Hora de Fin:</label>
          <input type="datetime-local" className="form-control" value={endDateTime} onChange={(e) => handleDateTimeChange(e, setEndDateTime)} />
        </div>
        <div className="col-md-4 d-flex align-items-end justify-content-end">
          <button className="btn btn-primary" onClick={handleExportToExcel}>
            Exportar a Excel
          </button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          {exportMessage && <p style={{ color: 'red' }}>{exportMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Pagina2;