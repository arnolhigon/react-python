//register.jsx
import React, { useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import { registerUser } from '../../services/apiService';
import { showSuccessNotification, showErrorNotification } from '../../utils/notifications';
import PasswordInput from '../../componets/PasswordInput/PasswordInput'; 
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      const errorMessage = 'Las contraseñas no coinciden';
      setErrorMessage(errorMessage);
      setTimeout(() => {
        setErrorMessage('');
      }, 7000);
      return;
    }

    try {
      await registerUser({ username, password, email });
      showSuccessNotification('Usuario registrado exitosamente');
      navigate('/login');
    } catch (error) {
      const errorMessage = error.message || 'Ha ocurrido un error';
      setErrorMessage(errorMessage);
      setTimeout(() => {
        setErrorMessage('');
      }, 7000); 
    }
  };
  return (
    <div className="container-login">
      <div className="content">
        <div className="left-column">
          <h1>Bienvenido</h1>
          <p className="subtitle">Regístrate para empezar</p>
          {errorMessage && (
              <div className="error-message show">
                {errorMessage}
              </div>
            )}
        </div>
        <div className="right-column">
          <form className="login-form" onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                pattern="[a-zA-Z0-9_]+"
                title="Únicamente letras, dígitos y @/./+/-/_"
                maxLength="150"
                required
                placeholder=" "
              />
              <label htmlFor="username">Usuario:</label>
            </div>
            <div className="form-group">
            <PasswordInput
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Contraseña:"
              required
            />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength="1"
                required
                placeholder=" "
              />
              <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder=" "
              />
              <label htmlFor="email">Email:</label>
            </div>

            <div className="form-actions">
            <span className="form-info" >¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></span>
            <button type="submit" className="btn-next">Registrarse</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;