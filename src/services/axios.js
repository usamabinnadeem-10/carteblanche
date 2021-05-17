import axios from "axios";
import { URL } from "../URL";
const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    const refreshToken = JSON.parse(localStorage.getItem("user")).refresh;
    if (
      error.response &&
      error.response.status === 401 &&
      error.config &&
      !error.config.__isRetryRequest &&
      refreshToken
    ) {
      originalRequest._retry = true;

      return fetch(URL + "auth/login/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          let user = JSON.parse(localStorage.getItem("user"));
          user.access = res.access;
          localStorage.setItem("user", JSON.stringify(user));
          originalRequest.headers["Authorization"] = "Bearer " + res.access;
          return axios(originalRequest);
        });
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
