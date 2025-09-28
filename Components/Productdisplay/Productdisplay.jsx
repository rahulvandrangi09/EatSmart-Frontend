import React, { useContext } from "react";
import "./productdisplay.css";
import star from "../Assests/star_icon.png";
import star_dull from "../Assests/star_dull_icon.png";
import { Dailycontext } from "../../Context/Dailycontext";
import { useParams } from "react-router-dom";

const Productdisplay = () => {
  const { productId } = useParams(); // ✅ match route param
  const { all_products, addToCart, loading } = useContext(Dailycontext);

  if (loading) return <div className="not-found">⏳ Loading...</div>;

  const product = all_products.find((p) => String(p.id) === String(productId));

  
  if (!product) return <div className="not-found">⚠️ Product not found</div>;

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplayimg">
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
        </div>
        <div className="productdisplayimage2">
          <img
            src={product.image}
            className="productdisplay-main"
            alt={product.name}
          />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star} alt="star" />
          <img src={star} alt="star" />
          <img src={star} alt="star" />
          <img src={star} alt="star" />
          <img src={star_dull} alt="star dull" />
        </div>

        <div className="productprice">
          <div className="productpriceold">₹{product.old_price}</div>
          <div className="productpricenew">₹{product.new_price}</div>
        </div>

        <button onClick={() => addToCart(product.id)}>Add to cart</button>
      </div>
    </div>
  );
};

export default Productdisplay;
