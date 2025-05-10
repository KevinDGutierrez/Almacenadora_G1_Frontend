import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Button, Paper, Typography, TextField, Box
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProducts } from "../../services/Product-service.jsx";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null); 

  const navigate = useNavigate();
  const [isAdmin] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        console.log("RESPUESTA DEL BACKEND:", response);
        if (Array.isArray(response)) {
          setProducts(response);
          setFilteredProducts(response);
        } else {
          throw new Error("Error cargando productos");
        }
      } catch (error) {
        setError("No se pudieron cargar los productos.");
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.category?.name && product.category.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (product.supplier?.name && product.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

const handleDelete = async (id) => {
  const confirm = window.confirm("¿Estás seguro que deseas eliminar este producto?");
  if (!confirm) return;

  try {
    await deleteProduct(id);

    const updatedProducts = await getProducts();
    setProducts(updatedProducts);          
    setFilteredProducts(updatedProducts);  

  } catch (error) {
    alert("Error al eliminar el producto.");
    console.error(error);
  }
};


  return (
    <Paper
      elevation={4}
      sx={{
        mt: 4,
        mx: "auto",
        maxWidth: 1000,
        p: 4,
      }}
    >
      <Box>
        <Typography variant="h4" color="primary">
          Lista de Productos
        </Typography>
      </Box>

    
      {error && <Typography color="error">{error}</Typography>}

      <TextField
        label="Buscar Producto"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />

      {isAdmin && (
        <Button variant="contained" onClick={() => navigate("/products/new")}>
          Agregar Producto
        </Button>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Nombre</strong></TableCell>
            <TableCell><strong>Categoría</strong></TableCell>
            <TableCell><strong>Proveedor</strong></TableCell>
            <TableCell><strong>Precio</strong></TableCell>
            {isAdmin && <TableCell><strong>Acciones</strong></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProducts.map((p) => {
              if (!p || !p.pid) return null;
              return (
                  <TableRow key={p.pid}>
                      <TableCell>{p.name || "-"}</TableCell>
                      <TableCell>{p.category?.name || "-"}</TableCell>
                      <TableCell>{p.supplier?.name || "-"}</TableCell>
                      <TableCell>{p.precioUnitario !== undefined ? `$${p.precioUnitario}` : "-"}</TableCell>
                      {isAdmin && (
                          <TableCell>
                              <Button onClick={() => navigate(`/products/edit/${p.pid}`)}>Editar</Button>
                              <Button color="error" onClick={() => handleDelete(p.pid)}>Eliminar</Button>
                          </TableCell>
                      )}
                  </TableRow>
              );
          })}

        </TableBody>
      </Table>
    </Paper>
  );
}
