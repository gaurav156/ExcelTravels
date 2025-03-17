import axios from "axios";

/**
 * Dynamically get the backend URL based on the frontend's current hostname.
 */
const getBackendUrl = () => {
  const host = window.location.hostname; // Gets frontend's IP/domain automatically
  return `http://${host}:5000/api`; // Assumes backend is running on port 5000
};

const api = axios.create({
  baseURL: getBackendUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;