import React, { useState } from "react";
import axios from "axios";
import "./CSS/auth.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Login = ({ switchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      // ✅ Save token to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("✅ Login successful!");
      setError("");

      // Redirect after login (optional)
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.msg || "Login failed. Please check credentials."
      );
    }
  };

  return (
    <div className="auth-form">
      <h1>Login</h1>
      <div className="auth-field">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="auth-field">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="auth-button" onClick={handleLogin}>Login</button>

      {error && <p className="auth-error">{error}</p>}

      <p className="auth-switch">
        Don't have an account?{" "}
        <span onClick={switchToSignup}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
