import axios from 'axios';

const URL = import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create({
    baseURL: `${URL}/api`, // Base URL for the API
    withCredentials: true, // This allows cookies to be sent with requests
});

