import axios from "axios";

// Ruta base correcta según el server.js
const BASE_URL = "http://localhost:3000/AlmacendoraG1/vlm/clientes";  // Cambié la URL para clientes

// Si no estás usando token aún, simplemente no lo incluyas
const HEADERS = {}; // Vacío por ahora, sin autenticación

// Obtener todos los clientes
export const getClients = async () => {
  try {
    const response = await axios.get(BASE_URL, { headers: HEADERS });
    return response.data;  // Devuelve todos los clientes
  } catch (error) {
    console.error("Error al obtener clientes", error);
    throw error;
  }
};

// Crear cliente
export const createClient = async (clientData) => {
  try {
    const response = await axios.post(BASE_URL, clientData, { headers: HEADERS });
    return response.data.client; // ✅ devolvemos solo el cliente creado
  } catch (error) {
    console.error("Error al guardar cliente:", error.response?.data || error);
    throw error;
  }
};

// Actualizar cliente
export const updateClient = async (id, clientData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, clientData, { headers: HEADERS });
    return response.data;  // Devuelve el cliente actualizado
  } catch (error) {
    console.error("Error al actualizar cliente", error.response?.data || error);
    throw error;
  }
};

// Eliminar cliente
export const deleteClient = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;  // Devuelve la respuesta de eliminación
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    throw error;
  }
};

// Obtener cliente por ID
export const getClientById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, { headers: HEADERS });
    return response.data;  // Devuelve el cliente encontrado
  } catch (error) {
    console.error("Error al obtener cliente por ID", error.response?.data || error);
    throw error;
  }
};


// Registrar entrada
export const registrarEntrada = async (entradaData) => {
  try {
    const response = await axios.post(`${BASE_URL}/entrada`, entradaData, { headers: HEADERS });
    return response.data;
  } catch (error) {
    console.error("Error al registrar entrada:", error.response?.data || error);
    throw error;
  }
};

// Registrar salida
export const registrarSalida = async (salidaData) => {
  try {
    const response = await axios.post(`${BASE_URL}/salida`, salidaData, { headers: HEADERS });
    return response.data;
  } catch (error) {
    console.error("Error al registrar salida:", error.response?.data || error);
    throw error;
  }
};

// Obtener historial de producto
export const obtenerHistorialProducto = async (productoId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${productoId}`, { headers: HEADERS });
    return response.data;
  } catch (error) {
    console.error("Error al obtener historial:", error.response?.data || error);
    throw error;
  }
};

// Generar informe de movimientos
export const generarInformeMovimientos = async (fechaInicio, fechaFin) => {
  try {
    const response = await axios.get(`${BASE_URL}/informeMovimientos`, {
      headers: HEADERS,
      params: { fechaInicio, fechaFin },
    });
    return response.data;
  } catch (error) {
    console.error("Error al generar informe:", error.response?.data || error);
    throw error;
  }
};