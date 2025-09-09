import React, { useContext } from "react";
import "./cartitems.css";
import { Dailycontext } from "../../Context/Dailycontext";
import removeicon from "../Assests/cart_cross_icon.png";

const Cartitems = () => {
  const { getTotal, all_products, cartItem, addToCart, removeFromCart } =
    useContext(Dailycontext);

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

        // Find product info dynamically
        const product = all_products.find((p) => p.id === Number(id));
        if (!product) return null; // safety check

        return (
          <div key={id}>
            <div className="cartitemsformat cartitemformatmain">
              <img src={product.image} alt={product.name} className="carticon" />
              <p>{product.name}</p>
              <p>₹{product.new_price}</p>
              <div className="cartitemsquantity-controls">
                <button onClick={() => removeFromCart(product.id)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => addToCart(product.id)}>+</button>
              </div>
              <p>₹{product.new_price * quantity}</p>
              <img
                src={removeicon}
                className="carticonremove"
                onClick={() => removeFromCart(product.id)}
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
          <button>Proceed To Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cartitems;
