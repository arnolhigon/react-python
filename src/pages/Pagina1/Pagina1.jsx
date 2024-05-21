import React from 'react';
import { Link } from 'react-router-dom';
import Table from './Table';
import './Pagina1.css';

const Pagina1 = () => {
  return (
    <div className="container-fluid">
      <div className="col-12 mt-4 text-end">
      <Link to="/nueva-tarea"className="btn btn-success btn-lg">Nueva Tarea</Link>
      </div>
      <div className="col-12">
        <Table />
      </div>
    </div>
  );
};


export default Pagina1;