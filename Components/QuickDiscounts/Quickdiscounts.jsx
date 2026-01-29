// src/Pages/QuickDiscounts.jsx
import React, { useEffect, useState, useContext } from "react";
import Item from "../Item/Item";
import "./quickdiscounts.css";
import { Dailycontext } from "../../Context/Dailycontext";

const QuickDiscounts = () => {
  const [discountProducts, setDiscountProducts] = useState([]);
  const { all_products, setAllProducts } = useContext(Dailycontext);
  const [loading, setLoading] = useState(true);

  // Fetch products with expiry dates (Quick Discounts)
  useEffect(() => {
    const fetchDiscountProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/quickdiscounts");
        const data = await res.json();
        
        // Filter out any expired items (daysLeft <= 0) on frontend as well
        const validProducts = data.filter((p) => p.daysLeft > 0);
        setDiscountProducts(validProducts);

        
        setAllProducts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newOnes = validProducts.filter((p) => !existingIds.has(p.id));
          return [...prev, ...newOnes];
        });
      } catch (err) {
        console.error("Error fetching quick discounts:", err);
        setDiscountProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscountProducts();
  }, [setAllProducts]);

  return (
    <div className="quickdiscounts">
      <h1>⚡ Quick Discounts</h1>
      <hr />
      {loading ? (
        <p>Loading discounts...</p>
      ) : discountProducts.length > 0 ? (
        <div className="quickdiscounts-list">
          {discountProducts.map((item) => (
            <div key={item.id} className="quickdiscount-item">
              <div className="product-card">
                <div className="item-container">
                  <Item
                    id={item.id}
                    img={item.image}
                    name={item.name}
                    new_price={item.new_price}
                    old_price={item.old_price}
                  />
                  <div className="discount-box">
                    <span>
                      🕒{" "}
                      {item.daysLeft !== null && item.daysLeft > 0
                        ? `${item.daysLeft} days left until expiry` 
                        : "No expiry"}
                    </span>
                    <span> <br />
                      💸{" "}
                      {item.discount_percent
                        ? `${item.discount_percent}% off`
                        : "0%"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No discount items available at the moment. Come back later!</p>
      )}
    </div>
  );
};

export default QuickDiscounts;
