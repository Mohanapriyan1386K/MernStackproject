import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import {
  Box,
  Paper,
  Tab,
  Tabs,
  Divider,
  Typography,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";

import { createUser, login } from "../../Service/Service";
import CustomTextField from "../../component/CustomTextField";
import { Navigate } from "react-router-dom";
import CustomButton from "../../component/CustomButton";

type AuthTab = "login" | "signup";

export default function AuthPage() {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const [tab, setTab] = useState<AuthTab>("login");

  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().min(6).required("Password required"),
  });

  const signupSchema = Yup.object({
    username: Yup.string().required("Username required"),
    name: Yup.string().required("Name required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().min(6).required("Password required"),
  });

  const getErrorMessage = (error: unknown, fallback: string) => {
    if (error && typeof error === "object" && "response" in error) {
      const response = (error as any).response;
      if (response?.data?.message) return response.data.message;
    }
    if (error instanceof Error) return error.message;
    return fallback;
  };

  const loginFormik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      toast.loading("Signing in...", { id: "login" });
      try {
        const res = await login(values);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data));
        toast.success(res?.data?.message || "Login success", {
          id: "login",
        });
        window.location.href = "admin/dashboard";
      } catch (error) {
        toast.error(getErrorMessage(error, "Login failed"), { id: "login" });
      }
    },
  });

  const signupFormik = useFormik({
    initialValues: { username: "", name: "", email: "", password: "" },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        const res = await createUser({
          name: values.name,
          user_name: values.username,
          email: values.email,
          password: values.password,
        });

        localStorage.setItem("token", res.data.token);
        signupFormik.resetForm();
      } catch (error) {
        toast.error(getErrorMessage(error, "Signup failed"), { id: "signup" });
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url('/images/auth-bg.jpg')`, // <-- your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: "rgba(0,0,0,0.4)", // dark overlay for readability
        },
        p: 2,
      }}
    >
      <Toaster position="top-center" />

      <Paper
        sx={{
          width: { xs: "100%", sm: 400 },
          p: 4,
          borderRadius: 3,
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          background: "#fff",
          position: "relative", // so it sits above overlay
          zIndex: 1,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          fontWeight="bold"
          sx={{ mb: 2, color: "#333" }}
        >
          {tab === "login" ? "Welcome Back!" : "Create an Account"}
        </Typography>

        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            mb: 2,
            "& .MuiTabs-indicator": {
              height: 3,
              borderRadius: 3,
              backgroundColor: "#008080",
            },
          }}
        >
          <Tab
            label="Login"
            value="login"
            sx={{
              "&.Mui-selected": {
                color: "#008080", 
              },
            }}
          />
          <Tab
            label="Sign Up"
            value="signup"
            sx={{
              "&.Mui-selected": {
                color: "#008080", 
              },
            }}
          />
        </Tabs>
        <Divider sx={{ my: 2 }} />

        {tab === "login" ? (
          <form onSubmit={loginFormik.handleSubmit}>
            <CustomTextField
              name="email"
              placeholder="Enter Email"
              formik={loginFormik}
              startIcon={<EmailIcon />}
              height={50}
            />

            <CustomTextField
              placeholder="Password"
              name="password"
              type="password"
              formik={loginFormik}
              startIcon={<LockIcon />}
              height={50}
            />

            <CustomButton
              label="Login"
              fullWidth
              type="submit"
              variant="contained"
            />
          </form>
        ) : (
          <form onSubmit={signupFormik.handleSubmit}>
            <CustomTextField
              placeholder="Enter Username"
              name="username"
              formik={signupFormik}
              startIcon={<PersonIcon />}
              sizeVariant="small"
              height={50}
            />

            <CustomTextField
              placeholder="Enter Name"
              name="name"
              formik={signupFormik}
              startIcon={<PersonIcon />}
              height={50}
            />

            <CustomTextField
              placeholder="Enter Email"
              name="email"
              formik={signupFormik}
              startIcon={<EmailIcon />}
              height={50}
            />

            <CustomTextField
              placeholder="Password"
              name="password"
              type="password"
              formik={signupFormik}
              startIcon={<LockIcon />}
              height={50}
            />

            <CustomButton
              label="Create Account"
              fullWidth
              type="submit"
              variant="contained"
              backgroundColor="#008080"
            />
          </form>
        )}
      </Paper>
    </Box>
  );
}
