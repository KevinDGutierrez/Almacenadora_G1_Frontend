import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createClient, getClientById, updateClient } from "../../services/clientService.jsx";

export default function ClientForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const [isAdmin] = useState(true);

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
    <Paper sx={{ maxWidth: 600, p: 3, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
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
        />
        <TextField
          label="Teléfono"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Dirección"
          name="address"
          value={form.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          {id ? "Actualizar" : "Crear"}
        </Button>

        <Button onClick={() => navigate("/clients")} startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
          Regresar
        </Button>
      </Box>
    </Paper>
  );
}
