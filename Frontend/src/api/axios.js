import axios from 'axios';

// Create axios instance with base URL
const instance = axios.create({
  baseURL: "https://cashcoach.onrender.com/api/",
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;