/* eslint-disable react-hooks/set-state-in-render */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  const addToCart = (product) => {
    const isPresent = items.some((item) => item.id === product.id);
    if (!isPresent) {
      setItems((prevItems) => [...prevItems, product]);
    }
  };

  //function to get stored token
  const getToken = () => {
    // Check if a token exists in localStorage
    const token = !!localStorage.getItem("token");
    setIsLogin(token);
  };

  useEffect(() => {
    getToken();
  }, []);

  const removeFromCart = (productToRemove) => {
    const afterRemovedProducts = items.filter(
      (item) => item.id !== productToRemove.id
    );
    setItems(afterRemovedProducts);
  };

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, isLogin, setIsLogin }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;