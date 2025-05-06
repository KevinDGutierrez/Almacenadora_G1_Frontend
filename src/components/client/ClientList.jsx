import {
    Table, TableHead, TableRow, TableCell, TableBody,
    Button, Paper, Typography
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { deleteClient, getClients } from "../../services/clientService.jsx"; 
  
  export default function ClientList() {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();
    const [isAdmin] = useState(true); 
  
    useEffect(() => {
      const fetchClients = async () => {
        const response = await getClients(); 
        if (Array.isArray(response)) {
          setClients(response);
        } else {
          console.error("Error cargando clientes:", response);
        }
      };
      fetchClients();
    }, []);
  
    const handleDelete = async (id) => {
      const confirm = window.confirm("¿Estás seguro que deseas eliminar este cliente?");
      if (!confirm) return;
  
      try {
        await deleteClient(id); 
        setClients((prev) => prev.filter((c) => c._id !== id));
      } catch (error) {
        alert("Error al eliminar el cliente.");
        console.error(error);
      }
    };
  
    return (
      <Paper sx={{ mt: 4, mx: "auto", maxWidth: 900, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Lista de Clientes
        </Typography>
  
        {isAdmin && (
          <Button variant="contained" onClick={() => navigate("/clients/new")} sx={{ mb: 2 }}>
            Agregar Cliente
          </Button>
        )}
  
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Dirección</TableCell>
              {isAdmin && <TableCell>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((c) => {
              if (!c || !c._id) return null; 
  
              return (
                <TableRow key={c._id}>
                  <TableCell>{c.name || "-"}</TableCell>
                  <TableCell>{c.email || "-"}</TableCell>
                  <TableCell>{c.phone || "-"}</TableCell>
                  <TableCell>{c.address || "-"}</TableCell>
                  {isAdmin && c._id?.length === 24 && (
                    <TableCell>
                      <Button onClick={() => navigate(`/clients/edit/${c._id}`)}>Editar</Button>
                      <Button color="error" onClick={() => handleDelete(c._id)}>Eliminar</Button>
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
  