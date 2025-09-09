import React from "react";
import "./popular.css";
import data from "../Assests/data";
import Item from "../Item/Item";
const Popular = () => {
  return (
    <div className="popular">
      <h1>Popular Items</h1>
      <hr />
      <div className="popular-items">
        {data.map((item, i) => (
          <Item
            key={i}
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

export default Popular;
