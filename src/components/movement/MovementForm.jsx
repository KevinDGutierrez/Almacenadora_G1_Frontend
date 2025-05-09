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
    employeeId: "",
    reason: "",
    destination: ""
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
    <Paper sx={{ maxWidth: 700, p: 4, mx: "auto", mt: 4, backgroundColor: "#272125", color: "#c7c7c3" }}>
      <Typography variant="h4" gutterBottom>
        Registrar Movimiento
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        {[
          { label: "ID de Producto", name: "productId" },
          { label: "Cantidad", name: "quantity", type: "number" },
          { label: "ID de Empleado (ObjectId)", name: "employeeId" },
          { label: "Motivo", name: "reason" },
          { label: "Destino", name: "destination" },
          { label: "Tipo (entrada/salida)", name: "type" }
        ].map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type || "text"}
            value={form[field.name]}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            variant="outlined"
            sx={{
              input: { color: "#fff" },
              label: { color: "#c7c7c3" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#c7c7c3" },
                "&:hover fieldset": { borderColor: "#fff" },
                "&.Mui-focused fieldset": { borderColor: "#fff" }
              }
            }}
          />
        ))}

        <TextField
          label="Fecha"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{ shrink: true }}
          sx={{
            input: { color: "#fff" },
            label: { color: "#c7c7c3" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#c7c7c3" },
              "&:hover fieldset": { borderColor: "#fff" },
              "&.Mui-focused fieldset": { borderColor: "#fff" }
            }
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            backgroundColor: "#3b4353",
            color: "#fff",
            "&:hover": { backgroundColor: "#505a6b" }
          }}
        >
          Registrar
        </Button>

        <Button
          onClick={() => navigate("/movements")}
          startIcon={<ArrowBackIcon />}
          fullWidth
          sx={{
            mt: 2,
            color: "#c7c7c3",
            borderColor: "#c7c7c3",
            border: "1px solid",
            "&:hover": { backgroundColor: "#3b4353" }
          }}
        >
          Regresar
        </Button>
      </Box>
    </Paper>
  );
}