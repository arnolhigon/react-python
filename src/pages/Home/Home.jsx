import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [password, setPassword] = useState('');

  return (
    <div className="contenedor-principal">
      <h1>HOLA BIENVENIDOS AIC</h1>
    </div>
  );
};

export default Home;
