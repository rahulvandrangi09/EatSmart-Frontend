import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ✅ The Signup component must accept the 'switchToLogin' prop.
const Signup = ({ switchToLogin }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/signup`, form);
      localStorage.setItem("token", res.data.token);
      alert("Signup successful!");
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Signup failed!");
    }
  };

  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      <div className="auth-field">
        <input type="text" name="name" placeholder="Your Name" onChange={handleChange} />
      </div>
      <div className="auth-field">
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} />
      </div>
      <div className="auth-field">
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      </div>
      <div style={{ textAlign: 'left', marginBottom: '15px', fontSize: '14px' }}>
        <input type="checkbox" id="terms" />
        <label htmlFor="terms" style={{ marginLeft: '8px', color: '#666' }}>
          By continuing, I agree to the terms of use and policy
          <br />
          Already Have an account{" "}
          <span
            onClick={switchToLogin}
            style={{ cursor: "pointer", color: "#667eea", fontWeight: "600" }}
          >
            Click Here
          </span>
        </label>
      </div>
      <button className="auth-button" onClick={handleSubmit}>Continue</button>
    </div>
  );
};

export default Signup;