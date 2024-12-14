import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://fleet-management-backend-xk3v.onrender.com', 
});

export default axiosInstance;
