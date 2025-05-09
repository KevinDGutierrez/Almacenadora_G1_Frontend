import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8080/AlmacenadoraG1/vlm/",
  timeout: 5000,
});

const urlGethistorial = 'http://localhost:8080/AlmacenadoraG1/vlm/movements/681af3482a38ee1ba65b37ad';

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

export const registrarMovimiento = async (movimientoData) => {
  try {
    const { data } = await apiClient.post("registrarMovimiento", movimientoData);
    return data;
  } catch (error) {
    console.error("Error al registrar movimiento", error);
    return { error: true, msg: error?.response?.data?.msg || "Error inesperado" };
  }
};

export const generarInformeMovimientos = async (filtros) => {
  try {
    const { data } = await apiClient.post("informeMovimientos", filtros);
    return data;
  } catch (error) {
    console.error("Error al generar informe de movimientos", error);
    return { error: true, msg: error?.response?.data?.msg || "Error inesperado" };
  }
};

export const obtenerHistorial = async (producto) => {
  try {
    const { data } = await apiClient.get(urlGethistorial);
    return data;
  } catch (error) {
    console.error("Error al obtener historial del producto", error);
    return { error: true, msg: error?.response?.data?.msg || "Error inesperado" };
  }
};