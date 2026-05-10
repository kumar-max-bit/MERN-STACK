import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style.css";
import LandingPage from "./pages/LandingPages";
import CartPage from "./pages/Cards";
import CartProvider, { CartContext } from "./service/CartProvider";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/navBar";

const AppRoutes = () => {
  const { isLogin } = useContext(CartContext);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute authenticated={isLogin}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute authenticated={isLogin}>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute authenticated={isLogin}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute authenticated={isLogin}>
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;