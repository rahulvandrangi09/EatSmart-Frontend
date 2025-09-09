// src/Item/Item.jsx
import React, { useContext } from "react";
import "./item.css";
import { Link } from "react-router-dom";
import { Dailycontext } from "../../Context/Dailycontext";

const Item = ({ id, img, name, new_price, old_price }) => {
  const { addToCart, removeFromCart, cartItem } = useContext(Dailycontext);
  const quantity = cartItem[id] || 0;

  return (
    <div className="item" data-id={id}>
      <div className="item-img">
        <Link to={`/product/${id}`}>
          <img src={img} alt={name} />
        </Link>
      </div>

      <p className="item-name">{name}</p>

      <div className="item-price-list">
        <div className="item-price-new">₹{new_price}</div>
        <div className="item-price-old">₹{old_price}</div>
      </div>

      {/* Add / Remove buttons */}
      <div className="cart-controls">
        <button onClick={() => removeFromCart(id)} disabled={quantity === 0}>
          −
        </button>
        <span>{quantity}</span>
        <button onClick={() => addToCart(id)}>+</button>
      </div>
    </div>
  );
};

export default Item;
