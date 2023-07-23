import axios from "axios";
import jwt from "./jwt";
import Swal from "sweetalert2";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.request.use(
  async (response) => {
    let originalConfig = response;
    const userToken = jwt.getToken();
    const _token = userToken !== undefined ? userToken : null;
    if (_token) originalConfig.headers.Authorization = `Bearer ${_token?.access_token}`;
    originalConfig.headers['Access-Control-Allow-Origin'] = '*';
    originalConfig.headers['Content-Type'] = 'application/json';
    return originalConfig;
  },
  (errors) => Promise.reject(errors)
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const {status, data: {message}} = error?.response;
    if (status === 400 && message?.toUpperCase() === "USER DATA NOT FOUND") {
      // Refresh Token.
      Swal.fire({
        icon: "info",
        text: "Sesi login telah berakhir.",
        allowEscapeKey: false,
        allowOutsideClick: false,
        confirmButtonText: "Login kembali"
      }).then(response => {
        if (response.isConfirmed) {
          localStorage.removeItem("token");
          window.location.href = '/login';
        }
      });
    };
    return Promise.reject(error);
  },
);

export default axios;