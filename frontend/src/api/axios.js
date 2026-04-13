import axios from 'axios';

let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
// Ensure URL ends with /api correctly
if (!apiUrl.endsWith('/api') && !apiUrl.endsWith('/api/')) {
  apiUrl = apiUrl.replace(/\/$/, '') + '/api';
}

const instance = axios.create({
  baseURL: apiUrl
});

console.log("Verified API URL:", apiUrl);

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('omtex_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
