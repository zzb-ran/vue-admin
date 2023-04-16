import axios from "axios";
import { ElMessage } from "element-plus";
import { closeLoading, openLoading } from "./loading";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8888",
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    openLoading();
    return Promise.resolve(config);
  },
  function (error) {
    ElMessage({
      type: "error",
      message: error,
    });
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    setTimeout(() => {
      closeLoading();
    }, 200);
    if (response.status !== 200) {
      ElMessage({
        type: "error",
        message: config.status,
      });
      return;
    }
    return Promise.resolve(response.data);
  },
  function (error) {
    ElMessage({
      type: "error",
      message: error,
    });
    return Promise.reject(error);
  }
);

export default axiosInstance;
