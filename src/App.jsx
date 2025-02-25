import React, { useState } from "react";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import useAuthStore from "./myStore";
import Categories from "./pages/Categories";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const stateAuth = useAuthStore();
  console.log(stateAuth);

  if (!stateAuth.user) {
    return (
      <>
        <LoginPage />
      </>
    );
  } else {
    return (
      <div className="h-screen bg-gray-100">
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="flex w-full">
          <Sidebar collapsed={collapsed} />

          <Routes>
            <Route path="/" element={<HomePage collapsed={collapsed} />} />
            <Route
              path="/products"
              element={<ProductPage collapsed={collapsed} />}
            />
            <Route
              path="/categories"
              element={<Categories collapsed={collapsed} />}
            />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
