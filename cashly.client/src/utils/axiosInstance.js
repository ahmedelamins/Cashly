import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://localhost:7040/api", //api here
});

// Add a request interceptor to inject the token into headers
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); //fetch token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle unauthorized globally 
axiosInstance.interceptors.response.use(
    (response) => response, //return if successful
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
