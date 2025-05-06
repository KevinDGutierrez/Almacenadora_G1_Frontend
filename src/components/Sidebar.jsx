import React from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  ListItemButton, AppBar, Toolbar, Typography, IconButton,
  CssBaseline, useTheme, Divider, Box
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

export default function Sidebar({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => setOpen(!open);

  const navItems = [
    { text: 'Inicio', icon: <DashboardIcon />, path: '/' },
    { text: 'Clientes', icon: <GroupsIcon />, path: '/clients' },
    { text: 'Movimientos', icon: <SwapHorizIcon />, path: '/movements' },
  ];

  return (
    <Box sx={{ display: 'flex', bgcolor: '#121212', color: '#fff' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          bgcolor: '#1f1f1f',
        }}
      >
        <Toolbar>
          <IconButton color="inherit" onClick={handleDrawerToggle} edge="start" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Almacenadora G1
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : 72,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : 72,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
            bgcolor: '#52796f',
            color: '#fff',
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          {navItems.map(({ text, icon, path }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => navigate(path)}
                sx={{
                  bgcolor: location.pathname === path ? '#e0e0e0' : 'inherit',
                  color: location.pathname === path ? '#000' : '#fff',
                  '&:hover': {
                    bgcolor: '#333',
                  },
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === path ? '#000' : '#fff' }}>
                  {icon}
                </ListItemIcon>
                {open && <ListItemText primary={text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#121212', color: '#fff' }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
