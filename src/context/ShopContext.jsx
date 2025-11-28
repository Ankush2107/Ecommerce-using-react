import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("userToken") ?? null);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("userToken");
    toast.info("You have logged out.");
  };

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      toast.info(`Increased quantity of ${product.title}`);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      toast.success("Item added to cart!");
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    toast.error("Item removed from cart.");
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          // If quantity is greater than 1, decrease it
          return { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 };
        }
        return item;
      })
    );
  };
  
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  }

  const value = {
    token,
    setToken,
    logout,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};