import React, { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Paper, Typography, CircularProgress, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { obtenerHistorial } from "../../services/movementService";
import { InputField } from "../input.jsx";

export default function MovementList() {
  const { producto: productoParam } = useParams();
  const [productoId, setProductoId] = useState(productoParam || "");
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchMovements = async (producto) => {
    if (!producto) {
      setError("Por favor ingresa un ID de producto.");
      setMovements([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await obtenerHistorial(producto);
      setMovements(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("Error cargando movimientos:", err);
      setError("Hubo un problema al cargar los movimientos.");
      setMovements([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productoParam) {
      fetchMovements(productoParam);
    }
  }, [productoParam]);

  const handleSearch = () => {
    fetchMovements(productoId);
  };

  return (
    <Paper sx={{ mt: 4, mx: "auto", maxWidth: 900, p: 3, backgroundColor: "#272125", color: "#c7c7c3" }}>
      <Typography variant="h4" gutterBottom>
        Lista de Movimientos
      </Typography>

      <InputField
        label="Buscar por ID de Producto"
        name="productoId"
        value={productoId}
        onChange={(e) => setProductoId(e.target.value)}
        required
      />

      <Button
        variant="contained"
        onClick={handleSearch}
        sx={{ mb: 2, backgroundColor: "#3b4353" }}
      >
        Buscar
      </Button>

      <Button
        variant="contained"
        onClick={() => navigate("/movements/new")}
        sx={{ mb: 2, ml: 2, backgroundColor: "#3b4353" }}
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

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress sx={{ color: "#c7c7c3" }} />
        </Box>
      ) : error ? (
        <Typography variant="body1" sx={{ color: "red", mb: 2 }}>
          {error}
        </Typography>
      ) : movements.length === 0 ? (
        <Typography variant="body1" sx={{ color: "#c7c7c3", mb: 2 }}>
          No hay movimientos registrados para este producto.
        </Typography>
      ) : (
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
                <TableCell sx={{ color: "#fff" }}>{m.employeeId}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{new Date(m.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}