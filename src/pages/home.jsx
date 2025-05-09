import { Typography, Box } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Bienvenido a Almacenadora G1
      </Typography>
      <Typography>Selecciona una opción en el menú de la izquierda.</Typography>
    </Box>
  );
}