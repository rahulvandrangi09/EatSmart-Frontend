import React, { useContext } from "react";
import "./cartitems.css";
import { Dailycontext } from "../../Context/Dailycontext";
import removeicon from "../Assests/cart_cross_icon.png";

const Cartitems = () => {
  const { getTotal, all_products, cartItem, addToCart, removeFromCart } =
    useContext(Dailycontext);

  const handleAdd = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Please login first to add items to your cart.");
      window.location.href = "/login";
      return;
    }
    addToCart(id);
  };

  const handleRemove = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Please login first to remove items from your cart.");
      window.location.href = "/login";
      return;
    }
    removeFromCart(id);
  };

  return (
    <div className="cartitems">
      <div className="cartitemformatmain">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {Object.keys(cartItem).map((id) => {
        const quantity = cartItem[id];
        if (quantity === 0) return null;

        const product = all_products.find((p) => String(p.id) === String(id));

        if (!product) return null;

        return (
          <div key={id}>
            <div className="cartitemsformat cartitemformatmain">
              <img src={product.image} alt={product.name} className="carticon" />
              <p>{product.name}</p>
              <p>₹{product.new_price}</p>
              <div className="cartitemsquantity-controls">
                <button onClick={() => handleRemove(product.id)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleAdd(product.id)}>+</button>
              </div>
              <p>₹{product.new_price * quantity}</p>
              <img
                src={removeicon}
                className="carticonremove"
                onClick={() => handleRemove(product.id)}
                alt="Remove"
              />
            </div>
            <hr />
          </div>
        );
      })}

      <div className="classitemsdown">
        <div className="cartitemstotals">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitemstotalitem">
              <p>Sub-Total</p>
              <p>₹{getTotal()}</p>
            </div>
            <hr />
            <div className="cartitemstotalitem">
              <p>Delivery Charge</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitemstotalitem">
              <h3>Total</h3>
              <h3>₹{getTotal()}</h3>
            </div>
          </div>
          <button
            onClick={() => {
              const token = localStorage.getItem("token");
              if (!token) {
                alert("⚠️ Please login first to checkout.");
                window.location.href = "/login";
                return;
              }
              alert("✅ Proceeding to checkout...");
            }}
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cartitems;
