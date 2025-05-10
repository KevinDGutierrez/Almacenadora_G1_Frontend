import { Table, TableHead, TableRow, TableCell, TableBody, Button, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3000/AlmacenadoraG1/vlm/inventory/",
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

export const getInventoryReport = async () => {
  try {
    const response = await apiClient.get("informe-inventario");
    return response.data;
  } catch (error) {
    console.error("Error al obtener el informe de inventario", error);
    throw error;
  }
};

export default function InventoryReport() {
  const [report, setReport] = useState({ totalProductos: 0, valorInventario: 0, productos: [] });
  const navigate = useNavigate();

      useEffect(() => {
      const fetchInventoryReport = async () => {
        try {
          const data = await getInventoryReport();
          console.log("REPORTE:", data);
          setReport(data);
        } catch (error) {
          console.error("Error al cargar el informe de inventario", error);
        }
      };

      fetchInventoryReport();
    }, []);

  return (
    <Paper sx={{ mt: 4, mx: "auto", maxWidth: 900, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Informe de Inventario
      </Typography>

      <Typography variant="h6" gutterBottom>
        Total de Productos: {report.totalProductos}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Valor Total del Inventario:${(report.valorInventario ?? 0).toFixed(2)}
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Cantidad en Stock</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Total por Producto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(report.productos) && report.productos.map((producto, index) => (
            <TableRow key={producto._id || index}>
              <TableCell>{producto.name ?? "Sin nombre"}</TableCell>
              <TableCell>{producto.stock ?? 0}</TableCell>
              <TableCell>${(producto.precioUnitario ?? 0).toFixed(2)}</TableCell>
              <TableCell>${((producto.stock ?? 0) * (producto.precioUnitario ?? 0)).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{ mt: 2 }}
      >
        Regresar
      </Button>
    </Paper>
  );
}
