import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../context/AuthContext';

import Login from '../pages/Login/Login'; 
import Register from '../pages/Register/Register';
import ServerResponse from '../pages/ServerResponse/ServerResponse'; 

import Admin from '../pages/Admin/Admin';
import Home from '../pages/Home/Home';
import Pagina1 from '../pages/Pagina1/Pagina1';
import Pagina2 from '../pages/Pagina2/Pagina2';

import NuevoTarea from '../pages/Pagina1/NuevaTarea/NuevaTarea';
import Navbar from '../componets/Navbar/Navbar';
import Footer from '../componets/Footer/Footer';
import ProtectedRoute from '../componets/ProtectedRoute/ProtectedRoute'; 
import './router.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />} />
              <Route path="/pagina1" element={<ProtectedRoute element={<Pagina1 />} />} />
              <Route path="/pagina2" element={<ProtectedRoute element={<Pagina2 />} />} />
              <Route path="/nueva-tarea" element={<ProtectedRoute element={<NuevoTarea />} />} />
              <Route path="/admin" element={<ProtectedRoute element={<Admin />} />} />
              <Route path="/accounts/server-response" element={<ServerResponse />} /> 
            </Routes>
          </div>
          <Footer />
          <ToastContainer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
