import React, { useContext } from "react";
import "./relatedproducts.css";
import Item from "../Item/Item";
import { Dailycontext } from "../../Context/Dailycontext";

const RelatedProducts = () => {
  const { all_products, loading } = useContext(Dailycontext);

  if (loading) return <div className="not-found">⏳ Loading...</div>;

  return (
    <div className="relatedproducts">
      <h1>Also Check Out</h1>
      <hr />
      <div className="relateditems">
        {all_products.slice(0, 8).map((product) => (
          <Item
            key={product.id}
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
