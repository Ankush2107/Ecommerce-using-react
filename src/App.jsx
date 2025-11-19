import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState(localStorage.getItem("userToken") ?? null);
  const [cart, setCart] = useState([]);

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

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("userToken");
    setCart([]);
  };

  return (
    <BrowserRouter>
      <Navbar token={token} cartCount={cart.length} handleLogout={handleLogout} />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;