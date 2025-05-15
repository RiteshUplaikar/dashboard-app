import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../../pages/login";
import UserPage from "../../pages/user";
import AdminPage from "../../pages/admin";
import StoreOwnerPage from "../../pages/store-owner";
import RegisterPage from "../../pages/register";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/store-owner" element={<StoreOwnerPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default AppRoutes;
