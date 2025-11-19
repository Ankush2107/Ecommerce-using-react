import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ token, cartCount, handleLogout }) => {
  return (
    <nav style={styles.nav}>
      <h1 style={{ margin: 0 }}>MyStore</h1>
      <div style={styles.links}>
        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/cart">Cart ({cartCount})</Link>
        {token ? (
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
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