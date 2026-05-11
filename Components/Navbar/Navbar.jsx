import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../Assests/shopping.png";
import cart from "../Assests/shopping-cart.png";
import moon from "../Assests/moon.png";
import sun from "../Assests/sun.png";
import { Link } from "react-router-dom";
import { Dailycontext } from "../../Context/Dailycontext";
const Navbar = () => {
  const [menu, setMenu] = useState("Daily Essentials");
  const { gettotalitems } = useContext(Dailycontext);
  const isLoggedIn = localStorage.getItem("token"); 
  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>EatSmart</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("Daily Essentials")}>
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            Daily Essentials
          </Link>
          {menu === "Daily Essentials" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Smart Recipes")}>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/smartrecipes"
          >
            Smart Recipes
          </Link>
          {menu === "Smart Recipes" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Quick Discounts")}>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/quickdiscounts"
          >
            Quick Discounts
          </Link>
          {menu === "Quick Discounts" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Pure Ayurveda")}>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/alfredai"
          >
            Alfred AI
          </Link>
          {menu === "Pure Ayurveda" ? <hr /> : null}
        </li>
      </ul>
      <div className="nav-login-cart">
        {!isLoggedIn && (
          <Link style={{ textDecoration: "none", color: "black" }} to="/login">
            <button onClick={() => setMenu("Login")}>Login</button>
          </Link>
        )}
        {
          isLoggedIn && (
            <button onClick={() => logout()}>Logout</button>
          )
        }
        <Link style={{ textDecoration: "none", color: "black" }} to="/cart">
          <img src={cart} alt="cart" />
        </Link>
        <div className="nav-cart-count">{gettotalitems()}</div>
      </div>
    </div>
  );
};

export default Navbar;