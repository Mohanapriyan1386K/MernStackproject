import { NavLink, Outlet } from "react-router-dom";
import { Box, Container, Stack, Typography } from "@mui/material";
import {
  Checkroom,
  Smartphone,
  Face,
  Memory,
  Home as HomeIcon,
  Kitchen,
  Toys,
  Restaurant,
  DirectionsCar,
  TwoWheeler,
  SportsCricket,
  MenuBook,
  Chair,
  Favorite,
} from "@mui/icons-material";

function Subnavbar() {
  const categories = [
    { label: "For You", icon: <Favorite />, to: "/" },
    { label: "Fashion", icon: <Checkroom />, to: "/fashion" },
    { label: "Mobiles", icon: <Smartphone />, to: "/mobiles" },
    { label: "Beauty", icon: <Face />, to: "/beauty" },
    { label: "Electronics", icon: <Memory />, to: "/electronics" },
    { label: "Home", icon: <HomeIcon />, to: "/home" },
    { label: "Appliances", icon: <Kitchen />, to: "/appliances" },
    { label: "Toys & Baby", icon: <Toys />, to: "/toys-baby" },
    { label: "Food & Health", icon: <Restaurant />, to: "/food-health" },
    { label: "Auto Acc.", icon: <DirectionsCar />, to: "/auto-accessories" },
    { label: "2 Wheeler", icon: <TwoWheeler />, to: "/two-wheeler" },
    { label: "Sports", icon: <SportsCricket />, to: "/sports" },
    { label: "Books", icon: <MenuBook />, to: "/books" },
    { label: "Furniture", icon: <Chair />, to: "/furniture" },
  ];

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#fff",
          borderBottom: "1px solid #e5e7eb",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              px: { xs: 1, md: 2 },
              py: 1.5,
              overflowX: "auto",
              display: "flex",
              justifyContent: "center",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <Stack
              direction="row"
              spacing={{ xs: 2, md: 3 }}
              sx={{
                alignItems: "center",
                width: "max-content",
              }}
            >
              {categories.map((item) => (
                <Box
                  key={item.label}
                  component={NavLink}
                  to={item.to}
                  sx={({ isActive }: any) => ({
                    minWidth: 60,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0.8,
                    textDecoration: "none",
                    color: isActive ? "#1976d2" : "#374151",
                    transition: "all 0.25s ease",
                  })}
                >
                  {/* ICON BOX */}
                  <Box
                    sx={({ isActive }: any) => ({
                      height: 50,
                      width: 50,
                      borderRadius: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: isActive ? "#e3f2fd" : "#f9fafb",
                      border: isActive
                        ? "1px solid #1976d2"
                        : "1px solid #e5e7eb",
                      boxShadow: isActive
                        ? "0 4px 12px rgba(25, 118, 210, 0.25)"
                        : "0 2px 6px rgba(0,0,0,0.05)",
                      transition: "all 0.3s ease",

                      "&:hover": {
                        backgroundColor: "#e3f2fd",
                        transform: "translateY(-2px)",
                      },
                      "&:active": {
                        backgroundColor: "#bbdefb", // slightly darker shade
                        transform: "translateY(0px)", // reset or press effect
                      },

                      "& svg": {
                        fontSize: 26,
                      },
                    })}
                  >
                    {item.icon}
                  </Box>

                  {/* LABEL */}
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                      textAlign: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* PAGE CONTENT */}
      <Box sx={{ py: 2 }}>
        <Outlet />
      </Box>
    </>
  );
}

export default Subnavbar;
