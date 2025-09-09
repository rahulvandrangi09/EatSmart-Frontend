import React from "react";
import "./newcollections.css";
import Item from '../Item/Item'
import new_collections from "../Assests/new_collections";
const Newcollections = () => {
  return (
    <div className="newcollections">
      <h1>Daily Essentials</h1>
      <hr />
      <div className="collections">
        {new_collections.map((item, i) => (
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

export default Newcollections;
