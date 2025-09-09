import React, { useContext, useEffect, useState } from "react";
import { Dailycontext } from "../Context/Dailycontext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CartSpendingAnalysis = () => {
  const { cartItem, all_products } = useContext(Dailycontext);

  const [healthyTotal, setHealthyTotal] = useState(0);
  const [unhealthyTotal, setUnhealthyTotal] = useState(0);
  const [itemsList, setItemsList] = useState([]);

  const classifyItem = async (item) => {
    try {
      // Search OpenFoodFacts for the product
      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
          item.name
        )}&search_simple=1&json=1&page_size=1`
      );
      const data = await res.json();
      const product = data.products?.[0];

      // Default rule if no product found
      if (!product) {
        setHealthyTotal((prev) => prev + item.price);
        setItemsList((prev) => [...prev, item]);
        return;
      }

      // Simple health rule: if sugar per 100g > 10g OR fat > 10g → unhealthy
      const sugar = parseFloat(product.nutriments?.sugars_100g) || 0;
      const fat = parseFloat(product.nutriments?.fat_100g) || 0;

      if (sugar > 10 || fat > 10) {
        setUnhealthyTotal((prev) => prev + item.price);
      } else {
        setHealthyTotal((prev) => prev + item.price);
      }

      setItemsList((prev) => [...prev, item]);
    } catch (err) {
      console.error("OpenFoodFacts API error:", err);
      // Default fallback to healthy
      setHealthyTotal((prev) => prev + item.price);
      setItemsList((prev) => [...prev, item]);
    }
  };

  useEffect(() => {
    setHealthyTotal(0);
    setUnhealthyTotal(0);
    setItemsList([]);

    const cartItems = Object.keys(cartItem)
      .filter((id) => cartItem[id] > 0)
      .map((id) => {
        const product = all_products.find((p) => p.id === Number(id));
        return product
          ? { name: product.name, price: product.new_price * cartItem[id] }
          : null;
      })
      .filter(Boolean);

    cartItems.forEach((item) => classifyItem(item));
  }, [cartItem, all_products]);

  const data = {
    labels: ["Healthy", "Unhealthy"],
    datasets: [
      {
        data: [healthyTotal, unhealthyTotal],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

  const isCartEmpty = itemsList.length === 0;

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h1>🛒 Cart Spending Report</h1>

      {isCartEmpty ? (
        <p style={{ marginTop: "40px", fontSize: "18px", color: "#666" }}>
          Add items to the cart to display spending analysis!
        </p>
      ) : (
        <>
          <div className="items">
            <h2>Items in Cart</h2>
            <ul>
              {itemsList.map((item, idx) => (
                <li key={idx}>
                  {item.name} - ₹{item.price}
                </li>
              ))}
            </ul>
          </div>

          <div className="totals" style={{ margin: "20px 0" }}>
            <p>
              <strong>Healthy Spending:</strong> ₹{healthyTotal}
            </p>
            <p>
              <strong>Unhealthy Spending:</strong> ₹{unhealthyTotal}
            </p>
          </div>
          <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <Pie data={data} />
          </div>
        </>
      )}
    </div>
  );
};

export default CartSpendingAnalysis;
