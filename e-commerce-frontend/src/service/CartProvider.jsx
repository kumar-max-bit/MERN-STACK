/* eslint-disable react-hooks/set-state-in-render */

/* eslint-disable react-refresh/only-export-components */
import { createContext, useMemo, useState, useEffect } from "react";
import axios from "axios";
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  // Function to fetch cart from the backend
  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.get("http://localhost:5000/cart/get-cart", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.cart && response.data.cart.productsIds) {
        setItems(response.data.cart.productsIds);
      }
    } catch (error) {
      console.error("Failed to fetch cart from backend:", error);
    }
  };

  // Function to get stored token and set status
  const getToken = () => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  };

  // Monitor login status to fetch cart or clear state
  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (isLogin) {
      fetchCart();
    } else {
      setItems([]);
    }
  }, [isLogin]);

  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Local fallback if guest
      const exist = items.some((item) => item._id === product._id);
      if (!exist) {
        setItems([...items, product]);
      }
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/cart/add-cart",
        { productId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchCart();
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const removeToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Local fallback if guest
      const afterRemovedProducts = items.filter((item) => item._id !== product._id);
      setItems(afterRemovedProducts);
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/cart/remove-cart/${product._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchCart();
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeToCart, isLogin, setIsLogin, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
