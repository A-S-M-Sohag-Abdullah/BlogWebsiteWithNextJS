import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "",
  withCredentials: true, // If using cookies/auth
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    // global error handler (e.g. toast, logout on 401)
    console.error(err);
    return Promise.reject(err);
  }
);
export default axiosInstance;
