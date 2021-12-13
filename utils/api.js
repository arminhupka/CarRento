import axios from 'axios';

const dev = process.env.NODE_ENV === 'development';

const api = axios.create({
  baseURL: dev ? 'http://localhost:3000' : 'http://test.com',
});

export default api;
