import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../screen/HomeScreen/Home";
import Fashion from "../screen/HomeScreen/Fashion";

import AuthPage from "../screen/AuthScreen/AuthPage";

import MainLayout from "../../Layout/MainLayout";
import Subnavbar from "../../Layout/Subnavbar";

import AdminLayout from "../../Layout/AdminLayout";
import Dashboard from "../screen/Admin/Dashboard";
import UserMangement from "../screen/Admin/UserMangement";
import OrderMangement from "../screen/Admin/OrderMangement";
import Settings from "../screen/Admin/Settings";
import ProtectedRoute from "./ProtectedRoute";
import Products from "../screen/Admin/Products"

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route element={<Subnavbar />}>
            <Route index element={<Home />} />
            <Route path="fashion" element={<Fashion />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute/>} >
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route  path="product" element={<Products/>}  />
            <Route path="users" element={<UserMangement />} />
            <Route path="orders" element={<OrderMangement />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
