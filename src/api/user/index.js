import axiosInstance from "../request";

export function rlogin(userData) {
  return axiosInstance.post("/login", userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function rregister(userData) {
  return axiosInstance.post("/register", userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function rreloadToken() {
  return axiosInstance.get("/reloadToken");
}
