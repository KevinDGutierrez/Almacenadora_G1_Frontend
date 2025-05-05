import axios from "axios";

// Ruta base correcta según server.js
const BASE_URL = "http://localhost:3000/AlmacendoraG1/vlm/suppliers";

// Si no estás usando token aún, simplemente no lo incluyas
const HEADERS = {}; // Vacío por ahora, sin autenticación

// Obtener todos los proveedores
export const getSuppliers = async () => {
  try {
    const response = await axios.get(BASE_URL, { headers: HEADERS });
    return response.data;
  } catch (error) {
    console.error("Error al obtener proveedores", error);
    throw error;
  }
};

// Crear proveedor
export const createSupplier = async (supplierData) => {
  try {
    const response = await axios.post(BASE_URL, supplierData, { headers: HEADERS });
    return response.data.supplier; // ✅ devolvemos solo el proveedor
  } catch (error) {
    console.error("Error al guardar proveedor:", error.response?.data || error);
    throw error;
  }
};

// Actualizar proveedor
export const updateSupplier = async (id, supplierData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, supplierData, { headers: HEADERS });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar proveedor", error.response?.data || error);
    throw error;
  }
};

// Eliminar proveedor
export const deleteSupplier = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar proveedor:", error);
    throw error;
  }
};

export const getSupplierById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, { headers: HEADERS });
    return response.data; // ✅ ya que el backend devuelve el proveedor directamente
  } catch (error) {
    console.error("Error al obtener proveedor por ID", error.response?.data || error);
    throw error;
  }
};
