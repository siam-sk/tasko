import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tasko-6mfq.vercel.app/api',
  withCredentials: true,
});

export default api;