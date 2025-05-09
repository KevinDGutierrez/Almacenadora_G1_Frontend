import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function  CategoryForm (){
    const [category, setCategory] = useState({
      name: "",
      description: ""
    });
  
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setCategory({ ...category, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await createCategory(category);
        alert("Categoría registrada correctamente");
        navigate("/categories");
      } catch (error) {
        console.error("Error al registrar categoría:", error);
        alert("No se pudo registrar la categoría.");
      }
    };
  
    const textFieldStyle = {
      backgroundColor: "#fff",
      borderRadius: "5px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
    };
  
    return (
      <Paper
        sx={{
          maxWidth: 600,
          p: 3,
          mx: "auto",
          mt: 4,
          backgroundColor: "#f1f5f5",
          borderRadius: "10px"
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: "#354f52", fontWeight: "bold" }}>
          Registrar Categoría
        </Typography>
  
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            name="name"
            value={category.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            sx={textFieldStyle}
          />
          <TextField
            label="Descripción"
            name="description"
            value={category.description}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            multiline
            rows={4}
            sx={textFieldStyle}
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
            Registrar
          </Button>
  
          <Button
            onClick={() => navigate("/categories")}
            sx={{
              mt: 2,
              color: "#354f52",
              borderColor: "#354f52",
              borderRadius: "5px",
              border: "2px solid",
              '&:hover': { backgroundColor: "#f1f5f5" }
            }}
          >
            Cancelar
          </Button>
        </Box>
      </Paper>
    );
  };
  