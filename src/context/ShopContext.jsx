import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  

  const [token, setToken] = useState(localStorage.getItem("userToken") ?? null);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("userToken");
  };

  // --- Cart Logic ---
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
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert("Added to cart!");
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // --- Value Object ---
  // This is what will be available to any component in your app
  const value = {
    token,
    setToken,
    logout,
    cart,
    addToCart,
    removeFromCart
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};