import React from "react";
import {
  Box, CssBaseline, Drawer, AppBar,
  Toolbar, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, IconButton, Typography, Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  drawerWidth, appBarSx, drawerSx, listItemButtonSx, listItemIconSx, listItemTextSx, mainContentSx,
} from "./sidebarStyles";

const navItems = [
  { text: "Inicio", icon: <HomeIcon />, path: "/" },
  { text: "Proveedores", icon: <PeopleIcon />, path: "/suppliers" },
  { text: "Movimientos", icon: <InventoryIcon />, path: "/movements" },
  { text: "Clientes", icon: <InventoryIcon />, path: "/clients" },
];

export default function Sidebar() {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={appBarSx}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap>
            Almacenadora G1
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open} sx={drawerSx(open)}>
        <Toolbar />
        <List>
          {navItems.map(({ text, icon, path }) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate(path)}
            >
              <ListItemButton sx={listItemButtonSx(open, location.pathname === path)}>
                <ListItemIcon sx={listItemIconSx(open)}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={listItemTextSx(open)}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>

      <Box component="main" sx={mainContentSx}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
