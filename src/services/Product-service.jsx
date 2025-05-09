import axios from "axios";


const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3000/AlmacenadoraG1/vlm",
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


export const getProducts = async () => {
  try {
    const response = await apiClient.get("/products"); 
    return response.data.products;  
  } catch (error) {
    return res.error("Error al obtener productos:", error.response?.data || error);
    throw error;
  }
};
//probaste crearla por backend?

export const createProduct = async (productData) => {
  try {
    const response = await apiClient.post("/products/createProduct", productData);
    return response.data.product; 
  } catch (error) {
    alert("Error al guardar el producto. Verifica la conexión con el servidor.");
    throw error; 
};
}
export const getProductByName = async (name) => {
  try {
    const response = await apiClient.get(`/products/search?name=${name}`);
    return response.data;
  } catch (error) {
    console.error("Error al buscar producto por nombre:", error.response?.data || error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);  
    return response.data;  
  } catch (error) {
    console.error("Error al obtener producto por ID:", error.response?.data || error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await apiClient.put(`/products/${id}`, productData); 
    return response.data;  
  } catch (error) {
    console.error("Error al actualizar producto:", error.response?.data || error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await apiClient.delete(`/products/${id}`);  
    return response.data; 
  } catch (error) {
    console.error("Error al eliminar producto:", error.response?.data || error);
    throw error;
  }
};

export const getLowStockProducts = async () => {
  try {
    const response = await apiClient.get("/products/low-stock"); 
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos con poco stock:", error.response?.data || error);
    throw error;
  }
}
