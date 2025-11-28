import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext"; 
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(ShopContext); 

  const navigate = useNavigate();

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
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
           <button onClick={() => decreaseQuantity(item.id)}>-</button>
           <span>{item.quantity}</span>
           <button onClick={() => increaseQuantity(item.id)}>+</button>
        </div>
            <p>${item.price} x {item.quantity}</p>
          </div>
          <button onClick={() => removeFromCart(item.id)} style={styles.removeBtn}>
            Remove
          </button>
        </div>
      ))}
      <div style={styles.total}>
        <h3>Total Amount: ${total.toFixed(2)}</h3>

        <button style={styles.checkoutBtn} onClick={() => navigate("/checkout")}>
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

const styles = {
  item: { display: "flex", alignItems: "center", borderBottom: "1px solid #eee", padding: "15px 0" },
  removeBtn: { background: "red", color: "white", border: "none", padding: "8px 12px" },
  total: { textAlign: "right", marginTop: "20px" },
  checkoutBtn: {
    marginTop: "10px",
    padding: "12px 20px",
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "5px"
  }
};

export default Cart;