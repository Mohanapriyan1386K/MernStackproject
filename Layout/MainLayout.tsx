import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Box } from "@mui/material";

function MainLayout() {
  return (
    <div style={{ position: "relative" }}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e6e6e6",
        }}
      >
        <Navbar />
      </Box>
      <Box sx={{pt:8}} >
      <Outlet />

      </Box>
    </div>
  );
}

export default MainLayout;
