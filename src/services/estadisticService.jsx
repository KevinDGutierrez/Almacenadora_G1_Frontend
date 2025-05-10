import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3000/AlmacenadoraG1/vlm/estadisticas/",
  timeout: 5000,
});

apiClient.interceptors.request.use(
  (config) => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const token = JSON.parse(userData).token;
      if (token) {
        config.headers["x-token"] = token;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getEstadisticas = async () => {
  try {
    const response = await apiClient.get("estadisticas", { responseType: 'blob' });
    return response.data;

  } catch (error) {
    console.error("Error al obtener estadísticas", error);
    throw error;
  }
};
