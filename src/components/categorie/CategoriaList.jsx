import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Button, Paper, Typography, TextField, Box
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllCategories, createCategory } from "../../services/CategoriaService.jsx";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        if (response.success) {
          setCategories(response.categories);
          setFilteredCategories(response.categories);
          setNewCategory({ name: "", description: "" });
        } else {
          throw new Error("Error cargando categorías");
        }
      } catch (error) {
        setError("No se pudieron cargar las categorías."); 
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCategories(results);
    } else {
      setFilteredCategories(categories);
    }
  }, [searchTerm, categories]);

  const handleChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await createCategory(newCategory);
      if (response.success) {
        alert("Categoría creada correctamente");
        setCategories([...categories, response.categorie]);
        setNewCategory({ name: "", description: "" });
      } else {
        alert("Error al crear categoría");
      }
    } catch (error) {
      console.error("Error al crear categoría:", error);
      alert("No se pudo registrar la categoría.");
    }
  };

  return (
    <Paper elevation={4} sx={{ mt: 4, mx: "auto", maxWidth: 800, p: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Lista de Categorías
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Buscar Categoría"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />

      <form onSubmit={handleCreateCategory}>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            label="Nombre"
            name="name"
            value={newCategory.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Descripción"
            name="description"
            value={newCategory.description}
            onChange={handleChange}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" >
            Agregar
          </Button>
        </Box>
      </form>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Nombre</strong></TableCell>
            <TableCell><strong>Descripción</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCategories.map((cat) => (
            <TableRow key={cat._id}>
              <TableCell>{cat.name}</TableCell>
              <TableCell>{cat.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
