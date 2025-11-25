import React, { useContext } from "react"; // 1. Import useContext
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext"; // 2. Import the created context

const Navbar = () => {
  // 3. Grab data directly from context
  const { token, logout, cart } = useContext(ShopContext); 

  return (
    <nav style={styles.nav}>
      <h1 style={{ margin: 0 }}>MyStore</h1>
      <div style={styles.links}>
        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/cart">Cart ({cart.length})</Link>
        
        {token ? (
          <button onClick={logout} style={styles.logoutBtn}>Logout</button>
        ) : (
          <Link style={styles.link} to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", background: "#282c34", color: "white" },
  links: { display: "flex", gap: "20px", alignItems: "center" },
  link: { color: "white", fontSize: "18px" },
  logoutBtn: { background: "red", color: "white", border: "none", padding: "8px 12px", borderRadius: "4px" }
};

export default Navbar;