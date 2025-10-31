// frontend/src/services/api.js

import axios from 'axios';

// This is the base URL of your Django backend.
// When you're developing, it will likely be on localhost.
// The backend team will provide this, but it's often 'http://127.0.0.1:8000/'
const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Ask your backend team for this!

// Create a new instance of axios with a pre-configured baseURL
const api = axios.create({
  baseURL: API_BASE_URL,
});

// You can also add other configurations here, like automatically
// sending an authentication token for logged-in users.
//
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('authToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;