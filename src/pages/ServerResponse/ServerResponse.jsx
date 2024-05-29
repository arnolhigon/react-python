import React from 'react';
import './ServerResponse.css';
import bgImage  from '../../assets/bg.png';
import pcIcon from '../../assets/pc.png'




const ServerResponse = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center contenido">
          <img className="col-3" src={pcIcon} alt="icono" />
            <h1><strong>¡ERROR, ACCESO DENEGADO!</strong></h1>
            <h2><strong>No cuentas con permisos</strong></h2>
            <p>
              Lo sentimos, pero para acceder a esta página debes solicitar los permisos pertinentes, enviando tu solicitud al siguiente correo
              <a href="mailto:desarollo@aicsalud.org.co?subject=Solicitud de permisos de usuario&body=Cuerpo del Correo">
                <u>desarollo@aicsalud.org.co</u>
              </a>, no olvides notificar a qué entidad perteneces, cuál es tu nombre de usuario y el módulo que deseas tener acceso.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerResponse;
