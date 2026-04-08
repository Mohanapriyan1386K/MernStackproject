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
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderTop: "1px solid #e6e6e6",
        borderBottom: "1px solid #e6e6e6",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            px: { xs: 1, md: 2 },
            py: { xs: 1.5, md: 2 },
            overflowX: "auto",
            scrollbarWidth: "thin",
          }}
        >
          <Stack
            direction="row"
            spacing={{ xs: 2, md: 3 }}
            sx={{
              alignItems: "center",
              width: "max-content",
              mx: "auto",
            }}
          >
            {categories.map((item) => (
              <Box
                key={item.label}
                component={NavLink}
                to={item.to}
                aria-label={item.label}
                sx={({ isActive }: any) => ({
                  minWidth: 80,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0.5,
                  color: isActive ? "#1a73e8" : "#111827",
                  cursor: "pointer",
                  pb: 0.5,
                  borderBottom: "3px solid",
                  borderBottomColor: isActive ? "#1a73e8" : "transparent",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                  "&:visited": { color: isActive ? "#1a73e8" : "#111827" },
                  "&:hover": {
                    color: "#1a73e8",
                    borderBottomColor: "#1a73e8",
                  },
                  "& svg": {
                    fontSize: 26,
                  },
                })}
              >
                <Box
                  sx={{
                    height: 46,
                    width: 46,
                    borderRadius: "12px",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: "#f4f6fb",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, whiteSpace: "nowrap" }}
                >
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>
      <Box sx={{ py: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Subnavbar;
