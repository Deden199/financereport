import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import GroupsIcon from "@mui/icons-material/Groups";
import PaymentsIcon from "@mui/icons-material/Payments";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const FULL_WIDTH = 240;
const MINI_WIDTH = 72;

export default function Sidebar({
  isDesktop,
  expanded,
  mobileOpen,
  onToggleSidebar
}) {
  const location = useLocation();

  // Daftar menu
  const menuItems = [
    { text: "Dashboard", path: "/", icon: <DashboardIcon /> },
    { text: "Master Toko", path: "/master-toko", icon: <StoreIcon /> },
    { text: "Master Investor", path: "/master-investor", icon: <GroupsIcon /> },
    { text: "Kepemilikan", path: "/kepemilikan", icon: <PaymentsIcon /> },
    { text: "Dividen", path: "/dividen", icon: <PaymentsIcon /> },
    { text: "Histori", path: "/histori", icon: <HistoryEduIcon /> },
    { text: "Transactions", path: "/transactions", icon: <ReceiptLongIcon /> },
  ];

  if (isDesktop) {
    // Desktop => mini variant
    const drawerWidth = expanded ? FULL_WIDTH : MINI_WIDTH;

    return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            position: "relative",
            whiteSpace: "nowrap",
            width: drawerWidth,
            transition: "width 0.3s",
            overflowX: "hidden",
            borderRight: "1px solid #e0e0e0",
            background: "linear-gradient(135deg, #7E57C2 30%, #5C6BC0 100%)",
            color: "#fff",
          },
        }}
        open={expanded}
      >
        {/* Header (logo/brand) */}
        <Box
          sx={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: expanded ? "center" : "flex-start",
            px: 2
          }}
        >
          {expanded ? (
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Finance Panel 123
            </Typography>
          ) : (
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              FP
            </Typography>
          )}
        </Box>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

        <List sx={{ py: 2 }}>
          {menuItems.map((item) => {
            const selected = location.pathname === item.path;
            return (
              <ListItemButton
                component={Link}
                to={item.path}
                key={item.text}
                sx={{
                  mb: 1,
                  mx: 1,
                  borderRadius: 2,
                  backgroundColor: selected
                    ? "rgba(255,255,255,0.2)"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)"
                  },
                  justifyContent: expanded ? "initial" : "center"
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "#fff",
                    minWidth: 0,
                    mr: expanded ? 2 : "auto"
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {expanded && (
                  <ListItemText primary={item.text} />
                )}
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
    );
  }

  // Mobile => temporary
  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={onToggleSidebar}
      sx={{
        "& .MuiDrawer-paper": {
          width: FULL_WIDTH,
          background: "linear-gradient(135deg, #7E57C2 30%, #5C6BC0 100%)",
          color: "#fff"
        }
      }}
    >
      {/* Header in mobile */}
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          px: 2
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Finance Panel 123
        </Typography>
      </Box>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      <List sx={{ py: 2 }}>
        {menuItems.map((item) => {
          const selected = location.pathname === item.path;
          return (
            <ListItemButton
              component={Link}
              to={item.path}
              key={item.text}
              onClick={onToggleSidebar}
              sx={{
                mb: 1,
                mx: 1,
                borderRadius: 2,
                backgroundColor: selected
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)"
                }
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
}
