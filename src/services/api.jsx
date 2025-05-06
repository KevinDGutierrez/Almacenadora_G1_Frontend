import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8080/AlmacenadoraG1/vlm",
  timeout: 5000,
});

// Interceptor para agregar token automáticamente
apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem("user");

    if (userDetails) {
      try {
        const parsed = JSON.parse(userDetails);
        const token = parsed?.token;
        if (token) {
          console.log("Token en interceptor:", token);  // Verifica si el token está presente
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        console.error("Error parsing user token from localStorage", e);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Funciones exportadas

export const login = async (data) => {
  try {
    const response = await apiClient.post("/users/login", data);
    console.log("Login response:", response);  // Verificar la respuesta del login
    return response;
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const register = async (data) => {
  try {
    return await apiClient.post("/users/register", data);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const changeUser = async (data) => {
  try {
    return await apiClient.put("/users/update", data);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const getUser = async () => {
  try {
    const response = await apiClient.get("/users/search");
    console.log("Get user response:", response);  // Verificar la respuesta al obtener usuario
    return response;
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};
