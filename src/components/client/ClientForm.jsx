import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createClient, getClientById, updateClient } from "../../services/clientService.js";

export default function ClientForm() {
  const { id } = useParams(); // Si hay ID es para editar
  const navigate = useNavigate();

  // Estado del formulario
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const [isAdmin] = useState(true); // Lo cambiarías por autenticación real más adelante

  // Efecto para cargar datos cuando estamos editando
  useEffect(() => {
    if (id && !/^[a-fA-F0-9]{24}$/.test(id)) {
      alert("ID inválido para edición");
      navigate("/clients");
      return;
    }

    const loadClient = async () => {
      try {
        const clientData = await getClientById(id);
        setForm({
          name: clientData.name || "",
          email: clientData.email || "",
          phone: clientData.phone || "",
          address: clientData.address || ""
        });
      } catch (error) {
        console.error("Error al cargar cliente", error);
        alert("No se pudo cargar el cliente.");
        navigate("/clients");
      }
    };

    if (id) loadClient();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await updateClient(id, form);
      } else {
        await createClient(form);
      }
      navigate("/clients");
    } catch (error) {
      console.error("Error al guardar cliente", error);
      alert("Error al guardar cliente.");
    }
  };

  if (!isAdmin) return <Typography>No autorizado</Typography>;

  return (
    <Paper sx={{ maxWidth: 600, p: 3, mx: "auto", mt: 4, backgroundColor: "#f1f5f5", borderRadius: "10px" }}>
      <Typography variant="h5" gutterBottom sx={{ color: "#354f52", fontWeight: "bold" }}>
        {id ? "Editar Cliente" : "Nuevo Cliente"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          sx={{
            backgroundColor: "#fff", 
            borderRadius: "5px", 
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
          }}
        />
        <TextField
          label="Correo electrónico"
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          fullWidth
          required
          margin="normal"
          sx={{
            backgroundColor: "#fff", 
            borderRadius: "5px", 
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
          }}
        />
        <TextField
          label="Teléfono"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{
            backgroundColor: "#fff", 
            borderRadius: "5px", 
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
          }}
        />
        <TextField
          label="Dirección"
          name="address"
          value={form.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{
            backgroundColor: "#fff", 
            borderRadius: "5px", 
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
          }}
        />

        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ 
            mt: 2, 
            backgroundColor: "#84a98c", 
            '&:hover': { backgroundColor: "#52796f" },
            borderRadius: "5px"
          }}
        >
          {id ? "Actualizar" : "Crear"}
        </Button>

        <Button
          onClick={() => navigate("/clients")}
          startIcon={<ArrowBackIcon />}
          sx={{ 
            mt: 2, 
            color: "#354f52", 
            borderColor: "#354f52", 
            borderRadius: "5px", 
            border: "2px solid", 
            '&:hover': { backgroundColor: "#f1f5f5" }
          }}
        >
          Regresar
        </Button>
      </Box>
    </Paper>
  );
}
