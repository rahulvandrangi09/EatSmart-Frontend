import React, { useState } from "react";
import axios from "axios";
import "./CSS/login.css";

const Login = ({ switchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
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
    <div className="login">
      <div className="logincontainer">
        <h1>Login</h1>
        <div className="loginfield">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p className="loginalready">
          Don't have an account?{" "}
          <span
            onClick={switchToSignup}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
