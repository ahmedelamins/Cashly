import axios from 'axios';

const axiosInstance = axios.create({
    baseUrl: 'https://localhost:7040/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

//Authorization header for all authenticated requests
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


export default axiosInstance;