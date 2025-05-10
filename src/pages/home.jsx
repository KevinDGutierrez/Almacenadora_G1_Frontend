import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Bienvenido a Almacenadora G1
      </Typography>
      <Typography gutterBottom>
        Selecciona una opción en el menú de la izquierda o navega a otras vistas:
      </Typography>

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        <Button component={Link} to="/dashboard" variant="contained" color="primary">
          Ir al Panel de Inicio
        </Button>
      </Box>
      <Typography gutterBottom>
        (Se encontrara información de tu usuario)
      </Typography>
    </Box>
  );
}
