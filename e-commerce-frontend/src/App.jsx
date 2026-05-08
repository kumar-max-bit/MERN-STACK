import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style.css";
import LandingPage from "./pages/LandingPages";
import { createContext, useState } from "react";
import CartPage from "./pages/Cards";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

const App = () => {
  const [items, setItems] = useState([]);

  const addToCart = (product) => {
    const isPresent = items.some((item) => item.id === product.id);
    if (!isPresent) {
      setItems((prevItems) => [...prevItems, product]);
    }
  };

  const removeFromCart = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  return (
    <BrowserRouter>
      <CartContext.Provider value={{ items, addToCart, removeFromCart }}>
        <NavBar />
        <Routes>
          <Route path="" element={<LandingPage />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="products" element={<Products />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cart" element={<CartPage />} />
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  );
}; 

export default App;