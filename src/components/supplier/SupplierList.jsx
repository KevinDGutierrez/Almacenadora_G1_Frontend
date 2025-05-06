import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Button, Paper, Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSupplier, getSuppliers } from "../../services/supplierService";

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();
  const [isAdmin] = useState(true); 

  useEffect(() => {
    const fetchSuppliers = async () => {
      const response = await getSuppliers();
      if (Array.isArray(response)) {
        setSuppliers(response);
      } else {
        console.error("Error cargando proveedores:", response);
      }
    };
    fetchSuppliers();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro que deseas eliminar este proveedor?");
    if (!confirm) return;

    try {
      await deleteSupplier(id);
      setSuppliers((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      alert("Error al eliminar el proveedor.");
      console.error(error);
    }
  };

  return (
    <Paper sx={{ mt: 4, mx: "auto", maxWidth: 900, p: 3, bgcolor: "#272125", color: "#c7c7c3" }}>
      <Typography variant="h4" gutterBottom>
        Lista de Proveedores
      </Typography>

      {isAdmin && (
        <Button variant="contained" onClick={() => navigate("/suppliers/new")} sx={{ mb: 2, bgcolor: '#3b4353' }}>
          Agregar proveedor
        </Button>
      )}

      <Table>
        <TableHead>
          <TableRow>
          <TableCell sx={{ color: '#c7c7c3' }}>Nombre</TableCell>
            <TableCell sx={{ color: '#c7c7c3' }}>Email</TableCell>
            <TableCell sx={{ color: '#c7c7c3' }}>Teléfono</TableCell>
            <TableCell sx={{ color: '#c7c7c3' }}>Dirección</TableCell>
            <TableCell sx={{ color: '#c7c7c3' }}>Productos</TableCell>
            {isAdmin && <TableCell sx={{ color: '#c7c7c3' }}>Acciones</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map((s) => {
            if (!s || !s._id) return null; 

            console.log("ID que se está enviando a editar:", s._id);

            return (
              <TableRow key={s._id} sx={{ '&:hover': { backgroundColor: '#3b4353' } }}>
                <TableCell sx={{ color: '#ffffff' }}>{s.name || "-"}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>{s.email || "-"}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>{s.phone || "-"}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>{s.address || "-"}</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>
                  {Array.isArray(s.productsSupplied) ? s.productsSupplied.join(", ") : "-"}
                </TableCell>
                {isAdmin && s._id?.length === 24 && (
                  <TableCell>
                    <Button onClick={() => navigate(`/suppliers/edit/${s._id}`)} sx={{ color: '#c7c7c3' }}>
                      Editar
                    </Button>
                    <Button color="error" onClick={() => handleDelete(s._id)}>Eliminar</Button>
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
