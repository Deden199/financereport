import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar({ onMenuClick }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(135deg, #512DA8 30%, #303F9F 100%)",
      }}
      elevation={2}
    >
      <Toolbar sx={{ justifyContent:"space-between" }}>
        <Box sx={{ display:"flex", alignItems:"center", gap:1 }}>
          <IconButton onClick={onMenuClick} sx={{ color:"#fff" }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight:700, color:"#fff" }}>
            Finance 123
          </Typography>
        </Box>

        <Box>
          <IconButton onClick={handleUserMenu}>
            <Avatar alt="User" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
