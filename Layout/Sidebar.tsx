import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  AppBar,
  CssBaseline,
  Avatar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { PropaneTankRounded } from "@mui/icons-material";
import CustomButton from "../src/component/CustomButton";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../src/Redux/Slice/modalSlice";

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
  { text: "User Management", path: "/admin/users", icon: <PeopleIcon /> },
  { text: "Product Management", path: "/admin/product", icon: <PropaneTankRounded /> },
  { text: "Order Management", path: "/admin/orders", icon: <ShoppingCartIcon /> },
  { text: "Settings", path: "/admin/settings", icon: <SettingsIcon /> },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.clear();
    dispatch(closeModal());
    navigate("/login");
  };

  const handelmodalopen = () => {
    dispatch(
      openModal({
        modalname: "DELETE",
        modalprops: {
          title: "Logout",
          size: "xs",
          mode: "Logout",
          onDelete: handleLogout,
        },
      }),
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "#ffffff",
          color: "#111",
          borderBottom: "1px solid #eaeaea",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Admin Panel
          </Typography>
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar />
            <p>Mohan</p>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#ffffff",
            color: "#333",
            borderRight: "1px solid #eaeaea",
            boxShadow: "2px 0 10px rgba(0,0,0,0.05)",
          },
        }}
      >
        <Toolbar />
        <List sx={{ px: 1.5 }}>
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: "10px",
                    mb: 1,
                    px: 2,
                    py: 1.2,
                    position: "relative",
                    transition: "all 0.25s ease",

                    backgroundColor: active ? "#008080" : "transparent",

                    "&:hover": {
                      backgroundColor: "#c6cbd2e4",
                      transform: "translateX(-2px)",
                    },

                    "&::before": active
                      ? {
                          content: '""',
                          position: "absolute",
                          left: 0,
                          top: 6,
                          bottom: 6,
                          width: "3px",
                          borderRadius: "4px",
                          backgroundColor: "#6366f1",
                          transform: "translateX(-2px)", // accent color
                        }
                      : {},
                  }}
                >
                  <Box
                    sx={{
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                      color: active ? "white" : "#777",
                    }}
                  >
                    {item.icon}
                  </Box>

                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: active ? 600 : 500,
                      fontSize: "0.95rem",
                      color: active ? "white" : "#555",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Box sx={{ flexGrow: 1 }} /> {/* Push logout button to bottom */}
        <Box sx={{ p: 2 }}>
          <CustomButton
            fullWidth
            label="Logout"
            backgroundColor="#C62828"
            onClick={handelmodalopen}
          />
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          background: "#f8fafc",
          minHeight: "100vh",
          width: 200,
          margin: "0 auto",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Sidebar;
