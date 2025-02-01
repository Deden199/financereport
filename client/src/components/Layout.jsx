import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Desktop => expand/collapse
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  // Mobile => overlay drawer open/close
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleSidebar = () => {
    if (isDesktop) {
      setSidebarExpanded(!sidebarExpanded);
    } else {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        isDesktop={isDesktop}
        expanded={sidebarExpanded}
        mobileOpen={mobileOpen}
        onToggleSidebar={handleToggleSidebar}
      />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Navbar onMenuClick={handleToggleSidebar} />
        <Box component="main" sx={{ p:2, flexGrow:1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
