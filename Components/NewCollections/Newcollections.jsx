import React, { useEffect, useState } from "react";
import "./newcollections.css";
import Item from "../Item/Item";
import axios from "axios";

const Newcollections = () => {
  const [dailyEssentials, setDailyEssentials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/allproducts");
        const allProducts = res.data;

        // Filter products without expiry date or invalid expiry
        const essentials = allProducts
          .filter((p) => !p.expiry_date || p.expiry_date === null)
          .map((p) => ({
            ...p,
            new_price: p.old_price - p.old_price * 0.05, // 5% off as promo
          }));

        setDailyEssentials(essentials);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", margin: "40px" }}>
        <p>Loading products...</p>
      </div>
    );
  }

  if (dailyEssentials.length === 0) {
    return (
      <div style={{ textAlign: "center", margin: "40px" }}>
        <p>No daily essentials available.</p>
      </div>
    );
  }

  return (
    <div className="newcollections">
      <h1>Daily Essentials</h1>
      <hr />
      <div className="collections">
        {dailyEssentials.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            img={item.image}
            name={item.name}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Newcollections;
