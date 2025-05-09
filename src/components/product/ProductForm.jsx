import { FormControl,InputLabel,Select,MenuItem,TextField, Button, Paper, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createProduct, getProductById, updateProduct } from "../../services/Product-service.jsx"; 
import { getAllCategories } from "../../services/CategoriaService";

export default function ProductForm() {
  const { id } = useParams();          // ← aquí toma el id desde la URL
  const navigate = useNavigate();  

  const [categories, setCategories] = useState([]);   // ← aquí va
  const [product, setProduct] = useState({
    name: "",
    category: "",
    stock: "",
    supplier: "",
    description: "",
    entryDate: "",
    fechaDeVencimiento: "",
    precioUnitario: ""
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        if (response.success) {
          setCategories(response.categories);
        } else {
          console.error("Error al cargar categorías:", response);
        }
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    const loadProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct({
          name: data.name || "",
          category: data.category || "",
          stock: data.stock || "",
          supplier: data.supplier || "",
          description: data.description || "",
          entryDate: data.entryDate ? data.entryDate.split("T")[0] : "",
          fechaDeVencimiento: data.fechaDeVencimiento ? data.fechaDeVencimiento.split("T")[0] : "",
          precioUnitario: data.precioUnitario || "",
        });
      } catch (error) {
        console.error("Error al cargar producto", error);
        alert("No se pudo cargar el producto.");
        navigate("/products");
      }
    };

    if (id && !/^[a-fA-F0-9]{24}$/.test(id)) {
      alert("ID inválido para edición");
      navigate("/products");
      return;
    }

    fetchCategories();

    if (id) loadProduct();
  }, [id]);


  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateProduct(id, product);
      } else {
        await createProduct(product);
      }
      navigate("/products");
    } catch (error) {
      const res = { status: () => {} }; 
      alert("Error al guardar producto");
    
  };
  }
  const textFieldStyle = {
  backgroundColor: "white ",
  borderRadius: "5px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  input: { color: "#000" },    
  "& label": { color: "#000" },  
  "& .MuiInputBase-root": { color: "#000" } 
};

return (
  <Paper sx={{ maxWidth: 600, p: 3, mx: "auto", mt: 4, backgroundColor: "#f1f5f5", borderRadius: "10px" }}>
    <Typography variant="h5" gutterBottom sx={{ color: "#354f52", fontWeight: "bold" }}>
      {id ? "Editar Producto" : "Registrar Producto"}
    </Typography>

    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Nombre"
        name="name"
        value={product.name}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        sx={textFieldStyle}
      />

      <FormControl fullWidth required margin="normal" sx={textFieldStyle}>
        <InputLabel id="category-label" sx={{ color: "#000" }}>Categoría</InputLabel>
      <Select
        labelId="category-label"
        name="category"
        value={product.category}
        onChange={handleChange}
        label="Categoría"
        sx={{ color: "#000" }}
      >
      <MenuItem value=""><em>Seleccionar</em></MenuItem>
      {categories.map((cat) => (
        <MenuItem key={cat._id} value={cat._id}>
          {cat.name}
        </MenuItem>
      ))}
      </Select>
      </FormControl>

      <TextField
        label="Cantidad en stock"
        name="stock"
        type="number"
        value={product.stock}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        sx={textFieldStyle}
      />

      <TextField
        label="Proveedor"
        name="supplier"
        value={product.supplier}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        sx={textFieldStyle}
      />

      <TextField
        label="Descripción"
        name="description"
        value={product.description}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        sx={textFieldStyle}
      />

      <TextField
        label="Fecha de entrada"
        name="entryDate"
        type="date"
        value={product.entryDate}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        InputLabelProps={{ shrink: true }}
        sx={textFieldStyle}
      />

      <TextField
        label="Fecha de vencimiento"
        name="fechaDeVencimiento"
        type="date"
        value={product.fechaDeVencimiento}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        InputLabelProps={{ shrink: true }}
        sx={textFieldStyle}
      />

      <TextField
        label="Precio unitario"
        name="precioUnitario"
        type="number"
        value={product.precioUnitario}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
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
        {id ? "Actualizar" : "Registrar"}
      </Button>

      <Button
        onClick={() => navigate("/products")}
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