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
      if (response.success && Array.isArray(response.suppliers)) {
        setSuppliers(response.suppliers);
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
    <Paper sx={{ mt: 4, mx: "auto", maxWidth: 900, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Proveedores
      </Typography>

      {isAdmin && (
        <Button variant="contained" onClick={() => navigate("/suppliers/new")}>
          Agregar proveedor
        </Button>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Dirección</TableCell>
            <TableCell>Productos</TableCell>
            {isAdmin && <TableCell>Acciones</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map((s) => {
            if (!s || !s._id) return null;

            return (
              <TableRow key={s._id}>
                <TableCell>{s.name || "-"}</TableCell>
                <TableCell>{s.email || "-"}</TableCell>
                <TableCell>{s.phone || "-"}</TableCell>
                <TableCell>{s.address || "-"}</TableCell>
                <TableCell>
                  {Array.isArray(s.productsSupplied) ? s.productsSupplied.join(", ") : "-"}
                </TableCell>
                {isAdmin && s._id?.length === 24 && (
                  <TableCell>
                    <Button onClick={() => navigate(`/suppliers/edit/${s._id}`)}>
                      Editar
                    </Button>
                    <Button color="error" onClick={() => handleDelete(s._id)}>
                      Eliminar
                    </Button>
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