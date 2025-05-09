import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createSupplier, getSupplierById, updateSupplier } from "../../services/supplierService";

export default function SupplierForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    productsSupplied: "" 
  });
  const [isAdmin] = useState(true); 

  useEffect(() => {
    if (id && !/^[a-fA-F0-9]{24}$/.test(id)) {
      alert("ID inválido para edición");
      navigate("/suppliers");
      return;
    }
    
    const loadSupplier = async () => {
      try {
        const { supplier } = await getSupplierById(id);
        if (!supplier) {
          alert("Proveedor no encontrado.");
          navigate("/suppliers");
          return;
        } 
        setForm({
            name: supplier.name || "",
            email: supplier.email || "",
            phone: supplier.phone || "",
            address: supplier.address || "",
            productsSupplied: (supplier.productsSupplied || []).join(", ")
          });
        } catch (error) {
          console.error("Error al cargar proveedor", error);
          alert("No se pudo cargar el proveedor.");
          navigate("/suppliers");
        }
    };
    if (id) loadSupplier();
  }, [id]);
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const supplierPayload = {
      ...form,
      productsSupplied: form.productsSupplied
        .split(",")
        .map(p => p.trim())
        .filter(p => p.length > 0)
    };

    try {
      if (id) {
        await updateSupplier(id, supplierPayload);
      } else {
        await createSupplier(supplierPayload);
      }
      navigate("/suppliers");
    } catch (error) {
      console.error("Error al guardar proveedor", error);
      alert("Error al guardar proveedor.");
    }
  };

  if (!isAdmin) return <Typography>No autorizado</Typography>;

  return (
    <Paper sx={{ maxWidth: 600, p: 3, mx: "auto", mt: 4, bgcolor: "#272125", color: "#c7c7c3" }}>
      <Typography variant="h5" gutterBottom>
        {id ? "Editar Proveedor" : "Nuevo Proveedor"}
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
          InputLabelProps={{ style: { color: '#c7c7c3' } }}
          InputProps={{ style: { color: '#ffffff' } }}
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
          InputLabelProps={{ style: { color: '#c7c7c3' } }}
          InputProps={{ style: { color: '#ffffff' } }}
        />
        <TextField
          label="Teléfono"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: '#c7c7c3' } }}
          InputProps={{ style: { color: '#ffffff' } }}
        />
        <TextField
          label="Dirección"
          name="address"
          value={form.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: '#c7c7c3' } }}
          InputProps={{ style: { color: '#ffffff' } }}
        />
        <TextField
          label="Productos suministrados (separados por coma)"
          name="productsSupplied"
          value={form.productsSupplied}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: '#c7c7c3' } }}
          InputProps={{ style: { color: '#ffffff' } }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, bgcolor: '#3b4353' }}>
          {id ? "Actualizar" : "Crear"}
        </Button>

        <Button onClick={() => navigate("/suppliers")} startIcon={<ArrowBackIcon />} sx={{ mt: 2, color: '#c7c7c3' }}>
          Regresar
        </Button>
      </Box>
    </Paper>
  );
}
