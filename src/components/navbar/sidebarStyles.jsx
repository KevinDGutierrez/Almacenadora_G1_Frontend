export const drawerWidth = 240;

export const appBarSx = {
  zIndex: (theme) => theme.zIndex.drawer + 1,
  bgcolor: "#3b4353",
};

export const drawerSx = (open) => ({
  width: open ? drawerWidth : 64,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: open ? drawerWidth : 64,
    bgcolor: "#272125",
    color: "#c7c7c3",
    transition: "width 0.3s",
    overflowX: "hidden",
  },
});

export const listItemButtonSx = (open, active) => ({
  minHeight: 48,
  justifyContent: open ? "initial" : "center",
  px: 2.5,
  bgcolor: active ? "#2c2c2c" : "transparent",
  "&:hover": {
    bgcolor: "#333",
  },
});

export const listItemIconSx = (open) => ({
  color: "#fff",
  minWidth: 0,
  mr: open ? 3 : "auto",
  justifyContent: "center",
});

export const listItemTextSx = (open) => ({
  opacity: open ? 1 : 0,
});

export const mainContentSx = {
  flexGrow: 1,
  px: 3,
  pt: 2,
  bgcolor: "#121212",
  minHeight: "100vh",
  color: "#fff",
};
