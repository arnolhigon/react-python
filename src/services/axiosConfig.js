
import axios from 'axios';

const baseDomain = import.meta.env.VITE_APP_BASE_URL;
const baseUrl = `${baseDomain}`;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access') || '';
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    console.error('Error en la solicitud:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
