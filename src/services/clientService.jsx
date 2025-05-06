import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3000/AlmacenadoraG1/vlm/",
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

export const getClients = async () => {
  try {
    const response = await apiClient.get("client/");
    return response.data;  
  } catch (error) {
    console.error("Error al obtener clientes", error);
    throw error;
  }
};

export const createClient = async (clientData) => {
  try {
    const response = await apiClient.post("client/", clientData);
    return response.data.client; 
  } catch (error) {
    console.error("Error al guardar cliente:", error.response?.data || error);
    throw error;
  }
};

export const updateClient = async (id, clientData) => {
  try {
    const response = await apiClient.put(`client/${id}`, clientData);
    return response.data;  
  } catch (error) {
    console.error("Error al actualizar cliente", error.response?.data || error);
    throw error;
  }
};

export const deleteClient = async (id) => {
  try {
    const response = await apiClient.delete(`client/${id}`);
    return response.data;  
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    throw error;
  }
};

export const getClientById = async (id) => {
  try {
    const response = await apiClient.get(`client/${id}`);
    return response.data;  
  } catch (error) {
    console.error("Error al obtener cliente por ID", error.response?.data || error);
    throw error;
  }
};
