import { useRouter } from "next/navigation";
import api from "./request-interceptor";
import axios from "axios";

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const router = useRouter();
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          "http://localhost:8000/api/v1/users/refresh-token",
          { refreshToken }
        );
        const { token } = response.data;
        localStorage.setItem("token", token);
        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (err) {
        //NOTE: redirect to /login page
        router.push("/login")
        console.log(err);
      }
    }
  }
);
