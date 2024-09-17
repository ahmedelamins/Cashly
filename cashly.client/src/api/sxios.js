import axios from 'axios';

const axiosInstance = axios.create({
    baseUrl: 'https://localhost:7040/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;