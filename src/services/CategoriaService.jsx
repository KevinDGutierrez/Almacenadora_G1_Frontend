import axios from "axios";


const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3000/AlmacenadoraG1/vlm/add-categories",
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

export const getAllCategories = async () => {
  try {
    const response = await apiClient.get(`/allCategory`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todas las categorías:", error.response?.data || error);
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await apiClient.get(`/findUser/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener categoría por ID (${id}):`, error.response?.data || error);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await apiClient.post("/createCategory", categoryData); 
    return response.data;  
  } catch (error) {
    console.error("Error al guardar categoría:", error.response?.data || error);
    throw error;
  }
};
