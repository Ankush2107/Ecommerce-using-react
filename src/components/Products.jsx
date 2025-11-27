import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); 
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) return <div style={{ textAlign: "center" }}>Loading products...</div>;

    const displayedProducts = products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = filter === "all" || product.category === filter;
      return matchesSearch && matchesCategory;
    });

  const getSortedProducts = [...displayedProducts].sort((a, b) => {
    if(sortOrder === "low") {
      return a.price - b.price
    }
    if(sortOrder === "high") {
      return b.price - a.price
    }
    return 0
  })



  return (
    <div>
      <div style={{ padding: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
        <input 
          type="text" 
          placeholder="Search products..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", width: "300px" }}
        />
        
        <select onChange={(e) => setFilter(e.target.value)} style={{ padding: "8px" }}>
          <option value="all">All Categories</option>
          <option value="men's clothing">Men</option>
          <option value="women's clothing">Women</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
        </select>

        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{fontWeight: "bold"}}>Sort by price: </span>
          <select onChange={(e) => setSortOrder(e.target.value)} style={{ padding: "8px" }}>
            <option value="">Default</option>
            <option value="low">Low to High</option>
            <option value="high">High to low</option>
          </select>
      </div>
      </div>
      <div style={styles.grid}>
        {getSortedProducts.length > 0 ?(getSortedProducts.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.title} style={styles.image} />
            <h4 style={{ height: "40px", overflow: "hidden" }}>{product.title}</h4>
            <p style={{ fontWeight: "bold" }}>${product.price}</p>
            <Link to={`/product/${product.id}`}>
              <button style={styles.btn}>View Details</button>
            </Link>
          </div>
        ))) : (
          <h3> No products Found</h3>
        )}
      </div>
    </div>
    
  );
};

const styles = {
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" },
  card: { border: "1px solid #ddd", borderRadius: "8px", padding: "15px", textAlign: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },
  image: { height: "150px", objectFit: "contain", marginBottom: "10px" },
  btn: { padding: "10px 20px", background: "#007bff", color: "white", border: "none", borderRadius: "4px" }
};

export default Products;