import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Login from "./components/Login";

function App() {
  // No state here anymore!
  // No helper functions here anymore!

  return (
    <BrowserRouter>
      {/* No props passed to Navbar */}
      <Navbar /> 
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Products />} />
          {/* No props passed to pages */}
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;