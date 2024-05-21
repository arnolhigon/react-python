import React, { useState , useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { obtenerToken } from '../../services/apiService';
import { showSuccessNotification, showErrorNotification } from '../../utils/notifications';
import PasswordInput from '../../componets/PasswordInput/PasswordInput'; 
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await obtenerToken(username, password);
      login(data);
      showSuccessNotification('Ingreso exitoso');
      navigate('/admin');
    } catch (error) {
      const errorMessage = error.message || 'Ha ocurrido un error';
      setErrorMessage(errorMessage);
      localStorage.setItem('errorMessage', errorMessage);
      setTimeout(() => {
        setErrorMessage('');
        localStorage.removeItem('errorMessage');
      }, 5000); 
    }
  };
  

  useEffect(() => {
    const storedErrorMessage = localStorage.getItem('errorMessage');
    if (storedErrorMessage) {
      setErrorMessage(storedErrorMessage);
      setTimeout(() => {
        setErrorMessage('');
        localStorage.removeItem('errorMessage');
      }, 5000); 
    }
  }, []);
  

  return (
    <div className="container-login">
      <div className="content">
        <div className="left-column">
          <div className="logo">
            <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x.png" alt="Gmail Logo" />
          </div>
          <h1>Inicia sesión</h1>
          <p className="subtitle">Ir a Gmail</p>
        </div>
        <div className="right-column">
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                id="username"
                placeholder=" "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
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

            <div className={`error-message ${errorMessage ? 'show' : ''}`}>
            {errorMessage}
            </div>

            </div>
            <div className="form-info">
              <a href="#">¿Has olvidado tu correo electrónico?</a>
              <span>¿No es tu ordenador? Usa el <a href="#">modo Invitado</a> para iniciar sesión de forma privada. <a href="#">Más información</a> sobre como usar el modo Invitado</span>
            </div>
            <div className="form-actions">
              <span className="form-info" >¿No tienes una cuenta?  <Link to="/register" className="create-account">Crear cuenta</Link></span>
              <button type="submit" className="btn-next">Siguiente</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
