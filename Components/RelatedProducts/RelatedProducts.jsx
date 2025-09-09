import React from "react";
import data from "../Assests/data";
import "./relatedproducts.css";
import Item from "../Item/Item";
const RelatedProducts = () => {
  return (
    <div className="relatedproducts">
      <h1>Also Check Out</h1>
      <hr />
      <div className="relateditems">
        {data.map((product, i) => (
          <Item
            key={i}
            id={product.id}
            img={product.image}
            name={product.name}
            new_price={product.new_price}
            old_price={product.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
