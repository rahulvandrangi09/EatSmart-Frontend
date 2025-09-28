import React, { useContext } from "react";
import "./item.css";
import { Link, useNavigate } from "react-router-dom";
import { Dailycontext } from "../../Context/Dailycontext";

const Item = ({ id, img, name, new_price, old_price }) => {
  const { addToCart, removeFromCart, cartItem } = useContext(Dailycontext);
  const quantity = cartItem[id] || 0;
  const navigate = useNavigate();

  const handleAdd = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Please login first to add items to your cart.");
      navigate("/login");
      return;
    }
    addToCart(id);
  };

  const handleRemove = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Please login first to remove items from your cart.");
      navigate("/login");
      return;
    }
    removeFromCart(id);
  };

  return (
    <div className="item" data-id={id}>
      <div className="item-img">
        <Link to={`/product/${String(id)}`}>
          <img src={img} alt={name} />
        </Link>
      </div>

      <p className="item-name">{name}</p>

      <div className="item-price-list">
        <div className="item-price-new">₹{new_price}</div>
        <div className="item-price-old">₹{old_price}</div>
      </div>

      <div className="cart-controls">
        <button onClick={handleRemove} disabled={quantity === 0}>
          −
        </button>
        <span>{quantity}</span>
        <button onClick={handleAdd}>+</button>
      </div>
    </div>
  );
};

export default Item;
