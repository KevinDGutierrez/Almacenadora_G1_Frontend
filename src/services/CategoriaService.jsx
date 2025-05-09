import axios from "axios";


const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8080/AlmacenadoraG1/vlm",
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

 export const getCategories = async () => {
  try {
  
    const response = await apiClient.get("/categories"); 
    return response.data.categories;
  } catch (error) {
    console.error("Error al obtener categorías:", error.response?.data || error);
    throw error;
  }
};


export const createCategory = async (categoryData) => {
  try {
 
    const response = await apiClient.post("/add-categories", categoryData); 
    return response.data.categorie; 
  } catch (error) {
    console.error("Error al guardar categoría:", error.response?.data || error);
    throw error;
  }
};