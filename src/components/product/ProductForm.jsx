import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Paper, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createProduct, getProductById, updateProduct } from "../../services/Product-service.jsx";
import { getAllCategories } from "../../services/CategoriaService";
import { getSuppliers } from "../../services/supplierService.jsx";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
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

    const fetchSuppliers = async () => {
      try {
        const response = await getSuppliers();
        if (response.success) {
          setSuppliers(response.suppliers);
        } else {
          console.error("Error al cargar proveedores:", response);
        }
      } catch (error) {
        console.error("Error al cargar proveedores:", error);
      }
    };

    const loadProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct({
          name: data.name || "",
          category: data.category?._id || "",
          stock: data.stock || "",
          supplier: data.supplier?._id || "",
          description: data.description || "",
          entryDate: data.entryDate ? data.entryDate.split("T")[0] : "",
          fechaDeVencimiento: data.fechaDeVencimiento ? data.fechaDeVencimiento.split("T")[0] : "",
          precioUnitario: data.precioUnitario || ""
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
    fetchSuppliers();

    if (id) loadProduct();
  }, [id, navigate]);

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
      alert("Error al guardar producto");
      console.error("Error al guardar producto:", error);
    }
  };

  return (
    <Paper sx={{ maxWidth: 600, p: 3, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
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
        />
        <FormControl fullWidth required margin="normal">
          <InputLabel id="category-label">Categoría</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            value={product.category}
            onChange={handleChange}
            label="Categoría"
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
        />
        <FormControl fullWidth required margin="normal">
          <InputLabel id="supplier-label">Proveedor</InputLabel>
          <Select
            labelId="supplier-label"
            name="supplier"
            value={product.supplier}
            onChange={handleChange}
            label="Proveedor"
          >
            <MenuItem value=""><em>Seleccionar</em></MenuItem>
            {suppliers.map((sup) => (
              <MenuItem key={sup._id} value={sup._id}>
                {sup.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Descripción"
          name="description"
          value={product.description}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
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
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          {id ? "Actualizar" : "Registrar"}
        </Button>

        <Button onClick={() => navigate("/products")} startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
          Regresar
        </Button>
      </Box>
    </Paper>
  );
}
