import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext"; // Import

const Cart = () => {
  // Get cart and removeFromCart from Context
  const { cart, removeFromCart } = useContext(ShopContext); 

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) return <h2 style={{ textAlign: "center" }}>Cart is Empty</h2>;

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2>Your Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item.id} style={styles.item}>
          <img src={item.image} alt={item.title} style={{ width: "60px" }} />
          <div style={{ flex: 1, padding: "0 20px" }}>
            <h4>{item.title}</h4>
            <p>${item.price} x {item.quantity}</p>
          </div>
          <button onClick={() => removeFromCart(item.id)} style={styles.removeBtn}>
            Remove
          </button>
        </div>
      ))}
      <div style={styles.total}>
        <h3>Total Amount: ${total.toFixed(2)}</h3>
      </div>
    </div>
  );
};

const styles = {
  item: { display: "flex", alignItems: "center", borderBottom: "1px solid #eee", padding: "15px 0" },
  removeBtn: { background: "red", color: "white", border: "none", padding: "8px 12px" },
  total: { textAlign: "right", marginTop: "20px" }
};

export default Cart;