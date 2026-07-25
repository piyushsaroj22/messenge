import axios from "axios";

// const hostname = window.location.hostname;

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const axiosInstance = axios.create({
  baseURL: `${SERVER_URL}/api`,
  withCredentials: true,
});

// import.meta.env.VITE_SERVER_URL ||
