import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  Button,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ backgroundColor: "#2874f0" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Logo */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Flipkart
        </Typography>

        {/* Search Bar */}
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "4px",
            px: 2,
            py: 0.5,
            width: "40%",
          }}
        >
          <InputBase placeholder="Search for products, brands and more" fullWidth />
        </Box>

        {/* Right Side */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "white", color: "#2874f0" }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>

          <Button
            startIcon={<ShoppingCart />}
            sx={{ color: "white" }}
          >
            Cart
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
