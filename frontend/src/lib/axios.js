// import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL:
//     import.meta.env.MODE === "development"
//       ? "http://localhost:3000/api"
//       : "/api",
//   withCredentials: true,
// });

//=====================================================================================================================================

// import axios from "axios";

// const hostname = window.location.hostname;

// export const axiosInstance = axios.create({
//   baseURL:
//     import.meta.env.MODE === "development"
//       ? `http://${hostname}:3000/api`
//       : "/api",
//   withCredentials: true,
// });

import axios from "axios";

// const hostname = window.location.hostname;

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const axiosInstance = axios.create({
  baseURL: `${SERVER_URL}/api`,
  withCredentials: true,
});

// import.meta.env.VITE_SERVER_URL ||

// export const axiosInstance = axios.create({
//   baseURL: `http://${hostname}:3000/api`,
//   withCredentials: true,
// });
