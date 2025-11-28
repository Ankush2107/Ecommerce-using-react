import { useContext, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Checkout.css"

function Checkout() {
    const { cart, clearCart } = useContext(ShopContext);
    const navigate = useNavigate();

    const [ formData, setFormData ] = useState({
        name: "",
        email: "",
        address: "",
        card: ""
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.name || !formData.email || !formData.address || !formData.card) {
            toast.error("Please fill in all fields")
            return;
        }
        toast.success("Order placed successfully!🎉")
        clearCart();
        navigate("/");
    }
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    if(cart.length === 0) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Your cart is Empty</h2>
  return ( 
    <div className="container">
        <h2>Checkout</h2>
        <div className="summary">
            <h3>Total Amount: ${total.toFixed(2)}</h3>
            <p>Items: {cart.length}</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
            <div className="group">
                <label>full Name</label>
                <input className="input" type="text" name="name" onChange={handleChange} />
            </div>
            <div className="group">
                <label>Email</label>
                <input className="input" type="email" name="email" onChange={handleChange} />
            </div>
            <div className="group">
                <label>Shipping Address</label>
                <textarea className="textarea" name="address" onChange={handleChange} />
            </div>
            <div className="group">
                <label>Card Number</label>
                <input className="input" type="text" name="card" placeholder="1234 4567 7890 1679" maxLength="16" onChange={handleChange} />
            </div>
            <button className="btn" type="submit">Place Order</button>
        </form>
    </div>
  )
}


export default Checkout
