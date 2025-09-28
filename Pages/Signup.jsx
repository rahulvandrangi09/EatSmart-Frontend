import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CSS/login.css";

// ✅ The Signup component must accept the 'switchToLogin' prop.
const Signup = ({ switchToLogin }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", form);
      localStorage.setItem("token", res.data.token);
      alert("Signup successful!");
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Signup failed!");
    }
  };

  return (
    <div className="login">
      <div className="logincontainer">
        <h1>Sign Up</h1>
        <div className="loginfield">
          <input type="text" name="name" placeholder="Your Name" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        </div>
        <div className="terms">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            By continuing, I agree to the terms of use and policy
            <br />
            Already Have an account{" "}
            {/* ✅ CORRECTED: Use a clickable span with the `switchToLogin` prop */}
            <span
              onClick={switchToLogin}
              style={{ cursor: "pointer", color: "blue", fontWeight: "600" }}
            >
              Click Here
            </span>
          </label>
        </div>
        <button onClick={handleSubmit}>Continue</button>
      </div>
    </div>
  );
};

export default Signup;