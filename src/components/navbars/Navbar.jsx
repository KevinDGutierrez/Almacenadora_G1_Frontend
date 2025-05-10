import { useNavigate, useLocation } from "react-router-dom";
import logo from '../../assets/img/Logo.png';
import { useUserDetails } from "../../shared/hooks";
import { Box, Button } from "@mui/material";

const NavLogo = () => (
  <div className="nav-logo-container">
    <img
      className="nav-logo"
      width="100%"
      height="100%"
      src={logo}
      alt="Logo"
    />
  </div>
);

export const Navbar = () => {
  const { isLogged, logout } = useUserDetails();
  const navigate = useNavigate();
  const location = useLocation();

  const isInSettings = location.pathname.includes("/dashboard/settings");

  const handleNavigateToAuthPage = () => {
    navigate('/auth');
  };

  const handleNavigateToSettingPage = () => {
    navigate('/dashboard/settings');
  };

  const handleNavigateToAdminSystem = () => {
    navigate('/');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 24px",
        backgroundColor: "#1e1e1e",
        color: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      }}
    >
      <NavLogo />

      <Box sx={{ display: "flex", gap: 2 }}>
        {!isLogged ? (
          <Button variant="contained" color="primary" onClick={handleNavigateToAuthPage}>
            Login
          </Button>
        ) : (
          <>
            <Button variant="outlined" color="secondary" onClick={handleNavigateToAdminSystem}>
              Ir a SystemaG1
            </Button>
            <Button variant="text" color="inherit" onClick={() =>
            isInSettings ? navigate("/dashboard") : handleNavigateToSettingPage()}>
            {isInSettings ? "Panel" : "Mi Cuenta"}
            </Button>
            <Button variant="text" color="error" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};
