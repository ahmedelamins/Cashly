// src/utils/axiosInstance.js

import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: "https://localhost:7040/api",  // Adjust the base URL
});

// Add a request interceptor to inject the token into headers
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 401 (Unauthorized) response globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear token and redirect to login
            localStorage.removeItem('token');
            window.location.href = "/";  // Redirect to landing page
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
