import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function InventoryInform() {
  const [report, setReport] = useState({ totalProductos: 0, valorInventario: 0, productos: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventoryReport = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/inventory/informe-inventario");
        setReport(response.data);
      } catch (error) {
        console.error("Error al obtener el informe de inventario:", error);
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
        Valor Total del Inventario: ${report.valorInventario.toFixed(2)}
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
          {report.productos.map((producto) => (
            <TableRow key={producto._id}>
              <TableCell>{producto.nombre}</TableCell>
              <TableCell>{producto.cantidadEnStock}</TableCell>
              <TableCell>${producto.precio.toFixed(2)}</TableCell>
              <TableCell>${(producto.cantidadEnStock * producto.precio).toFixed(2)}</TableCell>
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
