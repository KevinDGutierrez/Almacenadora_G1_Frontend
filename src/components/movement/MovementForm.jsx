import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { registrarMovimiento } from "../../services/movementService.jsx";

export default function MovementForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    productId: "",
    quantity: "",
    type: "",
    date: "",
    employeeId: "",  // ID del empleado en formato ObjectId de MongoDB
    reason: "",      // Motivo del movimiento
    destination: ""   // Destino del movimiento
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registrarMovimiento(form);
      alert("Movimiento registrado exitosamente.");
      navigate("/movements");
    } catch (error) {
      console.error("Error al registrar movimiento", error);
      alert("Error al registrar movimiento.");
    }
  };

  return (
    <Paper sx={{ maxWidth: 600, p: 3, mx: "auto", mt: 4, backgroundColor: "#cad2c5", borderRadius: "10px" }}>
      <Typography variant="h5" gutterBottom sx={{ color: "#354f52", fontWeight: "bold" }}>
        Registrar Movimiento
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="ID de Producto"
          name="productId"
          value={form.productId}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          sx={{ backgroundColor: "#84a98c", borderRadius: "5px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
        />
        <TextField
          label="Cantidad"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          type="number"
          fullWidth
          required
          margin="normal"
          sx={{ backgroundColor: "#84a98c", borderRadius: "5px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
        />
        <TextField
          label="ID de Empleado (ObjectId)"
          name="employeeId"
          value={form.employeeId}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          sx={{ backgroundColor: "#84a98c", borderRadius: "5px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
        />
        <TextField
          label="Motivo"
          name="reason"
          value={form.reason}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          sx={{ backgroundColor: "#84a98c", borderRadius: "5px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
        />
        <TextField
          label="Destino"
          name="destination"
          value={form.destination}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          sx={{ backgroundColor: "#84a98c", borderRadius: "5px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
        />
        <TextField
          label="Tipo (entrada/salida)"
          name="type"
          value={form.type}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          sx={{ backgroundColor: "#84a98c", borderRadius: "5px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
        />
        <TextField
          label="Fecha"
          name="date"
          value={form.date}
          onChange={handleChange}
          type="date"
          fullWidth
          required
          margin="normal"
          InputLabelProps={{ shrink: true }}
          sx={{ backgroundColor: "#84a98c", borderRadius: "5px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
        />

        <Button 
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, backgroundColor: "#52796f", '&:hover': { backgroundColor: "#84a98c" }, borderRadius: "5px" }}
        >
          Registrar
        </Button>

        <Button
          onClick={() => navigate("/movements")}
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2, color: "#354f52", border: "2px solid #354f52", borderRadius: "5px", '&:hover': { backgroundColor: "#84a98c" } }}
        >
          Regresar
        </Button>
      </Box>
    </Paper>
  );
}