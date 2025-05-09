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
    <Paper sx={{ maxWidth: 900, p: 4, mx: "auto", mt: 4, backgroundColor: "#272125", color: "#c7c7c3" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#c7c7c3" }}>
        Informe de Movimientos
      </Typography>

      <Button
        onClick={() => navigate("/movements")}
        sx={{
          mb: 2,
          color: "#c7c7c3",
          border: "1px solid #c7c7c3",
          borderRadius: "5px",
          "&:hover": { backgroundColor: "#505a6b", borderColor: "#505a6b" }
        }}
      >
        Regresar a Movimientos
      </Button>

      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#c7c7c3", fontWeight: "bold" }}>Producto</TableCell>
            <TableCell sx={{ color: "#c7c7c3", fontWeight: "bold" }}>Empleado (ID)</TableCell>
            <TableCell sx={{ color: "#c7c7c3", fontWeight: "bold" }}>Entradas</TableCell>
            <TableCell sx={{ color: "#c7c7c3", fontWeight: "bold" }}>Salidas</TableCell>
            <TableCell sx={{ color: "#c7c7c3", fontWeight: "bold" }}>Stock Actual</TableCell>
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