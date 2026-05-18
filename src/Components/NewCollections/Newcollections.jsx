import React, { useContext } from "react";
import "./newcollections.css";
import Item from "../Item/Item";
import { Dailycontext } from "../Context/Dailycontext";

const Newcollections = () => {
  const { all_products, loading } = useContext(Dailycontext);

  const dailyEssentials = all_products.filter(
    (p) => !p.expiry_date || p.expiry_date === null
  );

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
