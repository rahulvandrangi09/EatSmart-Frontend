import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cartitems from "../Components/CartItems/Cartitems";

const Cart = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Please login to view your cart.");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <Cartitems />
    </div>
  );
};

export default Cart;
