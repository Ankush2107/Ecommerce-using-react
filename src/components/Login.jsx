import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("mor_2314"); 
  const [password, setPassword] = useState("83r5^_");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("https://fakestoreapi.com/auth/login", {
        username,
        password,
      });
      setToken(res.data.token);
      localStorage.setItem("userToken", res.data.token);
      navigate("/");
    } catch (err) {
      setError("Login failed. Check console or use valid credentials.");
    }
  };
  return (
    <div style={{ maxWidth: "300px", margin: "50px auto", textAlign: "center" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input 
          type="text" value={username} onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username" style={{ padding: "10px" }}
        />
        <input 
          type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" style={{ padding: "10px" }}
        />
        <button type="submit" style={{ padding: "10px", background: "#282c34", color: "white" }}>
          Login
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;