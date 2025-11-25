import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext"; // Import

const ProductDetails = () => {
  const { addToCart } = useContext(ShopContext); // Get addToCart from Context
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <img src={product.image} alt={product.title} style={styles.image} />
      <div style={styles.info}>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h3>${product.price}</h3>
        {/* Use the function from context */}
        <button onClick={() => addToCart(product)} style={styles.btn}>
          Add To Cart
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { display: "flex", gap: "40px", padding: "40px", maxWidth: "900px", margin: "auto" },
  image: { width: "300px", objectFit: "contain" },
  info: { display: "flex", flexDirection: "column", justifyContent: "center" },
  btn: { padding: "12px 25px", background: "green", color: "white", border: "none", cursor: "pointer", fontSize: "16px" }
};

export default ProductDetails;