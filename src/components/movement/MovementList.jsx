import { Table, TableHead, TableRow, TableCell, TableBody, Button, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerHistorial } from "../../services/movementService";
import { useParams } from "react-router-dom";

export default function MovementList() {
  const { producto } = useParams();
  const [movements, setMovements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const response = await obtenerHistorial(producto);
        setMovements(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error cargando movimientos:", error);
      }
    };
    fetchMovements();
  }, []);

  return (
    <Paper sx={{ mt: 4, mx: "auto", maxWidth: 900, p: 3, backgroundColor: "#272125", color: "#c7c7c3" }}>
      <Typography variant="h4" gutterBottom>
        Lista de Movimientos
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate("/movements/new")}
        sx={{ mb: 2, backgroundColor: "#3b4353" }}
      >
        Registrar nuevo movimiento
      </Button>

      <Button
        variant="outlined"
        onClick={() => navigate("/movements/report")}
        sx={{ mb: 2, ml: 2, color: "#c7c7c3", borderColor: "#c7c7c3" }}
      >
        Ver Informe
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#c7c7c3" }}>Producto</TableCell>
            <TableCell sx={{ color: "#c7c7c3" }}>Cantidad</TableCell>
            <TableCell sx={{ color: "#c7c7c3" }}>Tipo</TableCell>
            <TableCell sx={{ color: "#c7c7c3" }}>Empleado (ID)</TableCell>
            <TableCell sx={{ color: "#c7c7c3" }}>Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movements.map((m) => (
            <TableRow key={m._id} sx={{ '&:hover': { backgroundColor: '#3b4353' } }}>
              <TableCell sx={{ color: "#fff" }}>{m.productId}</TableCell>
              <TableCell sx={{ color: "#fff" }}>{m.quantity}</TableCell>
              <TableCell sx={{ color: "#fff" }}>{m.type}</TableCell>
              <TableCell sx={{ color: "#fff" }}>{m.employeeId}</TableCell>  {/* Muestra el ID de empleado */}
              <TableCell sx={{ color: "#fff" }}>{new Date(m.date).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}