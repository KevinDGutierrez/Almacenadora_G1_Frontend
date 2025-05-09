import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { generarInformeMovimientos } from "../../services/movementService";
import { useNavigate } from "react-router-dom";

export default function MovementReport() {
  const [report, setReport] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await generarInformeMovimientos();
        setReport(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error al obtener informe de movimientos:", error);
      }
    };
    fetchReport();
  }, []);

  return (
    <Paper sx={{ mt: 4, mx: "auto", maxWidth: 900, p: 3, backgroundColor: "#cad2c5", color: "#354f52" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Informe de Movimientos
      </Typography>

      <Button
        onClick={() => navigate("/movements")}
        sx={{ mb: 2, color: "#354f52", border: "2px solid #354f52", borderRadius: "5px", '&:hover': { backgroundColor: "#84a98c" } }}
      >
        Regresar a Movimientos
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#354f52", fontWeight: "bold" }}>Producto</TableCell>
            <TableCell sx={{ color: "#354f52", fontWeight: "bold" }}>Empleado (ID)</TableCell>  {/* Columna para el ID del empleado */}
            <TableCell sx={{ color: "#354f52", fontWeight: "bold" }}>Entradas</TableCell>
            <TableCell sx={{ color: "#354f52", fontWeight: "bold" }}>Salidas</TableCell>
            <TableCell sx={{ color: "#354f52", fontWeight: "bold" }}>Stock Actual</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {report.map((r) => (
            <TableRow key={r.productId}>
              <TableCell>{r.productId}</TableCell>
              <TableCell>{r.employeeId}</TableCell>
              <TableCell>{r.totalEntries}</TableCell>
              <TableCell>{r.totalExits}</TableCell>
              <TableCell>{r.currentStock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}