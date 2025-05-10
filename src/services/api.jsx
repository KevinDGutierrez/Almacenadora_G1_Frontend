import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8080/AlmacenadoraG1/vlm/",
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

export const login = async (data) => {
  try {
    const response = await apiClient.post("/users/login", data);
    console.log("Login response:", response);
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
    const response = await apiClient.post("/users/register", data);
    return { data: response.data };
  } catch (e) {
    console.log("Error en el registro:", e.response);
    if (e.response && e.response.data && e.response.data.errors) {
      const errors = e.response.data.errors;
      errors.forEach((error) => {
        console.log(`Error: ${JSON.stringify(error)}`);
      });
    }

    return {
      error: true,
      response: e.response,
    };
  }
};

export const changeUser = async (data) => {
  try {
    const response = await apiClient.put("/users/update", data); 
    return response.data;
  } catch (e) {
    return { error: true, e };
  }
};

export const getUser = async () => {
  try {
    const response = await apiClient.get("/users/search");
    return response.data;
  } catch (e) {
    console.error("Error al obtener el usuario:", e);
    return { error: true, e };
  }
};

export const deleteUserRequest = async (data) => {
  try {
    const response = await apiClient.put("/users/delete", data );
    return response;
  } catch (e) {
    console.error("Error al eliminar usuario:", e);
    return {
      error: true,
      e,
    };
  }
};
