import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/AlmacenadoraG1/vlm/suppliers",
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

export const getSuppliers = async () => {
  try {
    const { data } = await apiClient.get("/");
    return data;
  } catch (error) {
    console.error("Error al obtener proveedores", error);
    return [];
  }
};

export const getSupplierById = async (id) => {
  try {
    const { data } = await apiClient.get(`/${id}`);
    return data;
  } catch (error) {
    console.error("Error al obtener proveedor por ID", error);
    return null;
  }
};

export const createSupplier = async (supplierData) => {
  try {
    const { data } = await apiClient.post("/", supplierData);
    return data;
  } catch (error) {
    console.error("Error al crear proveedor", error);
    return { error: true, msg: error?.response?.data?.msg || "Error inesperado" };
  }
};

export const updateSupplier = async (id, supplierData) => {
  try {
    const { data } = await apiClient.put(`/${id}`, supplierData);
    return data;
  } catch (error) {
    console.error("Error al actualizar proveedor", error);
    return { error: true, msg: error?.response?.data?.msg || "Error inesperado" };
  }
};

export const deleteSupplier = async (id) => {
  try {
    const { data } = await apiClient.delete(`/${id}`);
    return data;
  } catch (error) {
    console.error("Error al eliminar proveedor", error);
    return { error: true, msg: error?.response?.data?.msg || "Error inesperado" };
  }
};
